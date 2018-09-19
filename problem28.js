/*jshint esversion: 6 */
/*

Starting with the number 1 and moving to the right in a clockwise direction a 5 by 5 spiral is formed as follows:

*21 22  23  24   *25
 20 *7   8  *9   10
 19  6  *1   2   11
 18 *5  *4   3   12
*17 16  15  14  *13

It can be verified that the sum of the numbers on the diagonals is 101.

What is the sum of the numbers on the diagonals in a 1001 by 1001 spiral formed in the same way?

*/

const readline = require('readline');
const bigInt = require("big-integer");

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
    

    console.log("The sum of the number on the diagnal of a", answer, "by", answer, "grid is :", "ANSWER");
    rl.close();
});
