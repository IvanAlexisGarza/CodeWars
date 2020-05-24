// let memo = [0, 1, 1]
// function fib(n){
//     if(!!memo[n]) return memo[n];
//     memo[n] = fib(n-1, memo) + fib(n-2, memo);
//     return memo[n];
// }

function fib(n , memo = [0, 1, 1]){
    // console.log(memo)
    if(!!memo[n]) return memo[n];
    if(n <= 2) return 1;
    let fibNumber =  fib(n-1, memo) + fib(n-2, memo);
    memo[n] = fibNumber;
    return fibNumber;
}

function fib2(n){
    if(n<=2) return 1;
    let fibNums = [0,1,1];
    for (let i = 3; i <= n; i++) {
        fibNums[i] = fibNums[i-1] + fibNums[i-2];
    }
    return fibNums[n];
}
// console.log(fib(100));