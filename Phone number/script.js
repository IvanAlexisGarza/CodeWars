function createPhoneNumber(numbers){
    var result = "";
    var phonechar = ["(",")"," ","-"]
    
    for(var i = 0; i < numbers.length; i++) {
      if(i === 0) result += phonechar[0];
      if(i === 3) result += phonechar[1];
      if(i === 3) result += phonechar[2];
      if(i === 6) result += phonechar[3];
      
      result += numbers[i];
    }
    
    return result;
  }

  function createPhoneNumber(numbers){
    numbers = numbers.join('');
    return '(' + numbers.substring(0, 3) + ') ' 
        + numbers.substring(3, 6) 
        + '-' 
        + numbers.substring(6);
  }