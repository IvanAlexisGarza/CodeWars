class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
        this.prev = null;
    }
};

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    push(val) {
        var newNode = new Node(val);

        if (this.length === 0) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }

        this.length++;
        return this;
    }

    pop() {
        if (this.head === null) return undefined;

        let currTail = this.tail;

        if (this.length === 1) {
            this.tail = null;
            this.head = null;
        } else {
            this.tail = this.tail.prev;
            this.tail.next = null;
            currTail.prev = null;
        }

        this.length--;
        return currTail;
    }

    shift() {
        if (this.length === 0) return undefined;

        let oldHead = this.head;

        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
            this.head.prev = null;
            oldHead.next = null;
        }

        this.length--;
        return oldHead;
    }

    unshift(val) {
        let newNode = new Node(val);

        if (this.length === 0) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.head.prev = newNode;
            newNode.next = this.head;
            this.head = newNode;
        }

        this.length++;
        return this;
    }

    get(index) {
        if (index < 0 || index >= this.length) return null;

        let responseNode, counter = 0;

        if (index <= this.length / 2) {
            responseNode = this.head;
            while (counter != index) {
                responseNode = responseNode.next;
                counter++;
            }
        } else {
            responseNode = this.tail
            counter = this.length - index - 1
            while (counter > 0) {
                responseNode = responseNode.prev;
                counter--;
            }
        }

        return responseNode;
    }

    set(index, val) {
        if (index < 0 || index >= this.length) return false;
        let selectedNode = this.get(index);
        selectedNode.val = val;
        return true;
    }

    insert(index, val) {
        if (index < 0 || index > this.length) return false;

        if (index === 0) {
            this.unshift(val);
            return true;
        }

        if (index === this.length) {
            this.push(val);
            return true;
        }

        let insertedNode = new Node(val);
        let prevNode = this.get(index - 1);
        let currNode = prevNode.next;

        prevNode.next = insertedNode;
        currNode.prev = insertedNode;

        insertedNode.prev = prevNode;
        insertedNode.next = currNode;

        this.length++;
        return true;
    }

    remove(index) {
        if (index < 0 || index >= this.length) return undefined;
        if (index === 0) return this.shift();
        if (index === this.length - 1) return this.pop();

        let nodeToRemove = this.get(index);
        nodeToRemove.prev.next = nodeToRemove.next;
        nodeToRemove.next.prev = nodeToRemove.prev;

        nodeToRemove.prev = null;
        nodeToRemove.next = null;

        this.length--;
        return nodeToRemove;
    }

    reverse() {
        if (this.length === 0 || this.length === 1) return this;

        let prevNode = new Node();
        let pastNode = null;

        let currNode = this.head;
        let nextNode = this.head.next;

        this.tail = currNode;

        for (let i = 0; i < this.length; i++) {
            prevNode = currNode.next;
            currNode.prev = prevNode;
            
            currNode.next = pastNode;
            
            pastNode = currNode;
            
            currNode = nextNode;
            
            if(i< this.length-1) {
                nextNode = nextNode.next;
            }
        }

        this.head = pastNode;

        return this;
    }
}
