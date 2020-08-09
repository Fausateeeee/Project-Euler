/*jshint esversion: 6 */
/*

    The first known prime found to exceed one million digits was discovered in 1999, 
    and is a Mersenne prime of the form 2^6972593−1; it contains exactly 2,098,960 digits. 
    Subsequently other Mersenne primes, of the form 2p−1, have been found which contain more digits.

    However, in 2004 there was found a massive non-Mersenne prime which contains 2,357,207 digits: 28433×2^7830457 + 1.

    Find the last ten digits of this prime number.

*/

/*

    I should start to find the 10 lasts digits of 2^7830457 and work my way from there

*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    console.log("The last ten digits of 28433×2^7830457 + 1 are", (BigInt(28433)*(BigInt(2)**BigInt(7830457)) + BigInt(1))%BigInt(10000000000));
    rl.close();
});

