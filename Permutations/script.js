    let strings = new Set();
    let loco = 0;

    let permutations = (str) => {
        permutation(str, "")
    }

    let permutation = (str, prefix) => {
        if (str.length === 0) {
            strings.add(prefix);
            console.log(prefix);
        }
        else {
            for (var i = 0; i < str.length; i++) {
                loco++;
                console.log("Fors i number = " + i);
                console.log("Iteration number = " + loco);
                console.log("Current string = " + str);
                console.log("Current prefix = " + str);
                var rem = str.substring(0, i) + str.substring(i + 1);
                permutation(rem, prefix + str.charAt(i));
            }
        }
    }



permutations("abcd");

console.log("Printing set");
// strings.add("👀");
console.log(strings);
// console.log(strings.size);


