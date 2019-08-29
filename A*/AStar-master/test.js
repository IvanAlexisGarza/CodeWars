function getNumberOfReachableFields(grid, rows, columns, startRow, startColumn) {
    var openSet = [];
    var closedSet = [];
    var path = [];
    var start;
    var done = false;


    for (var i = 0; i < columns; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j] = new Spot(i, j, grid[i][j]);
        }
    }
    for (var i = 0; i < columns; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].addNeighbors(grid);
        }
    }

    start = grid[startRow][startColumn];
    openSet.push(start);


    while (!done) {
        if (openSet.length > 0) {
            // we can keep going
            var nextguess = 0;
            for (var i = 0; i < openSet.length; i++) {
                if (openSet[i].f < openSet[nextguess].f) {
                    nextguess = i;
                }
            }

            var current = openSet[nextguess];

            if (current === end) {
                noLoop();
                console.log("DONE");
            }

            removeFromArray(openSet, current);
            closedSet.push[current];

            var neighbors = current.neighbors;

            for (var i = 0; i < neighbors.length; i++) {
                var neighbor = neighbors[i];

                if (!closedSet.includes(neighbor)) {
                    var tempG = neighbor.g + 1;

                    if (openSet.includes(neighbor)) {
                        if (tempG < neighbor.g) {
                            neighbor.g = tempG;
                        }
                    } else {
                        neighbor.g = tempG;
                        openSet.push(neighbor);
                    }
                }

                console.log("END" + end);
                console.log("NEIGHBOR" + neighbor);

                neighbor.h = heuristic(neighbor, end);
                neighbor.f = neighbor.g + neighbor.h;
                neighbor.previous = current;
            }

        } else {
            // no solution
        }
        parth = [];
        var temp = current;
        path.push(temp);
        while (temp.previous) {
            path.push(temp.previous);
            temp = temp.previous;
        }
    }
    return result;
}


function Spot(i, j, wall) {
    this.i = i;
    this.j = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.wall = !wall;
    this.neighbors = [];
    this.previous;

    this.addNeighbors = function (grid) {
        var i = this.i;
        var j = this.j;
        if (1 < columns - 1) {
            this.neighbors.push(grid[i + 1, j]);
        }
        if (i > 0) {
            this.neighbors.push(grid[i - 1, j]);
        }
        if (j < rows - 1) {
            this.neighbors.push(grid[i, j + 1]);
        }
        if (j > 0) {
            this.neighbors.push(grid[i, j - 1]);
        }
    }
}

function removeFromArray(arr, alt) {
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i] == alt) {
            arr.splice(i, 1);
        }
    }
}

function heuristic(a, b) {
    var d = dist(a.i, a.j, b.i, b.j);
    return d;
}
