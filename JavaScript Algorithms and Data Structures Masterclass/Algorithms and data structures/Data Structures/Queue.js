class Node {
    constructor(val) {
        this.value = val;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    enqueue(val) {
        let newNode = new Node(val);

        if (this.size === 0) {
            this.first = newNode;
            this.last = newNode;
            // this.first.next = this.last;
        } else {
            this.last.next = newNode;
            this.last = newNode;
        }

        return this.size++;
    }

    dequeue() {
        let dequeuepedNode = this.first;
        if (this.size === 0) {
            return null;
        } else if (this.size === 1) {
            this.first = null;
            this.last = null
        } else {
            this.first = this.first.next;
        }


        this.size--;
        return dequeuepedNode;
    }
}

let queue = new Queue();

queue.enqueue(0)
queue.enqueue(1)


// queue.dequeue();




console.log(queue);