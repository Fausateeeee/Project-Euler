/*jshint esversion: 6 */
/*

A common security method used for online banking is to ask the user for three random characters from a passcode. 
For example, if the passcode was 531278, they may ask for the 2nd, 3rd, and 5th characters; the expected reply would be: 317.

The text file, keylog.txt, contains fifty successful login attempts.

Given that the three characters are always asked for in order, 
analyse the file so as to determine the shortest possible secret passcode of unknown length.

*/

const readline = require('readline');
const bigInt = require('big-integer');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    console.log("The first value which can be written as the sum of primes in over five thousand different ways is", 
    "ANSWER");
    rl.close();
});
