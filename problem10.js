/*jshint esversion: 6 */
/*

The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.

Find the sum of all the primes below two million.

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

    console.log("The sum of all primes bellow ", parsed, " is :", 0);
    rl.close();
});