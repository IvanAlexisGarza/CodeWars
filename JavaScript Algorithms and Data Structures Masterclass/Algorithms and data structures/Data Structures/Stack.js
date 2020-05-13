class Node {
    constructor(val) {
        this.next = null;
        this.val = val;
    }
}

class Stack {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    push(val) {
        let newNode = new Node(val);

        if (this.size === 0) {
            this.first = newNode;
            this.last = newNode;
        } else {
            let currFirst = this.first;
            this.first = newNode;
            newNode.next = currFirst;
        }

        this.size++;
        return this.size;
    }

    pop() {
        let removedNode = null;

        if(this.size === 0) {
            return null;
        } else if(this.size === 1) {
            this.first = null;
            this.last = null;
        } else {
            removedNode = this.first;
            this.first = this.first.next;
        }

        this.size--;

        return removedNode;
    }
}

let stack = new Stack();

stack.push(0);
stack.push(1);
stack.push(2);
stack.push(3);

stack.pop();
console.log(stack);