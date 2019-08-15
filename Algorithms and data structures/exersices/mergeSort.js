function merge(arr1, arr2) {
    let result = [];
    let i = 0, let j = 0;

    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) {
            result.push(arr1[i]);
            i++;
        } else if (arr1[i] > arr2[j]) {
            result.push(arr2[j]);
            j++;
        } else if (i === arr1.length) {

        } else if (j === arr2.length) {

        }

    }

    return result;
}

let array1 = [];
let array2 = [];
console.log(merge)

