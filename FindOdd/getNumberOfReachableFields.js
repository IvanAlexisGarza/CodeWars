
function heuristic(a, b) {
    return Math.abs(a.i - b.i) + Math.abs(a.j - b.j)
}

function Spot(i, j, wall) {
    this.i = i;
    this.j = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.neighbors = [];
    this.previous = undefined;

    this.wall = !wall;

    this.addNeighbors = function (newGrid) {
        var i = this.i;
        var j = this.j;
        if (i < rows - 1) {
            this.neighbors.push(newGrid[i + 1][j]);
        }
        if (i > 0) {
            this.neighbors.push(newGrid[i - 1][j]);
        }
        if (j < columns - 1) {
            this.neighbors.push(newGrid[i][j + 1]);
        }
    }
}

function getNumberOfReachableFields(grid, rows, columns, startRow, startColumn) {
    this.openSet = [];
    this.closedSet = [];
    this.endSet = [];
    this.start;
    this.done = false;
    this.nosolution;
    this.solutions = 0;
    this.endings;
    this.newGrid = [];
    this.columns = columns;
    this.rows = rows;
    this.grid = grid;
    // console.log("grid");
    // console.log(grid);
    console.log("rows");
    console.log(rows);
    console.log("columns");
    console.log(columns);
    console.log("startRow");
    console.log(startRow);
    console.log("startColumn");
    console.log(startColumn);
    var removeFromArray = (arr, elt) => {
        for (var i = arr.length - 1; i >= 0; i--) {
            if (arr[i] == elt) {
                arr.splice(i, 1);
            }
        }
    }

    var setup = (startRow, startColumn) => {
        for (var i = 0; i < this.rows; i++) {
            newGrid[i] = new Array(this.columns);
        }
        // console.log("MAde newGrid")

        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.columns; j++) {
                // console.log("newGrid[i][j])");
                // console.log(newGrid[i][j]);
                newGrid[i][j] = new Spot(i, j, this.grid[i][j]);
                // console.log("Spot: newGrid[i][j]");
                // console.log(newGrid[i][j]);
            }
        }
        // console.log("Filled newGrid")
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.columns; j++) {
                newGrid[i][j].addNeighbors(newGrid);
            }
        }

        start = newGrid[startRow][startColumn];
        for (var i = 0; i < this.columns; i++) {
            // // console.log(newGrid[this.columns - 1][i].wall);
            if (!newGrid[this.rows - 1][i].wall && newGrid[this.rows - 1][i] !== start) {
                endSet.push(newGrid[this.rows - 1][i]);
                endings = endSet.length;
                // // console.log("i:");
                // // console.log(i);
            }
        }
        // // console.log("Made newGrid Neighbors")
        // start = newGrid[startRow][startColumn];
        // if(endSet.indexOf(start) != -1) {
        //     endSet.removeFromArray
        // }
        // // console.log(newGrid)
        openSet.push(start);

        // // console.log("endSet");
        // // console.log(endSet);
        // // console.log("endings");
        // // console.log(endings);
        end = endSet[0];
    }

    setup(startRow, startColumn)
    while (!done) {
        if (openSet.length > 0) {
            // we can keep going
            var winner = 0;
            for (var i = 0; i < openSet.length; i++) {
                if (openSet[i].f < openSet[winner].f) {
                    winner = i;
                }
            }

            var current = openSet[winner];
            if (endSet.indexOf(current) != -1) {
                // // console.log("current");
                // // console.log(current);
                endings--;
                solutions++;
                removeFromArray(endSet, current);
                if (endings === 0) {
                    return solutions
                }
            }

            removeFromArray(openSet, current);
            closedSet.push(current);

            var neighbors = current.neighbors;
            for (var i = 0; i < neighbors.length; i++) {
                var neighbor = neighbors[i];

                if (!closedSet.includes(neighbor) && !neighbor.wall) {
                    var tempG = current.g + 1;

                    if (openSet.includes(neighbor)) {
                        if (tempG < neighbor.g) {
                            neighbor.g = tempG;
                        }
                    } else {
                        neighbor.g = tempG;
                        openSet.push(neighbor);
                    }
                    neighbor.h = heuristic(neighbor, end);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.previous = current;
                }
            }
        } else {
            // console.log("No solution")
            nosolution = true;
            return solutions;
        }
    }
}

function tickets(peopleInLine) {
    var Twentyfive = 0, fifty = 0, hundreds = 0;
    for (var i = 0; i < peopleInLine.length; i++) {
        switch (peopleInLine[i]) {
            case 25:
                Twentyfive++;
                break;
            case 50:
                if (Twentyfive > 0) {
                    Twentyfive--;
                    fifty++;
                } else {
                    return "NO";
                }
                break;
            case 100:
                if (fifty > 0 && Twentyfive > 0) {
                    fifty--;
                    Twentyfive--;
                    hundreds++;
                } else if (Twentyfive >= 3) {
                    Twentyfive -= 3;
                    hundreds++;
                } else {
                    return "NO"
                }
                hundreds++
        }
    }
    return "YES";
}

function loop_size(node) {
    // console.log(node);
    // console.log(node.next);
    var counter = 0;
    var current = node.getNext();
    var following = node.getNext().getNext();;

    do {
        ++counter;
        following = following.getNext();
    } while (current !== following)

    return counter;

}
