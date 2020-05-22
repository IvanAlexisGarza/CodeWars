class Node {
    constructor(value) {
        this.value = value;
        this.right = null;
        this.left = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null
    }

    insert(value) {
        let newNode = new Node(value);
        if (this.root === null) {
            this.root = newNode;
            return this;
        }

        let flag = true;
        let currNode = this.root;

        while (!!flag) {
            if (value === currNode.value) return undefined;

            if (currNode.value > value) {
                if (currNode.left !== null) {
                    currNode = currNode.left;
                } else {
                    currNode.left = newNode;
                    flag = false;
                }
            } else {
                if (currNode.right !== null) {
                    currNode = currNode.right;
                } else {
                    currNode.right = newNode;
                    flag = false;
                }
            }
        }

        return this;
    }

    contains(value) {
        if (this.root === null) return false;

        let currNode = this.root;

        while (true) {
            if (value === currNode.value) return true;

            if (currNode.value > value) {
                if (currNode.left !== null) {
                    currNode = currNode.left;
                } else {
                    return false;
                }
            } else {
                if (currNode.right !== null) {
                    currNode = currNode.right;
                } else {
                    return false;
                }
            }
        }
    }

    BTS() {
        let tempNode = this.root;

        let result = [], queue = [];

        if (this.root != null) {
            queue.push(tempNode)
        }

        while (queue.length) {
            tempNode = queue.shift();
            result.push(tempNode.value);
            if (tempNode.left) queue.push(tempNode.left)
            if (tempNode.right) queue.push(tempNode.right)
        }
        return result;
    }

    DFSPreOrder() {
        let result = [];
        return traverse(this.root);
        function traverse(node) {
            result.push(node.value)
            if (node.left) traverse(node.left);
            if (node.right) traverse(node.right);
            return result;
        }
    }

    DFSPostOrder() {
        let result = [];
        traverse(this.root);
        return result;
        function traverse(node) {
            if (node.left) traverse(node.left);
            if (node.right) traverse(node.right); 
            result.push(node.value);
        }
    }

    DFSInOrder() {
        let result = [];
        traverse(this.root);
        return result;
        function traverse(node) {
            if (node.left) traverse(node.left);
            result.push(node.value);
            if (node.right) traverse(node.right);
        }
    }
}


let bst = new BinarySearchTree();

bst.insert(10);
bst.insert(6);
bst.insert(15);
bst.insert(3);
bst.insert(8);
bst.insert(20);

// console.log(bst);
console.log(bst.DFSPreOrder());
console.log(bst.DFSPostOrder());
console.log(bst.DFSInOrder());


