var num = 39;
var counter = 0;

do {
    var num = num.toString().split('').reduce((a,b) => a * b);
    counter++;
    console.log(typeof(num));
} while (num >= 10);

return counter;