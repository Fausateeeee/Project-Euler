/*jshint esversion: 6 */
/*

Starting in the top left corner of a 2×2 grid, and only being able to move to the right and down, there are exactly 6 routes to the bottom right corner.

How many such routes are there through a 20×20 grid?

*/

/* 
First, we implement the simpleConnectedGrid which ressemble of a graph class
*/

/*
    Slow approch, I should do the combinational work to count how many paths are possible
*/
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter a natural number ', (answer) => {

    const parsed = parseInt(answer);

    if (isNaN(parsed)) {
        console.log("Please, enter a natural number next time <3");
        rl.close();
    }

    if (parsed < 1) {
        console.log("Enter a number greater than 0 next time");
        rl.close();

    }


    let grid = new simpleConnectedGrid(parsed);

    //Old solution by detphFirstSearch, it was really slow

    let solution = 1;
    for (let i = 1; i <= parsed; i++)
    {
        solution *= (parsed + i)/i;
    }
    //grid.depthFirstSearch("0,0", parsed.toString()+","+parsed.toString());

    console.log("The number of path in a", parsed, "x", parsed, "grid is :", Math.ceil(solution));
    rl.close();
});

class simpleConnectedGrid {

    constructor(dimension) {
        this.size = Math.pow(dimension + 1, 2); //Number of point in the grid equals (dimension + 1)^2
        this.adjacencyList = new Map();
        this.path_nbr = 0;

        this._generateVertices(dimension);
        this._generateEdges(dimension);
    }

    newVertex(vertex) {
        this.adjacencyList.set(vertex, []);
    }

    newEdge(firstVertex, secondVertex) {
        this.adjacencyList.get(firstVertex).push(secondVertex);
    }

    printGraph() {
        let keys = this.adjacencyList.keys();

        for (let key of keys) {
            let values = this.adjacencyList.get(key);
            let output = "";

            for (let value of values) {
                output += value + " ";
            }

            console.log(key + " --> " + output);
        }
    }

    depthFirstSearch(startingNode, targetVertex) {
        let visited = {};

        let path_nbr = 0;

        for (let key in this.adjacencyList.keys())
        {
            visited[key] = false;
        }

        this._depthFirstSearch(startingNode, targetVertex, visited);
    }

    breadthFirstSearch(startingNode) {
        let visited = {};
        for (let key in this.adjacencyList.keys())
        {
            visited[key] = false;
        }

        let queue = new Queue();
        queue.print();
        visited[startingNode] = true;
        queue.enqueue(startingNode);
        queue.print();
        while (!queue.isEmpty())
        {
            let queueElement = queue.dequeue();

            console.log(queueElement);

            let neighbours = this.adjacencyList.get(queueElement);

            for (let neighbour in neighbours)
            {
                let elem = neighbours[neighbour];

                if(!visited[elem])
                {
                    visited[elem] = true;
                    queue.enqueue(elem);
                }
            }
        }
    }

    _generateVertices(dimension) {
        for (let i = 0; i <= dimension; i++) {
            for (let j = 0; j <= dimension; j++) {
                this.newVertex(i.toString() + "," + j.toString());
            }
        }
    }

    _generateEdges(dimension) {
        //Horizontal connection
        for (let i = 0; i <= dimension; i++) {
            for (let j = 0; j < dimension; j++) {
                this.newEdge(i.toString() + "," + j.toString(), i.toString() + "," + (j + 1).toString());
            }
        }
        //Vertical connect
        for (let i = 0; i <= dimension; i++) {
            for (let j = 0; j < dimension; j++) {
                this.newEdge(j.toString() + "," + i.toString(), (j + 1).toString() + "," + i.toString());
            }
        }

    }

    _depthFirstSearch(currentVertex, targetVertex, visited)
    {
        visited[currentVertex] = true;

        if(currentVertex == targetVertex)
        {
            this.path_nbr++;
        }
        else
        {
            let neighbours = this.adjacencyList.get(currentVertex);
    
            for (let neighbour in neighbours)
            {
                let elem = neighbours[neighbour];
                if (!visited[elem])
                {
                    this._depthFirstSearch(elem, targetVertex, visited);
                }
            }
        }

        visited[currentVertex] = false;

    }


}

class Queue
{
    constructor()
    {
        this.collection = [];
    }

    print()
    {
        console.log(this.collection);
    }

    enqueue(item)
    {
        this.collection.push(item);
    }

    dequeue()
    {
        return this.collection.pop();
    }

    front()
    {
        return this.collection[0];
    }

    size()
    {
        return this.collection.length;
    }

    isEmpty()
    {
        if  (this.collection.length > 0)
        {
            return false;
        }

        return true;
    }
}