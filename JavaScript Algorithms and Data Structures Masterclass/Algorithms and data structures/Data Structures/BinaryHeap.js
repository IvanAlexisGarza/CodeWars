class BinaryHeap {
    constructor() {
        this.values = [];
    }
    insert(value) {
        this.values.push(value);
        this.bubbleUp();
    }

    bubbleUp() {
        let index = this.values.length - 1;
        let parentIndex = Math.floor((index - 1) / 2);

        while (this.values[index] > this.values[parentIndex]) {
            [this.values[index], this.values[parentIndex]] = [this.values[parentIndex], this.values[index]]; //Swaps values
            index = parentIndex;
            parentIndex = Math.floor((index - 1) / 2);
        }
    }

    extractMax() {
        [this.values[0], this.values[this.values.length - 1]] = [this.values[this.values.length-1], this.values[0]];
        let result = this.values.pop();
        if(this.values.length > 1){
            this.bubbleDown()
        }

        return result;
    }

    bubbleDown() {
        let index = 0;
        let leftchildIndex = Math.floor(index * 2 + 1);
        let rightChildIndex = Math.floor(index * 2 + 2);

        while(true) {
            if(leftchildIndex > this.values.length || leftchildIndex > this.values.length) break;
            if(this.values[leftchildIndex] >= this.values[rightChildIndex] && 
                this.values[leftchildIndex] > this.values[index]) {
                [this.values[index] , this.values[leftchildIndex]] = [this.values[leftchildIndex], this.values[index]]
                index = leftchildIndex;
            } else if(this.values[rightChildIndex] > this.values[leftchildIndex] &&
                 this.values[rightChildIndex] > this.values[index]) {
                [this.values[index] , this.values[rightChildIndex]] = [this.values[rightChildIndex], this.values[index]]
                index = rightChildIndex;
            }

            leftchildIndex = Math.floor(index * 2 + 1);
            rightChildIndex = Math.floor(index * 2 + 1);
            
            if(this.values[index] > this.values[rightChildIndex] && this.values[index] > this.values[leftchildIndex]){
                break;
            }
        }
    }
}

let heap = new BinaryHeap();

heap.insert(41);
heap.insert(39);
heap.insert(33);
heap.insert(18);
heap.insert(27);
heap.insert(12);
heap.insert(55);
// heap.insert(1);
// heap.insert(90);

console.log(heap);

console.log(heap.extractMax());
console.log(heap);
console.log(heap.extractMax());
console.log(heap);
console.log(heap.extractMax());
console.log(heap);
console.log(heap.extractMax());
console.log(heap);
console.log(heap.extractMax());
console.log(heap);
console.log(heap.extractMax());
console.log(heap);
console.log(heap.extractMax());
console.log(heap);

