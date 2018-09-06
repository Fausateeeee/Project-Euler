/*jshint esversion: 6 */
/*

2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.

What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?

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
        return 0;
    }

    if (parsed < 1) {
        return 0;
    }
    
    let lcmf = 1;
    for (let i = 1; i <= answer; i++)
    {
        lcmf = lcm(lcmf, i);
    }
    
    console.log("The smallest positive number that is evenly divisible by all of the number from 1 to", parsed, " is : ", lcmf);
    rl.close();
});

function lcm(number1, number2)
{
    return number1*number2/gcd(number1,number2);
}

function gcd(number1, number2)
{
    if (number1 < number2)
    {
        return gcd(number2, number1);
    }

    while (number2 > 0)
    {
        let rest = number1%number2;
        number1 = number2;
        number2 = rest;
    }

    return number1;
}