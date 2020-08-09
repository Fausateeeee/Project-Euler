/*jshint esversion: 6 */
/*

    Su Doku (Japanese meaning number place) is the name given to a popular puzzle concept. 
    Its origin is unclear, but credit must be attributed to Leonhard Euler who invented a similar, 
    and much more difficult, puzzle idea called Latin Squares. The objective of Su Doku puzzles, 
    however, is to replace the blanks (or zeros) in a 9 by 9 grid in such that each row, column, 
    and 3 by 3 box contains each of the digits 1 to 9. 
    Below is an example of a typical starting puzzle grid and its solution grid.

    0 0 3   0 2 0   6 0 0
    9 0 0   3 0 5   0 0 1
    0 0 1 	8 0 6   4 0 0	

    0 0 8   1 0 2   9 0 0
    7 0 0   0 0 0   0 0 8
    0 0 6   7 0 8   2 0 0

    0 0 2   6 0 9   5 0 0
    8 0 0   2 0 3   0 0 9
    0 0 5   0 1 0 	3 0 0	

    ************************
	
    4 8 3   9 2 1   6 5 7
    9 6 7   3 4 5   8 2 1
    2 5 1   8 7 6   4 9 3 	

    5 4 8   1 3 2   9 7 6
    7 2 9   5 6 4   1 3 8
    1 3 6   7 9 8	2 4 5

    3 7 2   6 8 9 	5 1 4
    8 1 4   2 5 3   7 6 9
    6 9 5   4 1 7   3 8 2
 	

    A well constructed Su Doku puzzle has a unique solution and can be solved by logic,
    although it may be necessary to employ "guess and test" methods in order 
    to eliminate options (there is much contested opinion over this). 
    The complexity of the search determines the difficulty of the puzzle; 
    the example above is considered easy because it can be solved by straight forward direct deduction.

    The 6K text file, sudoku.txt (right click and 'Save Link/Target As...'), 
    contains fifty different Su Doku puzzles ranging in difficulty, 
    but all with unique solutions (the first puzzle in the file is the example above).

    By solving all fifty puzzles find the sum of the 3-digit numbers found in the top left corner of each solution grid; 
    for example, 483 is the 3-digit number found in the top left corner of the solution grid above.

*/

const readline = require('readline');
const fs = require('fs');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    console.log("The sum of the first three digit numbers in each fifty sudoku is", 
    SudokuReader());
    rl.close();
});

function SudokuReader(){
    let allSudokus = fs.readFileSync("..\\Additional-Files\\p096_sudoku_test.txt", 'utf8');

    let allRows = allSudokus.split("\n");
    let sudokus = [];
    for (let row = 0; row < allRows.length; row += 10){
        let sudoku_rows = [];
        for (let i = 1; i <= 9; i++){
            sudoku_rows[i - 1] = allRows[row + i];
        }
            sudokus.push(new Sudoku(sudoku_rows));
    }
    sudokus[0].printSudoku();
    console.log(sudokus[0].adjacencyList);
    return 0;
}

class Sudoku {

    constructor(rows) {
        this.adjacencyList = new Map();

        this._generateVertices(rows);
        this._generateEdges();
        this.coloringAlgorithm();
    }

    newVertex(x,y,color) {
            this.adjacencyList.set(new Vertex(x,y,color), []);
    }

    newEdge(firstVertex, secondVertex) {
        this.adjacencyList.get(firstVertex).push(secondVertex);
    }

    printSudoku() {
        let vertices = this.adjacencyList.keys();
        let output = [[],[],[],[],[],[],[],[],[]];
        for (let vertex of vertices) {
            output[vertex.X][vertex.Y] = vertex.color;
        }
        let i = 0;
        for (let row of output){
            if(i++%3 == 0){
                console.log("\n");
            }
            console.log(row[0], row[1], row[2], " ", row[3], row[4], row[5], " ", row[6], row[7], row[8]);
        }
    }

    coloringAlgorithm(){

    }

    SameGrid(vertex1, vertex2){
        if (vertex1.X < 3 && vertex2.X < 3){
            if(vertex1.Y < 3 && vertex2.Y < 3){
                return true;
            }
            else if (vertex1.Y >= 3 && vertex1.Y < 6 && vertex2.Y >= 3 && vertex2 < Y){
                return true;
            }
    
            else if (vertex1.Y >= 6 && vertex2.Ys >= 6){
                return true;
            }
        }

        else if (vertex1.X >= 3 && vertex1.X < 6 && vertex2.X >= 3 && vertex2 < 6){
            if(vertex1.Y < 3 && vertex2.Y < 3){
                return true;
            }
            else if (vertex1.Y >= 3 && vertex1.Y < 6 && vertex2.Y >= 3 && vertex2 < Y){
                return true;
            }
    
            else if (vertex1.Y >= 6 && vertex2.Ys >= 6){
                return true;
            }
        }

        else if (vertex1.X >= 6 && vertex2.X >= 6){
            if(vertex1.Y < 3 && vertex2.Y < 3){
                return true;
            }
            else if (vertex1.Y >= 3 && vertex1.Y < 6 && vertex2.Y >= 3 && vertex2 < Y){
                return true;
            }
    
            else if (vertex1.Y >= 6 && vertex2.Ys >= 6){
                return true;
            }
        }

        return false;
    }

    _generateVertices(rows)
    {
        for (let i = 0; i < 9; i++)
        {
            for (let j = 0; j < 9; j++)
            {
                this.newVertex(i,j, Number.parseInt(rows[i][j]));
            }
        }
    }

    _generateEdges()
    {
        let vertices = this.adjacencyList.keys();
        for(let currentVertex of vertices){
            for (let adjacentVertex of vertices){
                if (currentVertex == adjacentVertex){
                    //do nothing
                }
                //same row
                else if (currentVertex.X == adjacentVertex.X){
                    this.newEdge(currentVertex,adjacentVertex);
                }
                //same column
                else if (currentVertex.Y == adjacentVertex.Y){
                    this.newEdge(currentVertex, adjacentVertex);
                }
                else if (this.SameGrid(currentVertex, adjacentVertex)){
                    this.newEdge(currentVertex, adjacentVertex);
                }
            }
        }
    }
}

class Vertex{
    constructor(X, Y, color){
        this.color = color;
        this.X = X;
        this.Y = Y;
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