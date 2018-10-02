/*jshint esversion: 6 */
/*

We shall say that an n-digit number is pandigital if it makes use of all the digits 1 to n exactly once; for example, the 5-digit number, 15234, is 1 through 5 pandigital.

The product 7254 is unusual, as the identity, 39 × 186 = 7254, containing multiplicand, multiplier, and product is 1 through 9 pandigital.

Find the sum of all products whose multiplicand/multiplier/product identity can be written as a 1 through 9 pandigital.
HINT: Some products can be obtained in more than one way so be sure to only include it once in your sum.

*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter a number from 2 to 9 : ', (answer) => {

    const parsed = parseInt(answer);

    if (isNaN(parsed)) {
        console.log("Please, enter a natural number next time <3");
        rl.close();
    }

    else if (parsed < 2 || parsed > 9) {
        console.log("Enter a valid number next time");
        rl.close();
    }

    else
    {
        console.log("There are", "ANSWER", "ways to make 1 through", parsed, "pandigital product.");
        rl.close();
    }

});