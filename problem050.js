/*jshint esversion: 6 */
/*

The prime 41, can be written as the sum of six consecutive primes:
41 = 2 + 3 + 5 + 7 + 11 + 13

This is the longest sum of consecutive primes that adds to a prime below one-hundred.

The longest sum of consecutive primes below one-thousand that adds to a prime, contains 21 terms, and is equal to 953.

Which prime, below one-million, can be written as the sum of the most consecutive primes?

*/

const readline = require('readline');
const bigInt = require('big-integer');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter an integer : ', (answer) => {

    const parsed = parseInt(answer);

    if (isNaN(parsed)) {
        console.log("Please, enter a natural number next time <3");
        rl.close();
    } 
    else if (parsed < 1) {
        console.log("Enter a positive number next time");
        rl.close();
    } 
    else {

        console.log("The prime below", parsed, "that can be written as the sum of the most consecutive primes is", "ANSWER");
        rl.close();
    }

});

