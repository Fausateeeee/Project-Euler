/*jshint esversion: 6 */
/*

It is well known that if the square root of a natural number is not an integer, then it is irrational. 
The decimal expansion of such square roots is infinite without any repeating pattern at all.

The square root of two is 1.41421356237309504880..., and the digital sum of the first one hundred decimal digits is 475.

For the first one hundred natural numbers, 
find the total of the digital sums of the first one hundred decimal digits for all the irrational square roots.

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
