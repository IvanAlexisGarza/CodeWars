//O(N log(N))
class PriorityQueue {
    constructor(){
        this.values = [];
    }
    enqueue(val, priority){
        this.values.push({val, priority});
        this.sort();
    };
    denqueue(){
        return this.values.shift();
    };
    sort(){
        this.values.sort((a, b) => a.priority - b.priority);
    };
}

class WeightedGraph {
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        if (!this.adjacencyList.hasOwnProperty(vertex)) {
            this.adjacencyList[vertex] = [];
        }
        else console.log("This vertex already exists")
    }

    addEdge(vertex1, vertex2, weight) {
        this.adjacencyList[vertex1].push({node: vertex2, weight});
        this.adjacencyList[vertex2].push({node: vertex1, weight});
    }
    
    dijkstra(start, finish){
        const nodes = new PriorityQueue();
        const distances = {};
        const previous = {};
        let path = [];
        let dequeued = null;

        for(let vertex in this.adjacencyList) {
            if(vertex === start){
                distances[vertex] = 0;
                nodes.enqueue(vertex, 0);
            } else {
                distances[vertex] = Infinity;
                nodes.enqueue(vertex, Infinity);
            }
            previous[vertex] = null;
        }


        while(nodes.values.length) {
            dequeued = nodes.denqueue().val;
            if(dequeued === finish){
                while(previous[dequeued]){
                    path.push(dequeued);
                    dequeued = previous[dequeued];
                }
                return path.concat(dequeued).reverse();
            } 

            if(dequeued || distances[dequeued] !== Infinity){
                for(let neighbor in this.adjacencyList[dequeued]){
                    let nextNode = this.adjacencyList[dequeued][neighbor];
                    let candidate = distances[dequeued] + nextNode.weight;
                    let neighborNode = nextNode.node;

                    if(candidate < distances[neighborNode]){
                        distances[neighborNode] = candidate;
                        previous[neighborNode] = dequeued;
                        nodes.enqueue(neighborNode, candidate);
                    }
                }
            }

        }

    }
}


let g = new WeightedGraph();


g.addVertex("A")
g.addVertex("B")
g.addVertex("C")
g.addVertex("D")
g.addVertex("E")
g.addVertex("F")

g.addEdge("A", "B", 4)
g.addEdge("A", "C", 2)
g.addEdge("B", "E", 3)
g.addEdge("C", "D", 2)
g.addEdge("C", "F", 4)
g.addEdge("D", "E", 3)
g.addEdge("D", "F", 1)
g.addEdge("E", "F", 1)

console.log(g.dijkstra("A", "E"))
// console.log(g.adjacencyList);


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

    // removeEdge(vertex1, vertex2) {
    //     this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(arrValue => arrValue.node !== vertex2);
    //     this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(arrValue => arrValue.node !== vertex1);
    // }

    // removeVertex(vertex) {
    //     while (this.adjacencyList[vertex].length) {
    //         let adjacentVertex = this.adjacencyList[vertex].pop();
    //         this.removeEdge(vertex, adjacentVertex);
    //     }
    //     delete this.adjacencyList[vertex];
    // }
