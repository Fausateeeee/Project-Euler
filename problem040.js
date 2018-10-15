/*jshint esversion: 6 */
/*

An irrational decimal fraction is created by concatenating the positive integers:

0.123456789101112131415161718192021...

It can be seen that the 12th digit of the fractional part is 1.

If d_n represents the n-th digit of the fractional part, find the value of the following expression.

d_1 × d_10 × d_100 × d_1000 × d_10000 × d_100000 × d_1000000

*/
/*
    I can probably brute force it but there is probably an easy solution
*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter a natural number for 10^n : ', (answer) => {

    const parsed = parseInt(answer);

    if (isNaN(parsed)) {
        console.log("Please, enter a natural number next time <3");
        rl.close();
    }

    else if (parsed < 0) {
        console.log("Enter a positive number next time");
        rl.close();
    }

    else
    {
        console.log("The product of the digits of the Cahmpernowne's constant for each digit in a postion of 10^n from n = 0 to", parsed, 
        "is", "ANSWER");
        rl.close();
    }

});

