// function properFractions(n) {

//   let divisors = [];
//   let reducedFrac = 0;
//   let hasdiv = false;

//   if(n >= 1){
//     reducedFrac++;
//   }

//   for (let i = 2; i < n; i++) {
//     if (n % i === 0) {
//       divisors.push(i);
//     }
//   }

//   for (let i = 2; i < n; i++) {
//     hasdiv = false;
    
//     for (let j = 0; j < divisors.length && !hasdiv ; j++) {
//       if (i % divisors[j] === 0) {
//         hasdiv = true;
//       }
//     }

//     if(hasdiv) {
//       reducedFrac++;
//     }

//   }

//   return n - reducedFrac
// }




// console.log(properFractions(15));



// function properFractions(d) {
//   let count = 0;
//   if(d<=1)return 0;
//   if(d<=2)return 1;
//   for(let i = 1 ; i < d/4 ; i++) {
//     if(recursiveGCD(i, d) === 1) {
//     count++;
//     }
//   }
//   return count*4;
// }
//   const recursiveGCD = (n, d) => {
// //     console.log("recursive:  n: " + n + " d: " + d );
//     if(!d) return n;
//     return recursiveGCD(d, n % d);
//   }




function properFractions(n) {
  for(let i = 1 ; i < n ; i++) {
    if(isPrime3(i)) {
      count++;
    }
  }
  return n - (count+1);
}


function isPrime3(n) {
  if (isNaN(n) || !isFinite(n) || n%1 || n<2) return false; 
  if (n%2==0) return (n==2);
  if (n%3==0) return (n==3);
  var m=Math.sqrt(n);
  for (var i=5;i<=m;i+=6) {
   if (n%i==0)     return false;
   if (n%(i+2)==0) return false;
  }
  return true;
 }