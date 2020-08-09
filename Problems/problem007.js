/*jshint esversion: 6 */
/*

By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13, we can see that the 6th prime is 13.

What is the 10 001st prime number?

*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter a natural number ', (answer) => {

    const parsed = parseInt(answer);

    if (isNaN(parsed)) {
        console.log("Please, enter a natural number next time <3");
        rl.close();
    }

    if (parsed < 0) {
        console.log("Enter a positive number next time");
        rl.close();
    }

    let primes = getPrimesArray(parsed);

    console.log("The ", parsed, "-th prime is :", primes[primes.length - 1]);
    rl.close();
});

function getPrimesArray(number)
{
    let primes = [2];
    for (let i = 3; primes.length < number; i = i + 2) 
    {
        for (let j = 0; j < primes.length; j++)
        {
            if (i%primes[j] == 0)
            {
                break;
            }
            else if (j == primes.length - 1)
            {
                primes.push(i);
            }
        }
    }

    return primes;
}