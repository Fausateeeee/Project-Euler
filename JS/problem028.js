/*jshint esversion: 6 */
/*

Starting with the number 1 and moving to the right in a clockwise direction a 5 by 5 spiral is formed as follows:

*21  22  23  24 *25
 20  *7   8  *9  10
 19   6  *1   2  11
 18  *5  *4  *3  12
*17  16  15  14 *13

It can be verified that the sum of the numbers on the diagonals is 101.

What is the sum of the numbers on the diagonals in a 1001 by 1001 spiral formed in the same way?


*/

/*

    {1x1} 1 + {3x3}((1 + 2) + (1 + 4) + (1 + 6) + (1 + 8)) + {5x5}((9 + 4) + (9 + 8) + (9 + 12) + (9 + 16)) + 
    {7x7}((25 + 6) + (25 + 12) + (25 + 18) + (25 + 24)) + ...
*/


const readline = require('readline');
const bigInt = require("big-integer");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter an odd natural number ', (answer) => {

    const parsed = parseInt(answer);

    if (isNaN(parsed)) {
        console.log("Please, enter a natural number next time <3");
        rl.close();
    }

    else if (parsed < 1) {
        console.log("Enter a number greater than 0 next time");
        rl.close();
    }

    else if (parsed%2 == 0)
    {
        console.log("Enter an odd number next time *o*");
        rl.close();  
    }
    
    else if (parsed == 1)
    {
        console.log("The sum of the number on the diagnal of a", 1, "by", 1, "grid is :", 1);
        rl.close();
    }

    else
    {
        let diagonalTotal = 1;
        let base = 1;

        for (let rank = 3; rank <= parsed; rank += 2)
        {
            for (let j = 1; j <= 4; j++)
            {
                diagonalTotal += base + (rank - 1)*j;
            }
            base += (rank - 1)*4;
        }

        console.log("The sum of the number on the diagnal of a", answer, "by", answer, "grid is :", diagonalTotal);
        rl.close();
    }

});
