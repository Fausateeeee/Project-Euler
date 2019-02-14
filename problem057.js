/*jshint esversion: 6 */
/*

It is possible to show that the square root of two can be expressed as an infinite continued fraction.

√ 2 = 1 + 1/(2 + 1/(2 + 1/(2 + ... ))) = 1.414213...

By expanding this for the first four iterations, we get:

1 + 1/2 = 3/2 = 1.5
1 + 1/(2 + 1/2) = 7/5 = 1.4
1 + 1/(2 + 1/(2 + 1/2)) = 17/12 = 1.41666...
1 + 1/(2 + 1/(2 + 1/(2 + 1/2))) = 41/29 = 1.41379...

The next three expansions are 99/70, 239/169, and 577/408, but the eighth expansion, 1393/985, 
is the first example where the number of digits in the numerator exceeds the number of digits in the denominator.

In the first one-thousand expansions, how many fractions contain a numerator with more digits than denominator?

*/

/*

From the wiki on continued fraction, , there is an algorithm to compute a continued fraction, we will implement it

*/
const readline = require('readline');
const bigInt = require('big-integer');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter the number of expansions you want to compute : ', (answer) => {
    const parsed = parseInt(answer);

    if (isNaN(parsed)) {
        console.log("Please, enter a natural number next time <3");
        rl.close();
    }

    else if (parsed < 1) {
        console.log("Enter a number greater or equal than 1 next time");
        rl.close();
    }

    else
    {
    
    let numerator = [bigInt(0),bigInt(1),bigInt(1)];
    let denominator = [bigInt(1),bigInt(0),bigInt(1)];
    let total = 0;
    ComputeFraction(numerator, denominator, answer);
    for (let i = 3; i < numerator.length; i++)
    {
        if (NumberOfDigits(numerator[i]) > NumberOfDigits(denominator[i]))
        {
            ++total;
        }
    }

    console.log("The number of times the numerator has more digits than the denominator is", 
    total);
    rl.close();
    }
});

function ComputeFraction(numerator, denominator, upperBound)
{
    ZeroIndex = numerator.length - 2;
    numerator.push(numerator[ZeroIndex + 1].times(2).plus(numerator[ZeroIndex]));
    denominator.push(denominator[ZeroIndex + 1].times(2).plus(denominator[ZeroIndex]));

    if(ZeroIndex < upperBound)
    {
        ComputeFraction(numerator, denominator, upperBound);
    }
}

function NumberOfDigits(number)
{   
    return number.toString().length;
}