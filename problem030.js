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
        console.log("There are", "NUMBER OF ANSWER", "numbers that can be written as the sum of the", parsed, 
        "power of their digits. Their sum is : ", "ANSWER");
        rl.close();
    }

});