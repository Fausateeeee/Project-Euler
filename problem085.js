/*jshint esversion: 6 */
/*

By counting carefully it can be seen that a rectangular grid measuring 3 by 2 contains eighteen rectangles:

6 1x1 rectangles, 4 2x1 rectangles, 2 3x1 rectangles, 3 1x2 rectangles, 2 2x2 rectangles, 1 3x2 rectangle;

Although there exists no rectangular grid that contains exactly two million rectangles, 
find the area of the grid with the nearest solution.

*/


const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    console.log("The first value which can be written as the sum of primes in over five thousand different ways is", 
    "ANSWER");
    rl.close();
});
