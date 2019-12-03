/*jshint esversion: 6 */
/*

It was proposed by Christian Goldbach that every odd composite number can be written as the sum of a prime and twice a square.

9 = 7 + 2×1^2
15 = 7 + 2×2^2
21 = 3 + 2×3^2
25 = 7 + 2×3^2
27 = 19 + 2×2^2
33 = 31 + 2×1^2

It turns out that the conjecture was false.

What is the smallest odd composite that cannot be written as the sum of a prime and twice a square?

*/

const readline = require('readline');
const bigInt = require("big-integer");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {


    let current = 9;
    while(true)
    {
        if(!bigInt(current).isPrime())
        {
            let flag= true;
            for (let i = 1; current - 2*Math.pow(i,2) >= 3; i++)
            {
                if (bigInt(current - 2*Math.pow(i,2)).isPrime())
                {
                    flag = false;
                    break;
                }
            }
            if (flag)
            {
                break;
            }
        }

        current += 2;
    }
    console.log("The smallest odd composite that cannot be written as the sum of a prime and twice a square is", current);
    rl.close();


});
