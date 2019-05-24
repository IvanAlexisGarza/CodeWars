function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hiddenFunction1(grid, rows, columns, startRow, startColumn) {
  var reachableFields = new Array(columns);
  reachableFields[startColumn] = true;
  
  for (var row = startRow; row < rows; row++) {
    // Remove any blocked fields from our reachable list
    for (var i = 0; i < columns; i++)
      if (!grid[row][i])
        reachableFields[i] = false;
    
    // Find neighboring traversable fields
    hiddenFunction2(grid[row], reachableFields);
  }
  
  var reachableFieldCount = 0;
  for (var i = 0; i < reachableFields.length; i++)
    if (reachableFields[i])
      reachableFieldCount++;
  return reachableFieldCount; 
}

function hiddenFunction2(row, knownReachable) {
  for (var i = 0; i < knownReachable.length; i++) {
    if (!knownReachable[i]) continue;
    // Check fields to the left
    for (var l = i - 1; l >= 0; l--) {
      if (!row[l] || knownReachable[l])
        break;
      knownReachable[l] = true;
    }
    // Check fields to the right
    for (var r = i + 1; r < knownReachable.length; r++) {
      if (!row[r] || knownReachable[r])
        break;
      knownReachable[r] = true;
    }
  }
}

Test.describe("getNumberOfReachableFields()", function() {
  Test.it("Blocked path should return 0", function() {
    var inputGrid = [[true,true,true],
                     [false,false,true],
                     [false,true,false]];
    Test.assertEquals(getNumberOfReachableFields(inputGrid, 3, 3, 0, 0), 0);
  });
  
  Test.it("Single path should return 1", function() {
    var inputGrid = [[true],[true]];
    Test.assertEquals(getNumberOfReachableFields(inputGrid, 2, 1, 0, 0), 1);
  });
  
  Test.it("Multiple path 1", function() {
    var inputGrid = [[false,false,true],
                     [true,false,true],
                     [true,true,false]];
    Test.assertEquals(getNumberOfReachableFields(inputGrid, 3, 3, 1, 0), 2);
  });
  
  Test.it("Multiple path 2", function() {
    var inputGrid = [[false,false,true,true],
                     [true,true,true,true],
                     [true,true,false,true]];
    Test.assertEquals(getNumberOfReachableFields(inputGrid, 3, 4, 1, 0), 3);
  });
  
  Test.it("No turning back", function() {
    var inputGrid = [[false,false,true,true],
                     [true,true,true,true],
                     [true,true,false,true]];
    Test.assertEquals(getNumberOfReachableFields(inputGrid, 3, 4, 2, 0), 2);
  });
  
  Test.it("Random grid test", function() {
    for(let i=0; i<20; i++) {
      let height = getRandomInt(50, 200), width = getRandomInt(10, 50);
      let startRow = getRandomInt(0, height/10|0), startColumn = getRandomInt(0, width - 1);
      let inputGrid = [...Array(height)].map(_=>[...Array(width)].map(__=>Math.random()>0.2));
      inputGrid[startRow][startColumn] = true;
      Test.assertEquals(getNumberOfReachableFields(inputGrid.map(r=>[...r]), height, width, startRow, startColumn),
        hiddenFunction1(inputGrid, height, width, startRow, startColumn));
    }
  });
  
  Test.it("Performance test", function() {
    let height = 2000, width = 500;
    let startRow = getRandomInt(0, height/20|0), startColumn = getRandomInt(0, width - 1);
    let inputGrid = [...Array(height)].map(_=>[...Array(width)].map(__=>Math.random()>0.2));
    inputGrid[startRow][startColumn] = true;
    Test.assertEquals(getNumberOfReachableFields(inputGrid.map(r=>[...r]), height, width, startRow, startColumn),
      hiddenFunction1(inputGrid, height, width, startRow, startColumn));
  });
});






function getNumberOfReachableFields(grid, rows, columns, startRow, startColumn) {
    var reachableFields = new Array(columns);
    reachableFields[startColumn] = true;
    
    for (var row = startRow; row < rows; row++) {
      // Remove any blocked fields from our reachable list
      for (var i = 0; i < columns; i++)
        if (!grid[row][i])
          reachableFields[i] = false;
      
      // Find neighboring traversable fields
      hiddenFunction2(grid[row], reachableFields);
    }
    
    var reachableFieldCount = 0;
    for (var i = 0; i < reachableFields.length; i++)
      if (reachableFields[i])
        reachableFieldCount++;
    return reachableFieldCount; 
  }
  
  function hiddenFunction2(row, knownReachable) {
    for (var i = 0; i < knownReachable.length; i++) {
      if (!knownReachable[i]) continue;
      // Check fields to the left
      for (var l = i - 1; l >= 0; l--) {
        if (!row[l] || knownReachable[l])
          break;
        knownReachable[l] = true;
      }
      // Check fields to the right
      for (var r = i + 1; r < knownReachable.length; r++) {
        if (!row[r] || knownReachable[r])
          break;
        knownReachable[r] = true;
      }
    }
  }