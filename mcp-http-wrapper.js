const express = require("express");
const bodyParser = require("body-parser");
const { spawn } = require("child_process");
const { JSDOM } = require("jsdom");

const app = express();
app.use(bodyParser.json());

// Spawn MCP server as a child process
const mcp = spawn("npx", ["@executeautomation/playwright-mcp-server"], {
  stdio: ["pipe", "pipe", "pipe"],
  shell: true
});

let responseBuffer = [];

// Listen for MCP stdout (JSON responses)
mcp.stdout.on("data", (chunk) => {
  const lines = chunk.toString().split("\n").filter(Boolean);
  for (const line of lines) {
    try {
      const json = JSON.parse(line);
      responseBuffer.push(json);
    } catch (e) {
      console.error("Non-JSON output from MCP:", line);
    }
  }
});

mcp.stderr.on("data", (chunk) => {
  console.error("MCP stderr:", chunk.toString());
});

mcp.on("exit", (code) => {
  console.log("MCP server exited with code", code);
});

// HTTP endpoint to heal selectors
app.post("/mcp/heal", async (req, res) => {
  const { selector, dom, action } = req.body;

  if (!selector || !dom) {
    return res.status(400).json({ error: "selector and dom are required" });
  }

  console.log("Received heal request for selector:", selector);

  try {
    // Send request to MCP process
    mcp.stdin.write(JSON.stringify({ selector, dom, action }) + "\n");

    // Wait for MCP response with timeout
    const checkResponse = () =>
      new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error("MCP timed out")), 5000);
        const interval = setInterval(() => {
          if (responseBuffer.length > 0) {
            clearTimeout(timeout);
            clearInterval(interval);
            resolve(responseBuffer.shift());
          }
        }, 100);
      });

    let mcpResponse;
    try {
      mcpResponse = await checkResponse();
    } catch (err) {
      console.warn("MCP did not respond, using fallback healing logic.");

      // Fallback healing logic: parse DOM locally and find closest match
      const domObj = new JSDOM(dom);
      const document = domObj.window.document;

      let healedSelector = selector;
      if (!document.querySelector(selector)) {
        const simpleTag = selector.match(/([a-zA-Z]+)/);
        healedSelector = simpleTag?.[1] || "body";
      }

      mcpResponse = {
        suggestedSelector: healedSelector,
        status: "fallback-applied"
      };
    }

    res.json(mcpResponse);
  } catch (err) {
    console.error("Error in /mcp/heal:", err);
    res.status(500).json({ error: err.message });
  }
});

// Start HTTP server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`MCP HTTP wrapper running at http://localhost:${PORT}`);
});
