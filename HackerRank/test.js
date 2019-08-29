

// Complete the getPrimes function below.
function getPrimes(n) {
    //we shall stablish this will only take positive nums
    //first we declare an array which is what we will return
    //
    let testarr = [];

    for(let i = 2 ; i <= n ; i++) {
        if(isPrime(i)) {
            testarr.push(i);
        }
    }

    return testarr
}

function isPrime(num) {
    //faster if we use num sqrt to cut runtime
    for(let i = 2 ; i < num ; i++ ) {
        if(num % i === 0) return false;
    }
    return num > 1;
}

