Introduction Section

AgentPlaywright is an AI-driven browser automation framework built on Playwright and an MCP server.
Users can generate, execute, and manage browser automation tests via natural language prompts, combining AI capabilities with modern automation techniques.

🌟 Current Capabilities

Open Chat Window: AI chat interface integrated with MCP.

Prompt-Driven Test Generation:

Go to https://opensource-demo.orangehrmlive.com/ and generate tests for valid and invalid login scenarios


Generates Playwright tests automatically.

Test Execution: Run generated tests directly.

🛠 Technology Stack

Playwright – Browser automation

MCP Server – Communication channel for AI-driven automation

GitHub Copilot / Claude – AI test generation

⚡ How It Works

Open AI chat window

Provide test scenario prompt

AI generates executable Playwright scripts

Execute tests within the framework

🚧 Future Enhancements

Self-healing locators for runtime resiliency

Expand AI agent for API tests and multi-step workflows

Integrate Claude + MCP to:

Execute DB interactions

Read/write local file system

Add reporting & analytics

Integrate CI/CD for automatic test runs

📝 Getting Started
git clone https://github.com/rchak-git/AgentPlaywright.git
cd AgentPlaywright
npm install
npx playwright install
npx @playwright/mcp@latest --vision
npm run start

🤝 Contributing

Fork the repo, make improvements, and submit a pull request.

📄 License

MIT License – See LICENSE file