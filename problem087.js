/*jshint esversion: 6 */
/*

    The smallest number expressible as the sum of a prime square, prime cube, and prime fourth power is 28.
    In fact, there are exactly four numbers below fifty that can be expressed in such a way:

    28 = 2^2 + 2^3 + 2^4

    33 = 3^2 + 2^3 + 2^4

    49 = 5^2 + 2^3 + 2^4

    47 = 2^2 + 3^3 + 2^4

    How many numbers below fifty million can be expressed as the sum of a prime square, prime cube, and prime fourth power?

*/

const readline = require('readline');
const bigInt = require('big-integer');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    console.log("There are",LoopThroughPrimes(50000000),
    "numbers below fifty million that can be expressed as the sum of a prime square, prime cube, and prime fourth power.");
    rl.close();
});

function LoopThroughPrimes(upperbound)
{
    let SquareCubeFourth = {};

    let primes = GeneratePrimeArray(upperbound);
    let total = 0;
    for (let i = 0; i < primes.length - 1; ++i)
    {
        for (let j = 0; j < primes .length - 1; ++j)
        {
            for (let k = 0; k < primes.length - 1; ++k)
            {
                let num = Math.pow(primes[i],2) + Math.pow(primes[j],3) + Math.pow(primes[k],4);
                if (num > upperbound)
                {
                    break;
                }
                if (!SquareCubeFourth[num])
                {
                    SquareCubeFourth[num] = true;
                    ++total;
                }
            }
        }
    }

    return total;
}

function GeneratePrimeArray(upperbound)
{
    let primes = [2, 3, 5, 7, 11];
    let i = 13;
    for (; i <= Math.sqrt(upperbound); i += 2)
    {
        if (i%3 != 0 && i%5 != 0 && i%7 != 0 && i%11 != 0 && bigInt(i).isPrime())
        {
            primes.push(i);
        }
    }
    do
    {
        i +=2;
    }
    while(!bigInt(i).isPrime());

    primes.push(i);
    return primes;
}