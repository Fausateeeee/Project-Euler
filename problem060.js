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
    GenerateOddPrimeArray(50000));
    rl.close();
});

function FindPrimeFamily(primes)
{
    for (let index1 = 0; index1 < primes.length; ++index1)
    {
        let prime1 = primes[index1];
        for (let index2 = index1 + 1; index2 < primes.length; ++index2)
        {
            let prime2 = primes[index2];
            
            for (let index3 = index2 + 1; index3 < primes.length; ++index3)
            {
                for (let index4 = index3 + 1; index4 < primes.length; ++index4)
                {
                    for (let index5 = index4 + 1; index5 < primes.length; ++index5)
                    {
                        
                    }
                }
            }
        }
    }
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

function GenerateOddPrimeArray(upperbound)
{
    primes = [3,7,11];
    for (let p = 13; p < upperbound; p += 2)
    {
        if (p%3 != 0 && p%5 != 0 && p%7 != 0 && p%11 !=0 && bigInt(p).isPrime())
        {
            primes.push(p);
        }
    }
    return primes;
}