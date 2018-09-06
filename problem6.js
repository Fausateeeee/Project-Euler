/*jshint esversion: 6 */
/*

The sum of the squares of the first ten natural numbers is,
1^2 + 2^2 + ... + 10^2 = 385

The square of the sum of the first ten natural numbers is,
(1 + 2 + ... + 10)^2 = 552 = 3025

Hence the difference between the sum of the squares of the first ten natural numbers and the square of the sum is 3025 − 385 = 2640.

Find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum.

*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter a natural number ', (answer) => {

    const parsed = parseInt(answer);

    if (isNaN(parsed)) {
        console.log("Please, enter a natural number next time <3");
        return 0;
    }

    if (parsed < 1) {
        return 0;
    }

    let squaredsum = Math.pow(parsed*(parsed + 1)/2,2);
    let sumofsquares = parsed*(parsed + 1)*(2*parsed + 1)/6;


    console.log("The difference between the square of the sum and  the sum of the squares of the first ", parsed, " numbers is :", 
    squaredsum - sumofsquares);
    rl.close();
});