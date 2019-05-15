/*jshint esversion: 6 */
/*

Consider the fraction, n/d, where n and d are positive integers. 
If n<d and HCF(n,d)=1, it is called a reduced proper fraction.

If we list the set of reduced proper fractions for d ≤ 8 in ascending order of size, we get:

1/8, 1/7, 1/6, 1/5, 1/4, 2/7, 1/3, 3/8, 2/5, 3/7, 1/2, 4/7, 3/5, 5/8, 2/3, 5/7, 3/4, 4/5, 5/6, 6/7, 7/8

It can be seen that there are 21 elements in this set.

How many elements would be contained in the set of reduced proper fractions for d ≤ 1,000,000?

*/

/*
    If the donimator is prime, we have d-1 unique fraction
    If the denominator is not prime, we should have the totient of the function unique fraction

*/
const readline = require('readline');
const bigInt = require('big-integer');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('Press enter to continue : ', (answer) => {

    console.log("The numerator of unique reduced fractions with an upper bound of 1 000 000 on the denominator is",
    ComputeUniqueFractions());
    rl.close();
});

function ComputeUniqueFractions()
{
    let upperbound = 1000000;
    let uniqueFractions = 0;
    let primes = GeneratePrimeArray(upperbound);
    for (let i = 2; i <= upperbound; i++)
    {
        if(bigInt(i).isPrime())
        {
            uniqueFractions += i - 1;
        }
        else
        {
            uniqueFractions += EulerTotient(GeneratePrimeFactorisation(i, primes));
        }
    }

    return uniqueFractions;
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