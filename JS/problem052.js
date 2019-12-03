/*jshint esversion: 6 */
/*

It can be seen that the number, 125874, and its double, 251748, contain exactly the same digits, but in a different order.

Find the smallest positive integer, x, such that 2x, 3x, 4x, 5x, and 6x, contain the same digits.

*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue: ', (answer) => {

    console.log("The smallest positive integer, x, such that 2x, 3x, 4x, 5x, and 6x, contain the same digits is", findSpecialNumber());
    rl.close();
});

function findSpecialNumber()
{
      
    for (let i = 5; i < 15; i++)
    {
        for (let j = Math.pow(10, i); 6*j < Math.pow(10, i + 1); j++)
        {
            let x_1 = j;
            let x_2 = 2*j;
            let x_3 = 3*j;
            let x_4 = 4*j;
            let x_5 = 5*j;
            let x_6 = 6*j;

            x_1 = x_1.toString().split("").sort().join("");
            x_2 = x_2.toString().split("").sort().join("");
            x_3 = x_3.toString().split("").sort().join("");
            x_4 = x_4.toString().split("").sort().join("");
            x_5 = x_5.toString().split("").sort().join("");
            x_6 = x_6.toString().split("").sort().join("");

            if (x_1 == x_2 && x_2 == x_3 && x_3 == x_4 && x_4 == x_5 && x_5 == x_6)
            {
                return j;
            }
        }
    }
}