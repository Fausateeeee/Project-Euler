/*jshint esversion: 6 */
/*

The arithmetic sequence, 1487, 4817, 8147, in which each of the terms increases by 3330, is unusual in two ways: 
(i) each of the three terms are prime, and, 
(ii) each of the 4-digit numbers are permutations of one another.

There are no arithmetic sequences made up of three 1-, 2-, or 3-digit primes, 
exhibiting this property, but there is one other 4-digit increasing sequence.

What 12-digit number do you form by concatenating the three terms in this sequence?

*/

const readline = require('readline');
const bigInt = require('big-integer');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    const parsed = parseInt(answer);

    console.log("The concatanation of the terms of the other sequence that has the same property is", findOtherSequence());
    rl.close();

});

function findOtherSequence()
{
    for (let i = 1000; i < 3340; i++)
    {
        if (i != 1487 && bigInt(i).isPrime() && bigInt(i+3330).isPrime() && bigInt(i + 2*3330).isPrime())
        {
            let nbr1 = i.toString().split("").sort().toString();
            let nbr2 = (i + 3330).toString().split("").sort().toString();
            let nbr3 = (i + 2*3330).toString().split("").sort().toString();
            console.log(nbr1,nbr2,nbr3);
            if (nbr1 == nbr2 && nbr1 == nbr3)
            {
                return i.toString() + (i + 3330).toString() + (i + 2*3330).toString();
            }
        }
    }

}