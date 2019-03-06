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
It is not possible to try every route to solve this problem, as there are 29^9 altogether! 
If you could check one trillion (10^12) routes every second it would take over 
twenty billion years to check them all. There is an efficient algorithm to solve it. ;o)

*/
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    let triangle = new weightedTriangle(FormatFile());
    let results = triangle.dijkstraAlgorithm("0,0");
    console.log("The maximum total of the triangle is", results.length, "by going to the nodes :", results.path);

    rl.close();
});


function FormatFile()
{
    let allText = fs.readFileSync("Additional-Files\\p067_triangle.txt", 'utf8');
    let allRows = allText.split("\n");
    let triangle = [];
    for (let row of allRows)
    {
        row = row.split(" ");
        for (let index in row)
        {
            row[index] = parseInt(row[index]);
        }
        while(row.length < 100)
        {
            row.push(0);
        }
        triangle.push(row);
    }
    return(triangle);
}

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