/*jshint esversion: 6 */
/*

Consider the fraction, n/d, where n and d are positive integers. 
If n<d and HCF(n,d)=1, it is called a reduced proper fraction.

If we list the set of reduced proper fractions for d ≤ 8 in ascending order of size, we get:

1/8, 1/7, 1/6, 1/5, 1/4, 2/7, 1/3, 3/8, 2/5, 3/7, 1/2, 4/7, 3/5, 5/8, 2/3, 5/7, 3/4, 4/5, 5/6, 6/7, 7/8

It can be seen that 2/5 is the fraction immediately to the left of 3/7.

By listing the set of reduced proper fractions for d ≤ 1,000,000 in ascending order of size, 
find the numerator of the fraction immediately to the left of 3/7.

*/

const readline = require('readline');
const bigInt = require('big-integer');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('Press enter to continue : ', (answer) => {

    console.log("The numerator of the fraction immediately to the left of 3/7 with an upper bound of 1 000 000 on the denominator is",
    FindMaxInDictionary(MakeDictionary()));
    rl.close();
});

function MakeDictionary()
{
    let dict = [];
    for (let denom = 0; denom <= 1000000; denom++)
    {
        dict[denom] = UpperNumerator(denom);
    }

    return dict;
}

function UpperNumerator(denominator)
{
    for (let i = Math.floor(denominator*0.42); i < denominator; i++)
    {
        if (7*i >= 3*denominator)
        {
            return i - 1;
        }
    }
    return 0;
}

function FindMaxInDictionary(dict)
{
    let maxNum = dict[3];
    let maxDenom = 3;
    for (let i = 4; i < dict.length; i++)
    {
        let previousNum = maxNum * i;
        let nextNum = maxDenom * dict[i];
        if (nextNum > previousNum)
        {
            maxNum = dict[i];
            maxDenom = i;
        }
    }
    return maxNum.toString() + "/" + maxDenom.toString();
}