// piece of data - val
// reference to next node - next

class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    push(val) {
        let tempNode = new Node(val);
        if (!this.head) {
            this.head = tempNode;
            this.tail = tempNode;
        } else {
            this.tail.next = tempNode;
            this.tail = tempNode;
        }
        this.length++;
        return this;
    }

    pop() {
        if (!this.head) {
            return undefined;
        }

        let newTail = this.head;
        let current = newTail;

        while (current.next) {
            newTail = current;
            current = current.next;
        }

        newTail.next = null;
        this.tail = newTail;

        if (this.length === 0) {
            this.head = null;
            this.tail = null;
            return null;
        }
        this.length--;

        return current;
    }

    shift() {
        if (!this.head) return undefined;
        var currentHead = this.head;
        this.head = currentHead.next;
        this.length--;
        if (this.length === 0) {
            this.tail = null;
        }
        return currentHead;
    }

    unshift(val) {
        let tempNode = new Node(val);
        if (!this.head) {
            this.head = tempNode;
            this.tail = this.head;
        } else {
            tempNode.next = this.head;
            this.head = tempNode;
        }
        this.length++;

        return this;
    }

    get(index) {
        if (!this.head || this.length <= index || index < 0) {
            return undefined;
        }

        let current = this.head;
        let counter = 0;
        while (counter < index) {
            current = current.next;
            counter++;
        }
        return current;
    }

    set(index, value) {
        let current = this.get(index);
        if (current) {
            current.val = value;
            return true
        }
        return false;
    }

    insert(index, value) {
        if (index < 0 || index > this.length) {
            return false;
        } else if (index === this.length - 1) {
            return !!this.push(value);
        } else if (index === 0) {
            return !!this.unshift(val);
        }

        let newNode = new Node(value);
        let prevNode = this.get(index - 1);
        let tempNode = prevNode.next;

        prevNode.next = newNode;
        newNode.next = tempNode;
        this.length++;

        return true;
    }

    remove(index) {
        if (index < 0 || index >= this.length) return undefined;
        else if (index == 0) return this.shift();
        else if (index == this.length - 1) return this.pop(index);
        else {
            let prevNode = this.get(index - 1);
            let remNode = prevNode.next;
            prevNode.next = remNode.next;

            this.length--;

            return remNode;
        }
    }

    reverse() {
        let currNode = this.head;
        this.head = this.tail;
        this.tail = currNode;

        let nextNode;
        let prevNode = null;
        
        // this.tail.val = this.head.val;
        let counter = 0;
        
        while (counter < this.length) {
            nextNode = currNode.next;
            currNode.next = prevNode;
            prevNode = currNode;

            currNode = nextNode;
            
            counter++;
        }
    }

    print(){
        var arr = [];
        var current = this.head
        while(current){
            arr.push(current.val)
            current = current.next
        }
        console.log(arr);
    }
}

// var list = new SinglyLinkedList()
// list.push("I");
// list.push("LOVE");
// list.push("THE");
// list.push("WAY");
// list.push("YOU");
// list.push("MAKE");
