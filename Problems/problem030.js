/*jshint esversion: 6 */
/*

Surprisingly there are only three numbers that can be written as the sum of fourth powers of their digits:

    1634 = 1^4 + 6^4 + 3^4 + 4^4
    8208 = 8^4 + 2^4 + 0^4 + 8^4
    9474 = 9^4 + 4^4 + 7^4 + 4^4

As 1 = 1^4 is not a sum it is not included.

The sum of these numbers is 1634 + 8208 + 9474 = 19316.

Find the sum of all the numbers that can be written as the sum of fifth powers of their digits.

*/

/*
    Ok, i can set a upper bound  when I test the numbers. Suppose I want to compute to the n-th power. 
    Then I need to compute 9^n. After that, I check for which integer q and digit() which return the number of digit
    the following equation is true:

    digit(q*9^n) = q;

    This means that for a number with q digits, 
    https://math.stackexchange.com/questions/136168/number-equal-to-the-sum-of-powers-of-its-digits
*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter an natural number : ', (answer) => {

    const parsed = parseInt(answer);

    if (isNaN(parsed)) {
        console.log("Please, enter a natural number next time <3");
        rl.close();
    }

    else if (parsed <= 1) {
        console.log("Enter a number greater than 1 next time");
        rl.close();
    }

    else
    {
        let answers = computePowerOfDigits(findDigitsRequired(parsed), parsed);
        console.log("There are", answers.length , "numbers that can be written as the sum of the", parsed, 
        "power of their digits. Their sum is : ", answers.reduce((a,b) => {return a+b;}));
        rl.close();
    }

});

function findDigitsRequired(power)
{
    let q = 2;
    while (nbrOfDigits(q*Math.pow(9,power)) >= q)
    {
        q++;
    }
    return q;
}

function nbrOfDigits(nbr)
{
    return (nbr < 10 ? 1 :   
        (nbr < 100 ? 2 :   
        (nbr < 1000 ? 3 :   
        (nbr < 10000 ? 4 :   
        (nbr < 100000 ? 5 :   
        (nbr < 1000000 ? 6 :   
        (nbr < 10000000 ? 7 :  
        (nbr < 100000000 ? 8 :  
        (nbr < 1000000000 ? 9 :  
        10)))))))));  
}

function computePowerOfDigits(max, power)
{
    let answers = [];
    for (let i = 11; i < max*Math.pow(9,power); i++)
    {
        let arr = splitDigits(i);
        let num = 0;
        for (let j = 0; j < arr.length; j++)
        {
            num += Math.pow(arr[j],power);
        }
        if (num == i)
        {
            answers.push(i);
        }
    }
    return answers;
}

function splitDigits(number)
{
    let str = number.toString();
    let arr = str.split("");
    for (let i = 0; i < arr.length; i++)
    {
        arr[i] = parseInt(arr[i]);
    }
    return arr;
}