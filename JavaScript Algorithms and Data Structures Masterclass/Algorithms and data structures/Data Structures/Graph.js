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
        while(this.adjacencyList[vertex].length){
            let adjacentVertex  = this.adjacencyList[vertex].pop();
            this.removeEdge(vertex, adjacentVertex);
        }
        delete this.adjacencyList[vertex];
    }
}

let graph = new Graph();

graph.addVertex("Tokio");
graph.addVertex("Dallas");
graph.addVertex("Aspen");
// console.log(graph.adjacencyList);

graph.addEdge("Tokio", "Dallas");
graph.addEdge("Tokio", "Aspen");
console.log(graph.adjacencyList);

// graph.removeEdge("Tokio", "Dallas");
// graph.removeEdge("Tokio", "Aspen");

graph.removeVertex("Tokio");
console.log(graph.adjacencyList);


