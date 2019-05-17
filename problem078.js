/*jshint esversion: 6 */
/*

Let p(n) represent the number of different ways in which n coins can be separated into piles. 
For example, five coins can be separated into piles in exactly seven different ways, so p(5)=7.
OOOOO
OOOO   O
OOO   OO
OOO   O   O
OO   OO   O
OO   O   O   O
O   O   O   O   O

Find the least value of n for which p(n) is divisible by one million.

*/

const readline = require('readline');
const bigInt = require('big-integer');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    console.log("The first value which can be written as the sum of primes in over five thousand different ways is", 
    "ANSWER");
    rl.close();
});
