/*jshint esversion: 6 */
/*

The 5-digit number, 16807=7^5, is also a fifth power. Similarly, the 9-digit number, 134217728=8^9, is a ninth power.

How many n-digit positive integers exist which are also an nth power?

*/
const readline = require('readline');
const bigInt = require('big-integer');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// rl.question('Press enter to continue : ', (answer) => {

//     console.log("The lowest sum for a set of five primes for which any two primes concatenate to produce another prime is",
//     NthPower());
//     rl.close();
// });
console.log(NthPower());
rl.close();
function NthPower()
{
    flag = true;
    let exponant = 2;
    let total = 9;
    while (flag)
    {    
        flag = false;
        let base = 2;
        let current = bigInt(base).pow(exponant);
        while(current.toString(10).length < exponant)
        {
            ++base;
            current = bigInt(base).pow(exponant);
        }
        while(base < 10)
        {
            flag = true;
            ++base;
            ++total;
        }
        ++exponant;
    } 

    return total;
}

function NumberOfDigits(number)
{   
    return number.toString().length;
}