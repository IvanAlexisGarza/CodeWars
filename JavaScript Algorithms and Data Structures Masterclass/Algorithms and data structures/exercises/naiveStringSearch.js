// Loop over the longer string
// Loop over the shorter string
// If the characters don't match, break out of the inner loop
// if the characters do match, keep going
// if you complete the inner loop and find a match increment the count of matches
// return the count 

function naiveStringSearch(str, val) {
    let i = 0, j = 0, count = 0;
    while(i < str.length) {
        if(j >= val.length) {
            j = 0;
            count++;
        }
        if(str[i] === val[j]) {
            j++
        } else {
            i++;
        }
    }
    return count;
}

console.log(
    naiveStringSearch("locolo", "lo")
);