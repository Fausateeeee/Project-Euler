/*jshint esversion: 6 */
/*

A googol (10^100) is a massive number: one followed by one-hundred zeros; 
100^100 is almost unimaginably large: one followed by two-hundred zeros. 
Despite their size, the sum of the digits in each number is only 1.

Considering natural numbers of the form, a^b, where a, b < 100, what is the maximum digital sum?

*/
/*
    I can skip the check where 'a' is a multiple of 10.
*/
const readline = require('readline');
const bigInt = require('big-integer');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    console.log("The maximum digit sum of number of the form a^b where a,b range from 1 to 100 is", loopOnBaseAndPower());
    rl.close();
});

function loopOnBaseAndPower()
{
    let max = 0;
    for (let base = 1; base < 100; base++)
    {
        if (base%10 != 0)
        {
            for (let power = 1; power < 100; power++)
            {
                let digitSum = computeDigitSum(base, power);
                if (max < digitSum)
                {
                    max = digitSum;
                }
            }
        }
    }
    return max;
}
function computeDigitSum(base, power)
{
    let number = (bigInt(base).pow(power)).toArray(10);
    let sum = 0;
    for (let digit of number.value)
    {
        sum += digit;
    }
    return sum;
}