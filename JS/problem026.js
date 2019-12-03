/*jshint esversion: 6 */
/*

A unit fraction contains 1 in the numerator. The decimal representation of the unit fractions with denominators 2 to 10 are given:

    1/2	= 	0.5
    1/3	= 	0.(3)
    1/4	= 	0.25
    1/5	= 	0.2
    1/6	= 	0.1(6)
    1/7	= 	0.(142857)
    1/8	= 	0.125
    1/9	= 	0.(1)
    1/10	= 	0.1 

Where 0.1(6) means 0.166666..., and has a 1-digit recurring cycle. It can be seen that 1/7 has a 6-digit recurring cycle.

Find the value of d < 1000 for which 1/d contains the longest recurring cycle in its decimal fraction part.


*/

/*
    I know that if the denominator has a prime factorisation of the form (2^n)(5^m), it has a finite cycle. 
    From group theory, we try to compute the length of a cycle, or more so the order of the cyclic group.
*/
const readline = require('readline');
const bigInt = require("big-integer");

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

    let findCycle = {};
    let max = 1;
    for (let i = 1; i < answer; ++i)
    {
        findCycle[i] = findCycleLength(i);
        if (findCycle[i] > findCycle[max])
        {
            max = i;
        }
    }

    //console.log(findCycleLength(17));
    console.log(findCycle);
    console.log("The fraction where the denominator is smaller than", parsed, " that has the longuest recurring cycle is :", max);
    rl.close();
});

function findCycleLength(denominator)
{
    if (hasNoCycle(denominator) || denominator == 1)
    {   
        return 0; //No cycle
    }

    else
    {
        let i = 1;
        while(true)
        {

            for (let j = i - 1; j >= 0; j--)
            {
                if (bigInt(10).pow(i).minus(bigInt(10).pow(j)).mod(denominator) == 0)
                {
                    return i - j;
                }
            }
            i++;

        }
    }
}

function hasNoCycle(number)
{
    let temp = number;
    while (temp%2 == 0)
    {
        temp /= 2;
    }
    while (temp%5 == 0)
    {
        temp /= 5;
    }
    
    if (temp == 1)
    {
        return true;
    }
    return false;
}