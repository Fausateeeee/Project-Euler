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

rl.question('Press enter to continue : ', (answer) => {
    console.log("The lowest sum for a set of five primes for which any two primes concatenate to produce another prime is",
    // ComputeMaximumRatio(1000000)
    //GeneratePrimeArray(1000000)
    GeneratePrimeFactorisation(1000000, GeneratePrimeArray(1000000))
    );
    rl.close();
});
// GeneratePrimeFactorisation(20, GeneratePrimeArray(20));

function ComputeMaximumRatio(upperbound)
{
    let primes = GeneratePrimeArray(upperbound);
    let max = {number : 0, ratio : 0};
    for (let i = 2; i <= upperbound; i++)
    {
        let totient = (EulerTotient(i, primes));
        if (i/totient > max.ratio)
        {
            max.number = i;
            max.ratio = i/totient;
        }
    }
    return max.number;
}

function EulerTotient(number, primes)
{
    if (primes.indexOf(number) != -1)
    {
        return number - 1;
    }
    else
    {
        let totient = {};
        for (let prime of primes)
        {
            while (number%prime == 0)
            {
                if (totient.hasOwnProperty(prime))
                {
                    totient[prime] += 1;
                }
                else
                {
                    totient[prime] = 1;
                }
                number /= prime;
                if (number == 1)
                {
                    return _EulerTotient(totient);
                }
            }

        }
    }
}

function GeneratePrimeArray(upperbound)
{
    let primes = [2, 3, 5, 7, 11];
    for (let i = 13; i <= upperbound; i += 2)
    {
        if (i%3 != 0 && i%5 != 0 && i%7 != 0 && i%11 != 0 && bigInt(i).isPrime())
        {
            primes.push(i);
        }
    }

    return primes;
}

function GeneratePrimeFactorisation(upperbound, primes)
{
    let factorisation = {};
    for (let i = 2; i <= upperbound; ++i)
    {
        if (primes.indexOf(i) != -1)
        {
            factorisation[i] = {};
            factorisation[i][i] = 1;
        }
        else
        {
            let number = i;
            let tempFactorisation = {};
            
            for (let prime of primes)
            {
                while (number%prime === 0)
                {
                    number /= prime;
                    if (tempFactorisation.hasOwnProperty(prime))
                    {
                        tempFactorisation[prime] += 1;
                    }
                    else
                    {
                        tempFactorisation[prime] = 1;
                    }
                }
                
                if (factorisation.hasOwnProperty(number))
                {
                    factorisation[i] = MergeFactor(factorisation[number], tempFactorisation, i);
                    break;
                }
                else if (number == 1)
                {
                    factorisation[i] = tempFactorisation;
                }
            }

        }
    }
    return factorisation;
}

function MergeFactor(factorisation, tempFactorisation, number)
{
    let finalFactorisation = {};
    for (let key of Object.keys(factorisation))
    {
        finalFactorisation[key] = factorisation[key];
    }

    for (let key of Object.keys(tempFactorisation))
    {
        if (finalFactorisation.hasOwnProperty(key))
        {
            finalFactorisation[key] += tempFactorisation[key];
        }
        else
        {
            finalFactorisation[key] = tempFactorisation[key];
        }
    }

    return finalFactorisation;
}