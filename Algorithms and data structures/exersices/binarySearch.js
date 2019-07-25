function binarySearch(arr, val) {
    let start = 0, end = arr.length - 1, middle;
    while(start < end) {
        middle = Math.round((end + start) / 2);
        if(arr[middle] === val) {
            return middle
        } else if(arr[middle] < val) {
            start = middle;
        } else if(arr[middle] > val) {
            end = middle;
        }
        console.log("start: " + start );
        console.log("end: " + end );
        console.log("middle: " + middle );
    }
    return -1;
}

// console.log(
// binarySearch([1,2,3,4,5],2),
// binarySearch([1,2,3,4,5],3),
// binarySearch([1,2,3,4,5],5),
// binarySearch([1,2,3,4,5],6));

console.log("aqui");

console.log(
binarySearch([0,1,2,3,4,5],2),
binarySearch([0,1,2,3,4,5],3),
binarySearch([0,1,2,3,4,5],5),
binarySearch([1,2,3,4,5],6));
