function bubbleSort(arr) {
    let swap = false;
    for (let i = arr.length; i > 0; i--) {
        for (let j = 0; j < i-1; j++) {
            if(arr[j] > arr[j+1]) {
                // [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
                swap = true;
            }
        }
        if(!swap) break;
    }
    return arr;
}

console.log(bubbleSort([1,84,654,8,153,68,2,6,53,5]));

// var a = 5, b = 9;    
// b = (a += b -= a) - b;    
// alert([a, b]); // alerts "9, 5"