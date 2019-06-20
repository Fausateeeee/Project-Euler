/*jshint esversion: 6 */
/*

    The smallest number expressible as the sum of a prime square, prime cube, and prime fourth power is 28.
    In fact, there are exactly four numbers below fifty that can be expressed in such a way:

    28 = 22 + 23 + 24

    33 = 32 + 23 + 24

    49 = 52 + 23 + 24

    47 = 22 + 33 + 24

    How many numbers below fifty million can be expressed as the sum of a prime square, prime cube, and prime fourth power?

*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    console.log("The total of the digital sums of the first one hundred decimal digits for all the irrational square roots under 100 is", 
    "ANSWER");
    rl.close();
});
