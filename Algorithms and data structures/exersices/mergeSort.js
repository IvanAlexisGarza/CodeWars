function mergeSort(arr) {
    if (arr.length <= 1) return arr;

    let left = mergeSort(arr.slice(0, (arr.length / 2)));
    let right = mergeSort(arr.slice(arr.length / 2));

    return merge(left, right);
}

function merge(arr1, arr2) {
    let result = [];
    let i = 0, j = 0;

    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) {
            result.push(arr1[i]);
            i++;
        } else {
            result.push(arr2[j]);
            j++;
        }
    }

    while (i < arr1.length) {
        result.push(arr1[i]);
        i++;
    }

    while (j < arr2.length) {
        result.push(arr2[j]);
        j++;
    }

    return result;
}

// let array1 = [1, 5, 6, 8];
// let array2 = [2, 4, 7, 10];

// console.log(merge(array1, array2));

let array = [1, 2, 4, 7, 10, 568, 56116];
console.log(mergeSort(array));

// let temparr1 = array.slice(0, (array.length / 2));
// let temparr2 = array.slice(array.length / 2, array.length);

// console.log(temparr1, temparr2);