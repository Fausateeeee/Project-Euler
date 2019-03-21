/*jshint esversion: 6 */
/*

Euler's Totient function, φ(n) [sometimes called the phi function], 
is used to determine the number of numbers less than n which are relatively prime to n. 
For example, as 1, 2, 4, 5, 7, and 8, are all less than nine and relatively prime to nine, φ(9)=6.

n 	Relatively Prime 	φ(n) 	n/φ(n)
2 	1 	                1 	    2
3 	1,2 	            2 	    1.5
4 	1,3 	            2 	    2
5 	1,2,3,4 	        4 	    1.25
6 	1,5 	            2 	    3
7 	1,2,3,4,5,6 	    6 	    1.1666...
8 	1,3,5,7 	        4 	    2
9 	1,2,4,5,7,8 	    6 	    1.5
10 	1,3,7,9 	        4 	    2.5

It can be seen that n=6 produces a maximum n/φ(n) for n ≤ 10.

Find the value of n ≤ 1,000,000 for which n/φ(n) is a maximum.

*/
const readline = require('readline');
const bigInt = require('big-integer');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
//ComputeMaximumRatio(1000000);
rl.question('Press enter to continue : ', (answer) => {

    console.log("The number that produces the maximum ratio with its totient is",
    ComputeMaximumRatio(1000000)
    );
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