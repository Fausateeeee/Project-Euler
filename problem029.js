/*jshint esversion: 6 */
/*

Consider all integer combinations of a^b for 2 ≤ a ≤ 5 and 2 ≤ b ≤ 5:

    2^2=4, 2^3=8, 2^4=16, 2^5=32
    3^2=9, 3^3=27, 3^4=81, 3^5=243
    4^2=16, 4^3=64, 4^4=256, 4^5=1024
    5^2=25, 5^3=125, 5^4=625, 5^5=3125

If they are then placed in numerical order, with any repeats removed, we get the following sequence of 15 distinct terms:

4, 8, 9, 16, 25, 27, 32, 64, 81, 125, 243, 256, 625, 1024, 3125

How many distinct terms are in the sequence generated by a^b for 2 ≤ a ≤ 100 and 2 ≤ b ≤ 100?

*/


const readline = require('readline');
const bigInt = require("big-integer");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter an natural number greater than 1 : ', (answer) => {

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
        console.log("There are", computePower(parsed).length, "distinct numbers generated for a^b where a,b range from 2 to", parsed);
        rl.close();
    }

});

function computePower(max)
{
    let arr = [];
    for (let a = 2; a <= max; a++)
    {
        for (let b = 2; b <= max; b++)
        {
            let nbr = bigInt(a).pow(b).toString();
            if (arr.indexOf(nbr) == -1)
            {
                arr.push(nbr);
            }
        }
    }
    arr.sort();
    return arr;
}