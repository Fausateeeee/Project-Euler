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

rl.question('Enter a natural number ', (answer) => {

    let parsed = parseInt(answer);

    if (isNaN(parsed)) {
        console.log("Please, enter a natural number next time <3");
        rl.close();
    }

    if (parsed < 0) {
        console.log("Enter a number greater or equals to 0 next time");
        rl.close();
    }
    let BigArray = [bigInt(1)];
    for (let i = 2; i <= parsed; i++)
    {
        BigArray.push(bigInt(i));
    }
    
    let BigNumber = bigInt(1);
    for (let i of BigArray)
    {
        BigNumber = BigNumber.multiply(i) ;
    }

    console.log("The sum of the digits for the factorial of", parsed, "is :", BigNumber.toArray(10).value.reduce((a,b) => a+b));
    rl.close();
});