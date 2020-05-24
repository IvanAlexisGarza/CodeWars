class Graph {
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        if (!this.adjacencyList.hasOwnProperty(vertex)) {
            this.adjacencyList[vertex] = [];
        }
        else console.log("This vertex already exists")
    }

    addEdge(vertex1, vertex2) {
        this.adjacencyList[vertex1].push(vertex2)
        this.adjacencyList[vertex2].push(vertex1)
    }

    removeEdge(vertex1, vertex2) {
        this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(arrValue => arrValue !== vertex2);
        this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(arrValue => arrValue !== vertex1);
    }

    removeVertex(vertex) {
        while (this.adjacencyList[vertex].length) {
            let adjacentVertex = this.adjacencyList[vertex].pop();
            this.removeEdge(vertex, adjacentVertex);
        }
        delete this.adjacencyList[vertex];
    }

    depthFirstRecursive(startVertex) {
        let visited = {};
        let result = [];
        const adjacencyList = this.adjacencyList;

        (function DFS(vertex) {
            if (!vertex) return null;
            visited[vertex] = true;
            result.push(vertex);
            adjacencyList[vertex].forEach(neighbor => {
                if (!visited[neighbor]) {
                    return DFS(neighbor);
                }
            });
        })(startVertex)
        return result;
    }

    depthfirstIterative(startVertex) {
        let vertices = [startVertex], result = [], visited = {};
        let currvertex;

        visited[startVertex] = true;

        while (vertices.length) {
            currvertex = vertices.pop();
            result.push(currvertex);


            this.adjacencyList[currvertex].forEach(neighbor => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    vertices.push(neighbor);
                }
            })
        }
        return result;
    }

    breadthFirstIterative(startVertex){
        let queue =[startVertex];
        let result = [];
        let visited = {};
        let currvertex = startVertex;

        visited[startVertex] = true;

        while(queue.length > 0) {
            currvertex = queue.shift();
            result.push(currvertex);
            
            this.adjacencyList[currvertex].forEach(neighbor => {
                if(!visited[neighbor]){
                    visited[currvertex] = true;
                    queue.push(neighbor);
                }
            })
        }
        return result;
    }

}

let g = new Graph();


g.addVertex("A")
g.addVertex("B")
g.addVertex("C")
g.addVertex("D")
g.addVertex("E")
g.addVertex("F")

g.addEdge("A", "B")
g.addEdge("A", "C")
g.addEdge("B", "D")
g.addEdge("C", "E")
g.addEdge("D", "E")
g.addEdge("D", "F")
g.addEdge("E", "F")
console.log(g.breadthFirstIterative("A"))
// console.log(g.adjacencyList);

// graph.addVertex("Tokio");
// graph.addVertex("Dallas");
// graph.addVertex("Aspen");
// // console.log(graph.adjacencyList);

// graph.addEdge("Tokio", "Dallas");
// graph.addEdge("Tokio", "Aspen");
// console.log(graph.adjacencyList);

// // graph.removeEdge("Tokio", "Dallas");
// // graph.removeEdge("Tokio", "Aspen");

// graph.removeVertex("Tokio");
// console.log(graph.adjacencyList);


