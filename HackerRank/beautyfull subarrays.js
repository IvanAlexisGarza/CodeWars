function beautifulSubarrays(arr, m) {
    let odds = 0;
    let result = 0;
    let memoization = [];

    for (let i = 0; i < arr.length; i++) {
        memoization[odds] ? memoization[odds]++ : memoization[odds] = 1;

        odds += arr[i] % 2 === 0 ? 0 : 1;

        if (odds >= m) {
            result += memoization[odds - m];
        }
    }

    return result;
}
// function beautifulSubarrays(a, m) {
//     let count = 0;

//     // traverse for all possible 
//     // subarrays 
//     for (let i = 0; i < a.length; i++) {
//         let oddNumbers = 0;
//         for (let j = i; j < a.length; j++) {
//             if (a[j] % 2 !== 0) {
//                 oddNumbers++;
//             }

//             if (oddNumbers == m) {
//                 count++;
//             }

//             if (oddNumbers === m) {
//                 count++;
//             }
//         }
//     }

//     return count;
// }

// console.log(beautifulSubarrays([2,2,5,6,9,2,11],2))
// console.log(beautifulSubarrays([2,5,6,9],2))
console.log(beautifulSubarrays([2, 5, 4, 9], 1))


