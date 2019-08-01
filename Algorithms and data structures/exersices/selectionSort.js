function selectionSort(arr) {
    let smallest = arr[0];
    let index;

    for (let i = 0; i < arr.length-1; i++) {
        let smallest = i;
        for (let j = i+1; j < arr.length; j++) {
            if (arr[j] < arr[smallest]) {
                smallest = j;
            }        
        }
        if(i !== smallest) {
            [arr[i] , arr[smallest]] = [arr[smallest], arr[i]];
        }
    }

    return arr;
}

// function swap(a,b) {
//     b = (a += b -= a) -b;
// }

// var array = [1,3,2,7,4,4,8];
var array = [999991,23,2568,5477,46,544,83];

console.log(selectionSort(array))
