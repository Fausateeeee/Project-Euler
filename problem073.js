/*jshint esversion: 6 */
/*

Consider the fraction, n/d, where n and d are positive integers. If n<d and HCF(n,d)=1, it is called a reduced proper fraction.

If we list the set of reduced proper fractions for d ≤ 8 in ascending order of size, we get:

1/8, 1/7, 1/6, 1/5, 1/4, 2/7, 1/3, 3/8, 2/5, 3/7, 1/2, 4/7, 3/5, 5/8, 2/3, 5/7, 3/4, 4/5, 5/6, 6/7, 7/8

It can be seen that there are 3 fractions between 1/3 and 1/2.

How many fractions lie between 1/3 and 1/2 in the sorted set of reduced proper fractions for d ≤ 12,000?

*/
const readline = require('readline');
const bigInt = require('big-integer');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('Press enter to continue : ', (answer) => {

    console.log("The numerator of reduced fractions between 1/3 and 1/2 with an upper bound on the denominator of 12 000 is",
    NumberOfReducedFractionsInARange(12000));
    rl.close();
});

function NumberOfReducedFractionsInARange(upperbound)
{
    let total = 0;
    for (let i = 5; i <= upperbound; i++)
    {
        total += GetBoundaries(i);
    }

    return total;
}
function GetBoundaries(denom)
{
    let NumMin = 0;
    let NumMax = 0;
    let i = Math.floor(0.3*denom);
    while (3*i <= denom)
    {
        ++i;
    }

    NumMin = i;

    while (2*i < denom)
    {
        ++i;
    }

    NumMax = i;

    if (bigInt(denom).isPrime())
    {
        //console.log("Case prime : ", denom, NumMax, NumMin, "Total added :", NumMax - NumMin);
        return NumMax - NumMin;
    }
    else
    {
        
        let nbrOfFraction = 0;
        for (let num = NumMin; num < NumMax; ++num)
        {
            if(CheckCoprimality(num,denom))
            {
                nbrOfFraction++;
            }
        }
        //console.log("Case not prime : ", denom, NumMax, NumMin, "Total added :", nbrOfFraction);
        return nbrOfFraction;
    }
}

function CheckCoprimality(num1, num2)
{
    let a = num1;
    let b = num2;
    return gcd(a, b) == 1;
}

function gcd(a, b)
{
    if (a == 0 || b == 0)
    {
        return 0;
    }

    if (a == b)
    {
        return a;
    }

    if (a > b)
    {
        return gcd(a - b, b);
    }

    return gcd(a, b - a);
}