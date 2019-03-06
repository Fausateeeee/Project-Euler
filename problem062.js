/*jshint esversion: 6 */
/*

The cube, 41063625 (345^3), can be permuted to produce two other cubes: 56623104 (384^3) and 66430125 (405^3). 
In fact, 41063625 is the smallest cube which has exactly three permutations of its digits which are also cube.

Find the smallest cube for which exactly five permutations of its digits are cube.

*/
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    console.log("The smallest cuve for which there is exactly five permutations is",
    FindCubicPermutation());
    rl.close();
});

function FindCubicPermutation()
{
    let base = 1;
    let dictionary = {};

    while(true)
    {
        current = Math.pow(base, 3);
        length = NumberLength(current);
        unperm = Unpermuate(current);

        if (dictionary.hasOwnProperty(length))
        {
            if (dictionary[length].hasOwnProperty(unperm))
            {
                dictionary[length][unperm].push(current);
                if (dictionary[length][unperm].length == 5)
                {
                    return dictionary[length][unperm][0];
                }
            }
            else
            {
                dictionary[length][unperm] = [current];
            }
        }
        else
        {
            dictionary[length] = {};
            dictionary[length][unperm] = [current];
        }     
        ++base;
    }
}

function Unpermuate(nbr)
{
    return nbr.toString().split("").sort().reduce((a,b) => {return a + b;});
}

function NumberLength(nbr)
{
    return nbr.toString().length;
}