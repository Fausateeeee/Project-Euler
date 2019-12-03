/*jshint esversion: 6 */
/*

145 is a curious number, as 1! + 4! + 5! = 1 + 24 + 120 = 145.

Find the sum of all numbers which are equal to the sum of the factorial of their digits.

Note: as 1! = 1 and 2! = 2 are not sums they are not included.

*/

/*
    A simble upper bound is that 9!*7 = 2540160, so a number can't equal the sum of their factorial over that
*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    const factorial = { "0" : 1, "1" : 1, "2" : 2, "3" : 6, "4" : 24, "5" :120,
                        "6" : 720, "7" : 5040, "8" : 40320, "9" : 362880};
    let sol = 0;
    for (let i = 10; i < 2540160; i++)
    {
        let num = i.toString().split("");
        let sum = 0;
        for (let j of num)
        {
            sum += factorial[j];
        }
        if (sum == i)
        {
            sol += i;
        }
    }
    console.log("The sum of all numbers which are equal to the sum of the factorial of their digits is :", sol);
    rl.close();

});

