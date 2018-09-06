/*jshint esversion: 6 */
/*

The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.

Find the sum of all the primes below two million.

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

    if (parsed < 1) {
        console.log("Enter a number greater than 0 next time");
        rl.close();
    }
    
    let primes = getPrimesArray(parsed);

    console.log("The sum of all primes bellow ", parsed, " is :", primes.reduce((accumulator, currentValue) => accumulator + currentValue));
    rl.close();
});

function getPrimesArray(number)
{
    let primes = [2];
    for (let i = 3; i < number; i = i + 2) 
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