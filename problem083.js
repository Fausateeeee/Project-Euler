/*jshint esversion: 6 */
/*

NOTE: This problem is a more challenging version of Problem 81.

The minimal path sum in the 5 by 5 matrix below, by starting in any cell in the left column and finishing in any cell in the right column, 
and only moving up, down, and right, is indicated in red and bold; the sum is equal to 994.

131*  673   234* 103*  18*
201*  96*  342*  965   150*
630   803  746   422*  111*
537   699  497   121*  956
805   732  524   37*   331*

Find the minimal path sum, in matrix.txt (right click and "Save Link/Target As..."), 
a 31K text file containing a 80 by 80 matrix, from the left column to the right column.

*/

const readline = require('readline');
const fs = require('fs');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    console.log("The minimum path in this matrix is", 
    FindPath());
    rl.close();
});

function FindPath()
{
    let matrix = new weightedMatrix(FormatFile());
    //matrix.printGraph();
    let results = matrix.dijkstraAlgorithm("0,0");

    return results;
}

function FormatFile()
{
    let allText = fs.readFileSync("Additional-Files\\p083_matrix.txt", 'utf8');
    let allRows = allText.split("\n");
    let matrix = [];
    for (let row of allRows)
    {
        row = row.split(",");

        for (let index in row)
        {
            row[index] = parseInt(row[index]);
        }
        matrix.push(row);

    }
    return matrix;
}

class weightedMatrix {

    constructor(tree) {
        this.size = tree.length*tree.length; //Number of point in the grid equals (dimension + 1)^2
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
            visited[key] = {dist: 99999999999, path:undefined};
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
                if (visited[currentVertex].dist + elem.weigh < visited[elem.vertex].dist)
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

        //console.log(visited);
        let path = this._computePath(visited);
        let length = visited.FINAL.dist;

        return {path, length};
    }

    _generateVertices(length)
    {
        for (let i = 0; i < length; i++)
        {
            for (let j = 0; j < length; j++)
            {
                this.newVertex(i.toString() + "," + j.toString());
            }
        }

        this.newVertex("FINAL");
    }

    _generateEdges(tree, length)
    {
        for (let i = 0; i < length - 1; i++)
        {
            for (let j = 0; j < length - 1; j++)
            {
                this.newEdge(i.toString() + "," + j.toString(), (i).toString() + "," + (j+1).toString(), tree[i][j]);
                this.newEdge((i).toString() + "," + (j+1).toString(), i.toString() + "," + j.toString(),  tree[i][j+1]);
                this.newEdge(i.toString() + "," + j.toString(), (i + 1).toString() + "," + (j).toString(), tree[i][j]);
                this.newEdge((i + 1).toString() + "," + (j).toString(), i.toString() + "," + j.toString(), tree[i+1][j]);
            }
        }

        for (let j = 0; j < length - 1; j++)
        {
            this.newEdge((length - 1).toString() + "," + j.toString(), (length - 1).toString() + "," + (j+1).toString(), tree[length - 1][j]);
            this.newEdge(j.toString() + "," + (length - 1).toString(), (j+1).toString() + "," + (length - 1).toString(), tree[j][(length - 1)]);
        }

        this.newEdge((length - 1).toString() + "," + (length - 1).toString(), "FINAL", tree[length - 1][length - 1]);


    }

    _computePath(results)
    {
        let endingNode = "FINAL";
        let path = [];

        while (endingNode != "0,0")
        {
            console.log(results[endingNode]);
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