/*jshint esversion: 6 */
/*

n! means n × (n − 1) × ... × 3 × 2 × 1

For example, 10! = 10 × 9 × ... × 3 × 2 × 1 = 3628800,
and the sum of the digits in the number 10! is 3 + 6 + 2 + 8 + 8 + 0 + 0 = 27.

Find the sum of the digits in the number 100!

*/

/*
    Run npm install big-integer 
*/

const bigInt = require("big-integer");
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to find the maximum path ', (answer) => {

    if (isNaN(parsed)) {
        console.log("Please, enter a natural number next time <3");
        rl.close();
    }

    if (parsed < 1) {
        console.log("Enter a number greater or equals to 0 next time");
        rl.close();
    }

    //let bi = bigInt(2).pow(parsed).toArray(10);

    console.log("The sum of the digits of 2 to the power of", parsed, "is :", bi.value.reduce((a,b) => a+b));
    rl.close();
});