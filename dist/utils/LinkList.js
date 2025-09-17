"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkList = exports.LinkNode = void 0;
class LinkNode {
    value;
    next;
    constructor(value) {
        this.value = value;
    }
}
exports.LinkNode = LinkNode;
class LinkList {
    head;
    tail;
    length = 0;
    addNode(value) {
        let currNode;
        currNode = new LinkNode(value);
        if (!this.head) {
            this.head = currNode;
            this.tail = currNode;
        }
        else {
            this.tail.next = currNode;
            this.tail = currNode;
        }
        this.length++;
    }
    printNodes() {
        let tempNode = this.head;
        while (tempNode) {
            console.log(tempNode.value);
            tempNode = tempNode.next;
        }
    }
}
exports.LinkList = LinkList;
