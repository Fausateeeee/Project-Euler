/*jshint esversion: 6 */
/*

Pentagonal numbers are generated by the formula, P_n=n(3n−1)/2. The first ten pentagonal numbers are:

1, 5, 12, 22, 35, 51, 70, 92, 117, 145, ...

It can be seen that P_4 + P_7 = 22 + 70 = 92 = P8. However, their difference, 70 − 22 = 48, is not pentagonal.

Find the pair of pentagonal numbers, Pj and Pk, for which their sum and difference are pentagonal and D = |P_k − P_j| is minimised; 
what is the value of D?

*/

/*
    En posant k et j comme 2 naturels, nous pouvons calculer P_k - P_j et nous obtenons une équation de la forme:
    2(P_k - P_j) = (k-j)(3(k+j) - 1).
*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

   console.log("The pair of pentagonal numbers for which their sum and difference is pentagonal is", "PAIR OF PENTAGONAL",
    "and their difference is", "ANSWER");
    rl.close();

});