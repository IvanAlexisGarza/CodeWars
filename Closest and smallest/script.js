function  closest(strng) {
    // your code
    var values = [];
    var weights = [];
    values = strng.split(' ');
      for(var i =0 ; i < values.length;i++) {
        values[i] = values[i].split("");
        weights[i] = values[i].reduce((a,b) => +a + +b);
        }
        var minWeigth = Math.min.apply(null, weights);
        var minIndex = weights.indexOf(minWeigth)
        
                console.log("index min")
        console.log(minIndex);
        
        console.log("weigth min")
        console.log(minWeigth);
        console.log("weights");
        console.log(weights);
//         var cosa = loco.reduce((a,b) => +a + +b);
//         console.log("La cosa");
//         console.log(cosa);
        
        

//     console.log(test[0].split().reduce((a,b) => +a + +b));
}

console.log(closest("456899 50 11992 176 272293 163 389128 96 290193 85 52"));