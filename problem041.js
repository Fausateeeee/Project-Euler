/*jshint esversion: 6 */
/*

We shall say that an n-digit number is pandigital if it makes use of all the digits 1 to n exactly once. 
For example, 2143 is a 4-digit pandigital and is also prime.

What is the largest n-digit pandigital prime that exists?

*/
/*

*/

const readline = require('readline');
const bigInt = require("big-integer");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter a natural number : ', (answer) => {

    const parsed = parseInt(answer);

    if (isNaN(parsed)) {
        console.log("Please, enter a natural number next time <3");
        rl.close();
    }

    else if (parsed < 1) {
        console.log("Enter a positive number next time");
        rl.close();
    }

    else
    {
        //console.log(2143, 2143%3, 2143%5, isPandigital(2143, 4), bigInt(2143).isPrime());
        for (let i = Math.pow(10,parsed) - 1; i >= 1; i = i - 2)
        {
            //console.log(i);
            if (i%3 != 0 && i%5 != 0 && isPandigital(i, i.toString().length) && bigInt(i).isPrime())
            {
                console.log("The greatest prime that is the closest to 1 to", parsed, 
                "pandigital is", i);
                break;
            }
        }

        rl.close();
    }

});

function isPandigital(number,length)
{
    let nbrs ="x" + number.toString() + "x";

    if (nbrs.indexOf("0") != -1)
    {
        return false;
    }

    for (let i = length + 1; i < 9; i++)
    {
        if (nbrs.indexOf(i.toString()) != -1)
        {
            return false;
        }
    }

    for (let i = 1; i <= length; i++)
    {

        let currentSplit = nbrs.split(i.toString()).length;

        if(currentSplit != 2)
        {
            return false;
        }
    }
    return true;
}