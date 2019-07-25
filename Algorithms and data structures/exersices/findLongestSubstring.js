//Writre a function called findLongestSubstring
//which accepts a string and returns the length of the longesy substring with all distinct characters
//sliding window
//time complexity O(N)


function findLongestSubstring(str) {
    let savedvalue = [];
    let count = 0, maxcount =0;
//     let array = str.split("");
//     console.log(str.indexOf("r"));

    for(let i =0, j=0;j<=str.length;j++) {

        if(savedvalue[str[j]]) {
            i = str.indexOf(str[j])+1;
            console.log(i,j);
            // j = i;
            maxcount = Math.max(maxcount, count);
            count = 0;
            console.log(savedvalue);
            savedvalue = [];
            console.log(str[j]);

            // console.log('im inside');

        } else {
            savedvalue[str[j]] = 1;
            count++;
            // console.log(count);
        }
//         console.log(str.);
//go trough string until you find a repeating character
//get index of repeated character
//place i & j there, and start checking again
    }
    return Math.max(maxcount, count);
}

console.log(
// findLongestSubstring('lee'),
// findLongestSubstring(''),               //0
// findLongestSubstring('rithmschool'),    //7
// findLongestSubstring('thisisawesome'),  //6
findLongestSubstring('thecatinthehat'), //7
// findLongestSubstring('bbbbbb'),         //1
// findLongestSubstring('longestsubstring'),//8
// findLongestSubstring('thisishowwedoit'), //6
);