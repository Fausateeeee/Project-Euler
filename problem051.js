/*jshint esversion: 6 */
/*

By replacing the 1st digit of the 2-digit number *3, 
it turns out that six of the nine possible values: 13, 23, 43, 53, 73, and 83, are all prime.

By replacing the 3rd and 4th digits of 56**3 with the same digit, 
this 5-digit number is the first example having seven primes among the ten generated numbers, 
yielding the family: 56003, 56113, 56333, 56443, 56663, 56773, and 56993. 
Consequently 56003, being the first member of this family, is the smallest prime with this property.

Find the smallest prime which, by replacing part of the number (not necessarily adjacent digits) with 
the same digit, is part of an eight prime value family.

*/

/*
    There are multiple cases to check, if n < 100, then I check for *a.
    For 100 < n < 1000, I need to check for *ab, a*b, **a.
    For 1000 < n < 10000, I need to check for *abc, a*bc, ab*c, **ab, *a*b, a**b
*/

const readline = require('readline');
const bigInt = require('big-integer');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    console.log("The smallest prime that have the prime digit replacement that is part of an eigth prime value family is", 
    "ANSWER");
    rl.close();
});

function findPrimeFamily(pr)
{
    for (let i = 0; i < 10; i++)
    {
        
    }
}