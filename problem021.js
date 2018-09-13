/*jshint esversion: 6 */
/*

Let d(n) be defined as the sum of proper divisors of n (numbers less than n which divide evenly into n).
If d(a) = b and d(b) = a, where a ≠ b, then a and b are an amicable pair and each of a and b are called amicable numbers.

For example, the proper divisors of 220 are 1, 2, 4, 5, 10, 11, 20, 22, 44, 55 and 110; therefore d(220) = 284. The proper divisors of 284 are 1, 2, 4, 71 and 142; so d(284) = 220.

Evaluate the sum of all the amicable numbers under 10000.

*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter a natural number ', (answer) => {

    let parsed = parseInt(answer);

    if (isNaN(parsed)) {
        console.log("Please, enter a natural number next time <3");
        rl.close();
    }

    if (parsed <= 0) {
        console.log("Enter a number greater to 0 next time");
        rl.close();
    }

    let values = [0];

    for (let i = 1; i <= parsed; i++)
    {
        values.push(reduceFactor(i));
    }

    console.log("The sum of all amicable numbers under", parsed, "is :", findAmicableSum(values));
    rl.close();
});

function reduceFactor(number)
{
    factor = [1];
    for (let i = 2; i < number; i++)
    {
        if (number%i == 0)
        {
            factor.push(i);
        }
    }
    return factor.reduce((a,b)=>{return a+b;});
}

function findAmicableSum(values)
{
    let amicables = [];

    for(let i = 0; i < values.length; i++)
    {
        console.log(values[i], values[values[i] + 1]);
        if(values[i] == values[values[i]] && (i+1) != values[i])
        {
            amicables.push(i+1);
        }
    }
    console.log(amicables);
    if (amicables.length > 0)
    {
        return amicables.reduce((a,b) => {return a+b;});

    }
    return 0;
}