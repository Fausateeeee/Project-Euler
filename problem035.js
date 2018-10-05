/*jshint esversion: 6 */
/*

The number, 197, is called a circular prime because all rotations of the digits: 197, 971, and 719, are themselves prime.

There are thirteen such primes below 100: 2, 3, 5, 7, 11, 13, 17, 31, 37, 71, 73, 79, and 97.

How many circular primes are there below one million?

*/

/*
    1) Check if a number is a prime
    2) If so, check if it isn't already in a list of circular primes
    3) Else, check if each rotations is prime, if so, add them all 
*/

const readline = require('readline');
const bigInt = require("big-integer");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter an natural number : ', (answer) => {

    const parsed = parseInt(answer);

    if (isNaN(parsed)) {
        console.log("Please, enter a natural number next time <3");
        rl.close();
    }

    else if (parsed <= 1) {
        console.log("Enter a number greater than 1 next time");
        rl.close();
    }

    else
    {
        console.log("There are", circularPrimes(parsed).filter((a) => {return a < parsed;}).length, "circular primes below", parsed);
        rl.close();
    }

});

function circularPrimes(upperBound)
{
    if (upperBound == 2)
    {
        return [2];
    }
    else if (upperBound <= 4)
    {
        return [2,3];
    }
    else if (upperBound <= 6)
    {
        return [2,3,5];
    }
    else if (upperBound <= 10)
    {
        return [2,3,5,7];
    }
    else
    {
        let circular = [2,3,5,7];
        for (let i = 11; i < upperBound; i += 2)
        {
            if (i%3 != 0 && i%5 != 0 && i%7 != 0)
            {
                if (bigInt(i).isPrime() && circular.indexOf(i) == -1)
                {
                    let results = isCircular(i);
                    
                    for (let j of results)
                    {
                        circular.push(j);
                    }
                }

            }
        }
        return circular;
    }
}

function isCircular(prime)
{
    let strPrime = prime.toString();
    let primes = [parseInt(prime)];

    for (let i = 0; i < strPrime.length - 1; i++)
    {
        strPrime = strPrime.substring(1) + strPrime.substring(0,1);
        if (bigInt(parseInt(strPrime)).isPrime())
        {
            primes.push(parseInt(strPrime));
        }
    }

    if (primes.length ==strPrime.length)
    {
        let uniquePrimes = primes.filter((a,b) => {return primes.indexOf(a) == b;});
        return uniquePrimes;
    }
    else
    {
        return [];
    }
}