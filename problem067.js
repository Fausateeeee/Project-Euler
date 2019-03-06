/*jshint esversion: 6 */
/*


By starting at the top of the triangle below and moving to adjacent numbers on the row below, 
the maximum total from top to bottom is 23.

3
7 4
2 4 6
8 5 9 3

That is, 3 + 7 + 4 + 9 = 23.

Find the maximum total from top to bottom in triangle.txt (right click and 'Save Link/Target As...'), 
a 15K text file containing a triangle with one-hundred rows.

NOTE: This is a much more difficult version of Problem 18. 
It is not possible to try every route to solve this problem, as there are 299 altogether! 
If you could check one trillion (1012) routes every second it would take over 
twenty billion years to check them all. There is an efficient algorithm to solve it. ;o)

*/
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    console.log("The lowest sum for a set of five primes for which any two primes concatenate to produce another prime is",
    "ANSWER");
    rl.close();
});

/*jshint esversion: 6 */
/*

By starting at the top of the triangle below and moving to adjacent numbers on the row below, the maximum total from top to bottom is 23.

3
7 4
2 4 6
8 5 9 3

That is, 3 + 7 + 4 + 9 = 23.

Find the maximum total from top to bottom of the triangle below:

75
95 64
17 47 82
18 35 87 10
20 04 82 47 65
19 01 23 75 03 34
88 02 77 73 07 63 67
99 65 04 28 06 16 70 92
41 41 26 56 83 40 80 70 33
41 48 72 33 47 32 37 16 94 29
53 71 44 65 25 43 91 52 97 51 14
70 11 33 28 77 73 17 78 39 68 17 57
91 71 52 38 17 14 91 43 58 50 27 29 48
63 66 04 68 89 53 67 30 73 16 69 87 40 31
04 62 98 27 23 09 70 98 73 93 38 53 60 04 23

NOTE: As there are only 16384 routes, it is possible to solve this problem by trying every route. 
However, Problem 67, is the same challenge with a triangle containing one-hundred rows; 
it cannot be solved by brute force, and requires a clever method! ;o)

*/

/*
    I will reuse my graph class from problem 15 and I will implement Dijkstra algorithm.
    I will use 1/n where n is the value for the weigh of the path
*/
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



rl.question('Press enter to find the maximum path ', (answer) => {

    const parsed = parseInt(answer);

    const TREE = [
        [75,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
        [95, 64,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
        [17, 47, 82,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
        [18, 35, 87, 10,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
        [20, 04, 82, 47, 65,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
        [19, 01, 23, 75, 03, 34,  0,  0,  0,  0,  0,  0,  0,  0,  0],
        [88, 02, 77, 73, 07, 63, 67,  0,  0,  0,  0,  0,  0,  0,  0],
        [99, 65, 04, 28, 06, 16, 70, 92,  0,  0,  0,  0,  0,  0,  0],
        [41, 41, 26, 56, 83, 40, 80, 70, 33,  0,  0,  0,  0,  0,  0],
        [41, 48, 72, 33, 47, 32, 37, 16, 94, 29,  0,  0,  0,  0,  0],
        [53, 71, 44, 65, 25, 43, 91, 52, 97, 51, 14,  0,  0,  0,  0],
        [70, 11, 33, 28, 77, 73, 17, 78, 39, 68, 17, 57,  0,  0,  0],
        [91, 71, 52, 38, 17, 14, 91, 43, 58, 50, 27, 29, 48,  0,  0],
        [63, 66, 04, 68, 89, 53, 67, 30, 73, 16, 69, 87, 40, 31,  0],
        [04, 62, 98, 27, 23, 09, 70, 98, 73, 93, 38, 53, 60, 04, 23]];

        const testTriangle = [[3, 0, 0, 0],
                             [7, 4, 0, 0],
                             [2, 4, 6, 0],
                             [8, 5, 9, 3]];


    console.time("process");
    let triangle = new weightedTriangle(TREE);
    
    //triangle.printGraph();
    let results = triangle.dijkstraAlgorithm("0,0");
    console.timeEnd("process");
    console.log("The maximum total of the triangle is", results.length, "by going to the nodes :", results.path);
    
    rl.close();
});

class weightedTriangle {

    constructor(tree) {
        this.size = tree.length*(tree.length+1)/2 + 1; //Number of point in the grid equals (dimension + 1)^2
        this.adjacencyList = new Map();
        this.length = tree.length;
        this.tree = tree;

        this._generateVertices(tree.length);
        this._generateEdges(tree, tree.length);
    }

    newVertex(vertex) {
        this.adjacencyList.set(vertex, []);
    }

    newEdge(firstVertex, secondVertex, _weigh) {
        this.adjacencyList.get(firstVertex).push({vertex:secondVertex, weigh:_weigh});
    }

    printGraph() {
        let keys = this.adjacencyList.keys();

        for (let key of keys) {
            let values = this.adjacencyList.get(key);
            let output = "";

            for (let value of values) {
                output += value.vertex + " Weigh:" + value.weigh + " .. ";
            }

            console.log(key + " --> " + output);
        }
    }

    dijkstraAlgorithm(startingNode)
    {
        let visited = {};
        for (let key of this.adjacencyList.keys())
        {
            visited[key] = {dist: 0, path:undefined};
        }
        visited[startingNode].dist = 0;

        let queue = new Queue();

        queue.enqueue(startingNode);

        while (!queue.isEmpty())
        {
            let currentVertex = queue.dequeue();

            let neighbours = this.adjacencyList.get(currentVertex);
    
            for (let neighbour in neighbours)
            {
                let elem = neighbours[neighbour];
                if (visited[currentVertex].dist + elem.weigh >= visited[elem.vertex].dist)
                {
                    visited[elem.vertex].dist = visited[currentVertex].dist + elem.weigh;
                    visited[elem.vertex].path = currentVertex;
                    if (queue.contains(elem.vertex))
                    {
                        queue.enqueue(elem.vertex);
                    }
                }
            }

        }

        console.log(visited);
        let path = this._computePath(visited);
        let length = visited.FINAL.dist;

        return {path, length};
    }

    _generateVertices(length)
    {
        for (let i = 0; i < length; i++)
        {
            for (let j = 0; j <= i; j++)
            {
                this.newVertex(i.toString() + "," + j.toString());
            }
        }


        this.newVertex(length.toString()+".right");
        this.newVertex(length.toString()+".left");
        this.newVertex("FINAL");
    }

    _generateEdges(tree, length)
    {
        for (let i = 0; i < length - 1; i++)
        {
            for (let j = 0; j <= i; j++)
            {
                this.newEdge(i.toString() + "," + j.toString(), (i + 1).toString() + "," + j.toString(), tree[i][j]);
                this.newEdge(i.toString() + "," + j.toString(), (i + 1).toString() + "," + (j+1).toString(), tree[i][j+1]);
            }
        }

        //Needed for the weigh of the path
        for (let i = 0; i < length-1; i++) 
        {
            this.newEdge((length-1).toString() + "," + i.toString(),(length).toString()+".right", tree[length-1][i]);
            this.newEdge((length-1).toString() + "," + i.toString(),(length).toString()+".left", tree[length-1][i+1]);
        }
        this.newEdge(length.toString()+".right", "FINAL", 0);
        this.newEdge(length.toString()+".left", "FINAL", 0);
    }

    _computePath(results)
    {
        let endingNode = "FINAL";
        let path = [];

        while (endingNode != "0,0")
        {
            endingNode = results[endingNode].path;
            path.unshift(endingNode);
        }

        return path;
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
    contains(item)
    {
        return (this.collection.indexOf(item) == -1);
    }
}