var string = "aba";
count(string);

//742ms my answer 
function count(string) {
    if (string === '') return {};
    var map = {};
    if (string.includes("a")) map.a = 0;
    if (string.includes("b")) map.b = 0;
    for (var i = 0; i < string.length; i++) {
        if (string[i] === "a") {
            map.a += 1;
        } else if (string[i] === "b") {
            map.b += 1;
        }
    }
    console.log(map);
    return map;
}

//784ms top result answer
function count (string) {  
    var count = {};
    string.split('').forEach(function(s) {
       count[s] ? count[s]++ : count[s] = 1;
    });
    return count;
  }