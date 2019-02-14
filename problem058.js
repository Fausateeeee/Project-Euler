/*jshint esversion: 6 */
/*

Starting with 1 and spiralling anticlockwise in the following way, a square spiral with side length 7 is formed.

*37 36  35  34  33 32  *31
38  *17 16  15  14 *13 30
39  18  *5  4   *3 12  29
40  19  6   1   2  11  28
41  20  *7  8   9  10  27
42  21  22  23  24 25  26
*43 44  45  46  47 48  49

It is interesting to note that the odd squares lie along the bottom right diagonal,
 but what is more interesting is that 8 out of the 13 numbers lying along both diagonals are prime; 
 that is, a ratio of 8/13 ≈ 62%.

If one complete new layer is wrapped around the spiral above, a square spiral with side length 9 will be formed. 
If this process is continued, what is the side length of the square spiral for which the 
ratio of primes along both diagonals first falls below 10%?

*/

/*

    {1x1} 1 + {3x3}((1 + 2) + (1 + 4) + (1 + 6) + (1 + 8)) + {5x5}((9 + 4) + (9 + 8) + (9 + 12) + (9 + 16)) + 
    {7x7}((25 + 6) + (25 + 12) + (25 + 18) + (25 + 24)) + ...
    
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