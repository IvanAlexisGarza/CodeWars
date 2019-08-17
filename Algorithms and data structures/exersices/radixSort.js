
//Returns the digit specified in Descending order
function getDigit(num, digit){
    return Math.floor(Math.abs(num) / Math.pow(10,digit)) % 10
}

//Returns the number of digits in a number
function digitCount(num){
    if(num === 0 ) return 1;
    return num.toString(10).length;

    //Could also use return Math.floor(Math.log10(Math.abs(num))) + 1;
}

//Return the maximum number of digits in the array
function mostDigits(arr){
    let maxDigits = 0;
    let currentDigits = 0;

    for(let i = 0 ; i < arr.length ; i++ ) {
        // console.log(arr[1])
        currentDigits = digitCount(arr[i]);
        if(maxDigits  < currentDigits)
            maxDigits = currentDigits
    }
    //Could also use maxDigits = Math.max()maxDigits, currentDigit;
    return maxDigits;
}

function radixSort(arr){
    let iterations = mostDigits(arr);

    for(let i = 0 ; i < iterations ; i++) {
        let buckets = [...Array(10)].map(e => Array());
        for(let j = 0 ; j < arr.length ; j++) {
            console.log(getDigit(arr[j], i));
            buckets[getDigit(arr[j],i)].push(arr[j]);
        }
        arr = [];
        for(let k = 0 ; k < 10 ; k++) {
            if(buckets[k].length > 0) {
                arr = arr.concat(buckets[k]);
            }
        }
        console.log(buckets);
        console.log(arr);

    }
    return arr;
}

// arr.splice(j, 1);
// 45
// 689
// 2512
let arr = [ 2512, 689, 45, 8648, 19]
console.log(radixSort(arr));
// console.log(mostDigits(arr))
// Math.abs(45) % Math.pow(10, 1);
