/*jshint esversion: 6 */
/*

The primes 3, 7, 109, and 673, are quite remarkable. 
By taking any two primes and concatenating them in any order the result will always be prime. 
For example, taking 7 and 109, both 7109 and 1097 are prime. 
The sum of these four primes, 792, represents the lowest sum for a set of four primes with this property.

Find the lowest sum for a set of five primes for which any two primes concatenate to produce another prime.

*/
const readline = require('readline');
const bigInt = require('big-integer');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    console.log("The lowest sum for a set of five primes for which any two primes concatenate to produce another prime is",
    FindPrimeFamily());
    rl.close();
});

function FindPrimeFamily()
{
    let startingFamily = [3,7,109,673]; //This family yields no result
    let potentialPrime = 675;
    while (startingFamily.length < 5)
    {
        potentialPrime += 2;
        if (potentialPrime%3 != 0 && potentialPrime%5 != 0 && 
            bigInt(potentialPrime).isPrime() && CheckConcatenate(potentialPrime, startingFamily))
            {
                startingFamily.push(potentialPrime);
            }
    }
    return startingFamily;
}

function CheckConcatenate(potentialPrime, startingFamily)
{
    for (let prime of startingFamily)
    {
        let prime1 = parseInt(prime.toString() + potentialPrime.toString());
        let prime2 = parseInt(potentialPrime.toString() + prime.toString());
        if (!bigInt(prime1).isPrime() || !bigInt(prime2).isPrime())
        {
            return false;
        }
    }
    return true;
}