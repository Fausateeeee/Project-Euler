/*jshint esversion: 6 */
/*

A perfect number is a number for which the sum of its proper divisors is exactly equal to the number. 
For example, the sum of the proper divisors of 28 would be 1 + 2 + 4 + 7 + 14 = 28, which means that 28 is a perfect number.

A number n is called deficient if the sum of its proper divisors is less than n and it is called abundant if this sum exceeds n.

As 12 is the smallest abundant number, 1 + 2 + 3 + 4 + 6 = 16, 
the smallest number that can be written as the sum of two abundant numbers is 24. 
By mathematical analysis, it can be shown that all integers greater than 28123 can be written as the sum of two abundant numbers. 
However, this upper limit cannot be reduced any further by analysis even though it is known that the 
greatest number that cannot be expressed as the sum of two abundant numbers is less than this limit.

Find the sum of all the positive integers which cannot be written as the sum of two abundant numbers.

*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


rl.question('Write a natural number ', (answer) => {
    
    let parsed = parseInt(answer);

    if (isNaN(parsed)) {
        console.log("Please, enter a natural number next time <3");
        rl.close();
    }

    if (parsed <= 0) {
        console.log("Enter a number greater than 0 next time");
        rl.close();
    }

    let abundant = getAbundantNumber(parsed);
    let abundantSum = getSumOfEveryTwoAbundant(abundant, parsed);
    
    let nonAbundant = 0;
    for (let i = 1; i <= parsed; i++)
    {
        if (abundantSum.indexOf(i) == -1)
        {
            nonAbundant += i;
        }
    }
    console.log("The sum of positive integers smaller than", parsed, 
    "that cannot be written as the sum of two abundant numbers is :", nonAbundant);
    rl.close();
});

function reduceFactor(number)
{
    factor = [1];
    for (let i = 2; i <= Math.ceil(number/2); i++)
    {
        if (number%i == 0)
        {
            factor.push(i);
        }
    }

    return factor.reduce((a,b) => {return a+b;});
}

function getAbundantNumber(number)
{
    let abundant = [];
    for (let i = 2; i <= number; i++)
    {
        let divisorSum = reduceFactor(i);
        if (divisorSum > i)
        {
            abundant.push(i);
        }
    }

    return abundant;
}

function getSumOfEveryTwoAbundant(abundant)
{
    let abundantSum = [];

    for (let i = 0; i < abundant.length; i++)
    {
        for (let j = i; j < abundant.length; j++)
        {

            abundantSum.push(abundant[i] + abundant[j]);

        }
    }

    return abundantSum;
}