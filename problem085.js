/*jshint esversion: 6 */
/*

By counting carefully it can be seen that a rectangular grid measuring 3 by 2 contains eighteen rectangles:

6 1x1 rectangles, 4 2x1 rectangles, 2 3x1 rectangles, 3 1x2 rectangles, 2 2x2 rectangles, 1 3x2 rectangle;

Although there exists no rectangular grid that contains exactly two million rectangles, 
find the area of the grid with the nearest solution.

*/

/*

    Define n, m, j, k be integers, j < n, k < m and n x m be a rectangular, then
    1 x 1 = n x m;
    n x 1 = m;
    1 x m = n;
    j x 1 = m(n - k + 1);
    1 x k = n(m - j + 1);

    In fact, we have the more general equation

    j x k = (n - j + 1)(m - k + 1);

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
