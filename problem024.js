/*jshint esversion: 6 */
/*

A permutation is an ordered arrangement of objects. For example, 3124 is one possible permutation of the digits 1, 2, 3 and 4. 
If all of the permutations are listed numerically or alphabetically, we call it lexicographic order. The lexicographic permutations of 0, 1 and 2 are:

012   021   102   120   201   210

What is the millionth lexicographic permutation of the digits 0, 1, 2, 3, 4, 5, 6, 7, 8 and 9?

*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


rl.question('Write a natural number ', (answer) => {
    
    let parsed = parseInt(answer);

    if (isNaN(parsed)) {
        console.log("Please, enter a natural number next time <3");
        rl.close();
    }

    if (parsed <= 0) {
        console.log("Enter a number greater than 0 next time");
        rl.close();
    }

    console.log("The", parsed, "lexicographic permutation of the digits 0, 1, 2, 3, 4, 5, 6, 7, 8 and 9 is", "ANSWER");
    rl.close();
});
