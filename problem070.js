/*jshint esversion: 6 */
/*

Euler's Totient function, φ(n) [sometimes called the phi function], 
is used to determine the number of positive numbers less than or equal to n which are relatively prime to n. 
For example, as 1, 2, 4, 5, 7, and 8, are all less than nine and relatively prime to nine, φ(9)=6.
The number 1 is considered to be relatively prime to every positive number, so φ(1)=1.

Interestingly, φ(87109)=79180, and it can be seen that 87109 is a permutation of 79180.

Find the value of n, 1 < n < 10^7, for which φ(n) is a permutation of n and the ratio n/φ(n) produces a minimum.

*/
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    console.log("The lowest sum for a set of five primes for which any two primes concatenate to produce another prime is",
    "ANSWER");
    rl.close();
});


function ComputeMaximumRatio(upperbound)
{
    let primes = GeneratePrimeArray(upperbound);
    let max = {number : 0, ratio : 0, totient : 999999999999};
    for (let i = upperbound; i >= 2; --i)
    {
        let totient = EulerTotient(GeneratePrimeFactorisation(i, primes));
        if (i/totient > max.ratio)
        {
            max.number = i;
            max.ratio = i/totient;
            max.totient = totient;
        }
        if (totient.max == 2)
        {
            return max.number;
        }
    }
    return max.number;
}

function EulerTotient(factorisation)
{
    let totient = 1;
    for (let key of Object.keys(factorisation))
    {
        let prime = parseInt(key);
        totient *= Math.pow(prime, factorisation[key] - 1)*(prime - 1);
    }
    return totient;
}

function GeneratePrimeArray(upperbound)
{
    let primes = [2, 3, 5, 7, 11];
    for (let i = 13; i <= Math.sqrt(upperbound); i += 2)
    {
        if (i%3 != 0 && i%5 != 0 && i%7 != 0 && i%11 != 0 && bigInt(i).isPrime())
        {
            primes.push(i);
        }
    }

    return primes;
}

function GeneratePrimeFactorisation(number, primes)
{
    let factorisation = {};

    if (primes.indexOf(number) != -1)
    {
        factorisation[number] = 2;
    }
    else
    {    
        for (let prime of primes)
        {
            while (number%prime === 0)
            {
                number /= prime;
                if (factorisation.hasOwnProperty(prime))
                {
                    factorisation[prime] += 1;
                }
                else
                {
                    factorisation[prime] = 1;
                }
            }
            
            if (number === 1)
            {
                break;
            }
        }
    }
    if (number > 1)
    {
        factorisation[number] = 1;
    }

    return factorisation;
}