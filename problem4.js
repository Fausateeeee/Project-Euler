/*jshint esversion: 6 */
/*

A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.

Find the largest palindrome made from the product of two 3-digit numbers.

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

    const inf = Math.pow(10, parsed - 1); //parsed = 1 => inf = 1, parsed = 2 => inf = 10, etc...
    const sup = Math.pow(10, parsed); //parsed = 1 => sup = 10, parsed = 2 => sup = 100, etc...

    let maxPal = 0;

    for (let i = inf; i < sup; i++)
    {
        for (let j = i; j < sup; j++)
        {
            if (isPalindrome(i*j) && i*j > maxPal)
            {
                maxPal = i*j;
            }
        }
    }
    console.log("The largest palindrome made from the product of a", parsed, "-digit number is : ", maxPal);
    rl.close();
});

function isPalindrome(number)
{
    let arr = String(number).split("");

    let j = arr.length - 1;

    for (let i = 0; i < j; i++, j--)
    {
        if (arr[i] != arr[j])
        {
            return false;
        }
    }
    return true;
}