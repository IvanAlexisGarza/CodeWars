//Linear time
function hash(key, arrayLen) {
    let total = 0;
    for (let char of key) {
        let value = char.charCodeAt(0) - 96;
        total = (total + value) % arrayLen;
    }
    return total;
}

function hash(key, arrayLen) {
    let total = 0;
    let WEIRD_PRIME = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      let char = key[i];
      let value = char.charCodeAt(0) - 96
      total = (total * WEIRD_PRIME + value) % arrayLen;
    }
    return total;
  }


  class HashTable {
    constructor(size=53){
      this.keyMap = new Array(size);
    }
  
    _hash(key) {
      let total = 0;
      let WEIRD_PRIME = 31;
      for (let i = 0; i < Math.min(key.length, 100); i++) {
        let char = key[i];
        let value = char.charCodeAt(0) - 96
        total = (total * WEIRD_PRIME + value) % this.keyMap.length;
      }
      return total;
    }

    set(key, value) {
        let index = this._hash(key);
        if(!this.keyMap[index]) {
            this.keyMap[index] = [];
        }
        this.keyMap[index].push([key, value]);
    }

    get(key) {
        let index = this._hash(key);
        let indexValues = this.keyMap[index]
        if(indexValues) {
            for (let i = 0; i < indexValues.length; i++) {
                if(indexValues[i][0] === key) return indexValues[i][1];
            }
        }
        return undefined

    }

    keys(){
        let result = [];
        this.keyMap.forEach(arr => {
            arr.forEach(obj => {
                result.push(obj[0])
            })
        })
        
        return Array.from(new Set(result));
    }

    values(){
        let result = [];
        this.keyMap.forEach(arr => {
            arr.forEach(obj => {
                result.push(obj[1])
            })
        })
        
        return Array.from(new Set(result));
    }

  }

  let ht = new HashTable(3);

  ht.set("black","#ffffff");
  ht.set("white","#000000");
  ht.set("red","#ff0000");
  ht.set("red","#ff0000");
  ht.set("red","#ff0034");

