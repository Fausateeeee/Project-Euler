/*jshint esversion: 7 */
/*

    Comparing two numbers written in index form like 2^11 and 3^7 is not difficult, 
    as any calculator would confirm that 2^11 = 2048 < 3^7 = 2187.

    However, confirming that 632382^518061 > 519432^525806 would be much more difficult, 
    as both numbers contain over three million digits.

    Using base_exp.txt (right click and 'Save Link/Target As...'), 
    a 22K text file containing one thousand lines with a base/exponent pair on each line, 
    determine which line number has the greatest numerical value.

    NOTE: The first two lines in the file represent the numbers in the example given above.

*/

const readline = require('readline');
const fs = require('fs');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    console.log("The line that contains the biggest number is", 
    ReadFile());
    rl.close();
});

function ReadFile(){
    let NbrArr = [];
    let allNumbers = fs.readFileSync("..\\Additional-Files\\p099_base_exp.txt", 'utf8');

    let allRows = allNumbers.split("\n");
    let rowNbr = 0;
    for (let row of allRows){
        split = row.split(',');
        NbrArr.push(new BaseExponent(Number.parseInt(split[0]), Number.parseInt(split[1]), ++rowNbr));
    }
    let max = 0;
    let row = 0;
    for (let nbr of NbrArr){
        if(nbr.length > max){
            max = nbr.length;
            row = nbr.row;
        }
    }
    return row;
}

class BaseExponent{
    constructor(base, exponent, row){
        this.base = base;
        this.exponent = exponent;
        this.row = row;
        this.length = Math.ceil(Math.log2(base) * exponent);
    }
}
