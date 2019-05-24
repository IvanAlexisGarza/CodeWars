function findOdd(A) {
    //Sorting the Array in Ascending order for easier comparison 
    A.sort(function (a, b) { return a - b });
    var itemCount = 1;
    var arrayLength = A.length;

    if (arrayLength <= 1) {
        return A[0];
    }

    for (var i = 0; i < arrayLength - 1; i++) {
        if (A[i] === A[i + 1]) {
            itemCount++;
        } else {
            if (itemCount % 2 != 0) {
                var result = A[i];
            }
            itemCount = 1;
        }
    }

    result = result == null ? A[i] : result;
    return result;
}


//   const findOdd = (xs) => xs.reduce((a, b) => a ^ b);
//   var A = [1,1,2,-2,5,2,4,4,-1,-2,5];
//   //      [-2, -2, -1, -1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 20, 20]
//   findOdd(A);

//   General:  
//   x ^ x = 0 ; 

//   If  x ^ y = z Then z ^ x = y And z ^ y = x ;  
//   EX: 3 ^ 7 = 4      4 ^ 3 = 7     4 ^ 7 = 3  

//   IF  a ^ b = ab And ab ^ c = abc Then abc ^ a = b ^ c And abc ^ b = a ^ c And abc ^ c = a ^ b Where ab is string 'ab' not a . b
//   Ex: 8 ^ 5 = 13     13 ^ 3 = 14        14 ^ 8 = 5 ^ 3      14 ^ 5 = 8 ^ 3      14 ^ 3 = 8 ^ 5

//   Example:
//   A = [a, b, d, b, d, a, d] 
//   E = [5, 9, 2, 9, 2, 5, 2]

//   XOR Steps:    [a, b,                  d,                   b,                 d,               a,               d] 
//              1: (a ^ b = ab) , 2: (ab ^ d = abd) , 3: (abd ^ b = ad) , 4: (ad ^ d = a) , 5: (a ^ a = 0) , 6: (0 ^ d = d)
//                  5 ^ 9 = 12        12 ^ 2 = 14          14 ^ 9 = 7          7 ^ 2 = 5        5 ^ 5 = 0        0 ^ 2 = 2
//                        = 5^9              = 5^9^2                5^2

function divisors(integer) {
    var numbers = [];

    for (var i = integer; i == 1; i--) {
        if (integer % i == 0) {
            numbers.push(i);
            console.log(i);
        }
    }
    return numbers;
};
CCCXCIX

function solution(roman) {
    var currentnumber, nextnumber, previousnumber;
    var totalsum = parseRoman(roman.charAt(0));

    for (var i = 1; i < roman.length; i++) {
        currentnumber = parseRoman(roman.charAt(i))
        previousnumber = parseRoman(roman.charAt(i - 1))

        if (currentnumber <= previousnumber) {
            totalsum += currentnumber
        } else {
            totalsum = totalsum - previousnumber * 2 + currentnumber;
        }
    }

    return totalsum;
}


function parseRoman(romanchar) {
    switch (romanchar) {
        case "I": return 1;
        case "V": return 5;
        case "X": return 10;
        case "L": return 50;
        case "C": return 100;
        case "D": return 500;
        case "M": return 1000;
        default: return null;
    }
}


describe("Solution", function () {
    it("should lastZeroIndex for something", function () {
        lastZeroIndex.assertEquals(solution("I"), 1);
        lastZeroIndex.assertEquals(solution("II"), 2);
        lastZeroIndex.assertEquals(solution("IIII"), 4);
        lastZeroIndex.assertEquals(solution("IV"), 4);
        lastZeroIndex.assertEquals(solution("XXI"), 21);
        lastZeroIndex.assertEquals(solution("DDDD"), 2000);
        lastZeroIndex.assertEquals(solution("MMCD"), 2400);
        lastZeroIndex.assertEquals(solution("CCCXCIX"), 399);

        lastZeroIndex.assertEquals(solution("IVX"), 399);
        lastZeroIndex.assertEquals(solution("VI"), 399);



        // lastZeroIndex.assertEquals(solution("MVXC"), null);
        //lastZeroIndex.assertEquals(solution("MXDC"), null);

        lastZeroIndex.assertEquals(solution("P"), null);
    });
});

function incrementString(strng) {
    var nums;
    var oneToTen;
    var indexReplace;
    var lastNumIndex = strng.match(/(\d)+/);

    if (lastNumIndex !== null) {

        var lastNumIndexvalue = lastNumIndex[0];

        var lastNumIndexInt = parseInt(lastNumIndexvalue, 10) + 1;
        nums = lastNumIndexInt.toString(10);

        var lastZeroIndex = lastNumIndex[0].match(/([1-9])(\d+)?/);

        if (lastZeroIndex !== null) {
            var lastZeroIndexvalue = lastZeroIndex[0];
            var lastZeroIndexnInt = parseInt(lastZeroIndexvalue, 10) + 1;
            oneToTen = lastZeroIndexnInt.toString(10);

            indexReplace = lastNumIndexvalue.length < oneToTen.length ? lastNumIndexvalue.length : oneToTen.length;
           return strng.slice(0, -indexReplace) + oneToTen;
        }
        return strng.replace(/(\d)$/, nums)

    } else {
        return strng + 1;
    }
}

function incrementString (strng) {
    return input.replace(/([0-8]?)(9*)$/, function(s, d, ns) {
        return +d + 1 + ns.replace(/9/g, '0');
      });
  }

  https://www.codewars.com/kata/525f50e3b73515a6db000b83/train/javascript
  