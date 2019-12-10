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

    console.log("The sum of all the minimal product-sum numbers for 2 ≤ k ≤ 12000 is", 
    SudokuReader());
    rl.close();
});

function SudokuReader(){
    let allSudokus = fs.readFileSync("..\\Additional-Files\\p096_sudoku_test.txt", 'utf8');

    let allRows = allSudokus.split("\n");
    let sudokus = [];
    let sudoku;
    for (let row = 0; row < allRows.length; ++row){
        if (row%10 == 0){
            sudoku = new Sudoku();
            sudokus.push(sudoku);
        }else{
            sudoku.addRow(allRows[row], row%10);
        }
    }
    for(let s of sudokus){
        s.update();
        s.update_unknown();
    }
    return sudoku;
}

class Sudoku{
    constructor(){
     this.rows = {};
     this.columns = {};
     this.squares = {};

     this.rows_unknown = [0,0,0,0,0,0,0,0,0];
     this.columns_unknown = [0,0,0,0,0,0,0,0,0];
     this.squares_unknown = [0,0,0,0,0,0,0,0,0];

     for(let i = 1; i < 10; ++i){
         this.rows[i] = [0,0,0,0,0,0,0,0,0];
         this.columns[i] = [0,0,0,0,0,0,0,0,0];
         this.squares[i] = [0,0,0,0,0,0,0,0,0];
     } 
    }
    addRow(row, index){
        for(let i = 0; i < 9; ++i){
            this.rows[index][i] = row[i];
        }
    }

    update(){
        for(let x = 1; x < 10; ++x){
            for (let y = 1; y < 10; ++y){
                this.columns[y][x - 1] = this.rows[x][y-1];
                if (x < 4){
                    if (y < 4){
                        this.squares[1][3*(x-1) + y - 1] = this.rows[x][y-1];
                    }
                    else if (y < 7){
                        this.squares[2][3*(x-1) + y - 4] = this.rows[x][y-1];
                    }
                    else{
                        this.squares[3][3*(x-1) + y - 7] = this.rows[x][y-1];
                    }
                }
                else if (x < 7){
                    if (y < 4){
                        this.squares[4][3*(x-4) + y - 1] = this.rows[x][y-1];
                    }
                    else if (y < 7){
                        this.squares[5][3*(x-4) + y - 4] = this.rows[x][y-1];
                    }
                    else{
                        this.squares[6][3*(x-4) + y - 7] = this.rows[x][y-1];
                    }
                }
                else{
                    if (y < 4){
                        this.squares[7][3*(x-7) + y - 1] = this.rows[x][y-1];
                    }
                    else if (y < 7){
                        this.squares[8][3*(x-7) + y - 4] = this.rows[x][y-1];
                    }
                    else{
                        this.squares[9][3*(x-7) + y - 7] = this.rows[x][y-1];
                    }
                }
            }
        }
    }
    update_unknown(){
        for(let i = 1; i < 10; i++){
            this.rows_unknown[i-1] = this.rows[i].NumberOfZeros()
            this.columns_unknown[i-1] = this.columns[i].NumberOfZeros()
            this.squares_unknown[i-1] = this.squares[i].NumberOfZeros()
        }
    }
}

Array.prototype.NumberOfZeros = function() {
    let zeros = 0;
    for(let i=0; i<this.length; ++i) {
        if (this[i] == 0){
            zeros++;
        }
    }

    return zeros;
};