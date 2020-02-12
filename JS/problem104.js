/*jshint esversion: 7 */
/*

    The Fibonacci sequence is defined by the recurrence relation:

        Fn = Fn−1 + Fn−2, where F1 = 1 and F2 = 1.

    It turns out that F541, which contains 113 digits, is the first Fibonacci number 
    for which the last nine digits are 1-9 pandigital (contain all the digits 1 to 9, but not necessarily in order). 
    And F2749, which contains 575 digits, is the first Fibonacci number for which the first nine digits are 1-9 pandigital.

    Given that Fk is the first Fibonacci number for which the first nine digits AND the last nine digits are 1-9 pandigital, find k.

*/

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    console.log("The first Fibonacci number for which its first nine and last nine digits are pandigital is at position", "ANSWER");
    rl.close();
});

