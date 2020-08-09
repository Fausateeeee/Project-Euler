/*jshint esversion: 6 */
/*

The prime factors of 13195 are 5, 7, 13 and 29.

What is the largest prime factor of the number 600851475143 ?

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

    if (parsed < 2) {
        console.log("Enter a number greater than 1 next time");
        rl.close();
    }
  
    let Primes = getPrimesArray(parsed/2);

    lpf = -1;
    for (i = Primes.length - 1; i >=0; i--)
    {
        if (parsed % Primes[i] == 0)
        {
            lpf = Primes[i];
            break;
        }
    }

    if (lpf == -1)
    {
        lpf = parsed;
    }

    console.log("The largest prime factor of ", parsed, " is :", lpf);
    rl.close();
});

function getPrimesArray(number)
{
    let primes = [2];
    for (let i = 3; i <= number; i = i + 2) 
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