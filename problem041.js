/*jshint esversion: 6 */
/*

We shall say that an n-digit number is pandigital if it makes use of all the digits 1 to n exactly once. 
For example, 2143 is a 4-digit pandigital and is also prime.

What is the largest n-digit pandigital prime that exists?

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

    else if (parsed < 1) {
        console.log("Enter a positive number next time");
        rl.close();
    }

    else
    {
        console.log("The greatest prime that is the closest to 1 to", parsed, 
        "pandigital is", "ANSWER");
        rl.close();
    }

});
