/*jshint esversion: 6 */
/*

The Fibonacci sequence is defined by the recurrence relation:

    Fn = Fn−1 + Fn−2, where F1 = 1 and F2 = 1.

Hence the first 12 terms will be:

    F1 = 1
    F2 = 1
    F3 = 2
    F4 = 3
    F5 = 5
    F6 = 8
    F7 = 13
    F8 = 21
    F9 = 34
    F10 = 55
    F11 = 89
    F12 = 144

The 12th term, F12, is the first term to contain three digits.

What is the index of the first term in the Fibonacci sequence to contain 1000 digits?

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

    if (parsed == 1)
    {
        console.log("The first Fibonacci number to contain", parsed, " digits is : 1");
        rl.close();
    }

    let BigArray = [bigInt(1), bigInt(1)];
    while (BigArray[BigArray.length - 1].toString(10).length < parsed)
    {
        let i = BigArray.length - 1;
        BigArray.push(BigArray[i - 1].add(BigArray[i]));
    }

    console.log("The index of first Fibonacci number to contain", parsed, " digits is :", BigArray.length);
    rl.close();
});

function Fibonacci(F1, F2, length)
{
    let F3 = F1 + F2;
    console.log(F3);
    if(F3.toString().length < length)
    {
        return Fibonacci(F2, F3, length);
    }
    else
    {
        return F3;
    }
}