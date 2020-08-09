/*jshint esversion: 6 */
/*

2^15 = 32768 and the sum of its digits is 3 + 2 + 7 + 6 + 8 = 26.

What is the sum of the digits of the number 2^1000?

*/


/*
    I will need an implementation of BigInt
    Run npm install big-integer 
*/
const bigInt = require("big-integer");
const readline = require('readline');

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

    let bi = bigInt(2).pow(parsed).toArray(10);

    console.log("The sum of the digits of 2 to the power of", parsed, "is :", bi.value.reduce((a,b) => a+b));
    rl.close();
});