/*jshint esversion: 6 */
/*

Take the number 192 and multiply it by each of 1, 2, and 3:

    192 × 1 = 192
    192 × 2 = 384
    192 × 3 = 576

By concatenating each product we get the 1 to 9 pandigital, 192384576. 
We will call 192384576 the concatenated product of 192 and (1,2,3)

The same can be achieved by starting with 9 and multiplying by 1, 2, 3, 4, and 5, giving the pandigital, 
918273645, which is the concatenated product of 9 and (1,2,3,4,5).

What is the largest 1 to 9 pandigital 9-digit number that can be formed as the concatenated product 
of an integer with (1,2, ... , n) where n > 1?

*/

/*
    The fact that n must be greater than 1 limits the number of possibility we have to check:

    If n is 2, the number can't be greater than 9876 and must be greater than 2500
    If n is 3, the number can't be greater than 321 and it must be greater than 100
    If n is 4, the number can't be greater than 33 and it must be greater than 25
    If n is 5, the number can't be greater than 9 and it must be greater than 2
*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue', (answer) => {

    console.log("The largest 1 to 9 pandigital 9-digit number that can be formed as the concatenated product of an integer is",
    getPandigital());
    rl.close();


});

function getPandigital()
{
    let solution = [];
    for (let nbr = 2500; nbr <= 9876; nbr++)
    {
        if (isPandigital(nbr, nbr*2))
        {
            solution.push([(nbr).toString(), (nbr*2).toString()]);
        }
    }
    for (let nbr = 100; nbr <= 321; nbr++)
    {
        if (isPandigital(nbr, nbr*2, nbr*3))
        {
            solution.push([nbr.toString(), (nbr*2).toString(), (nbr*3).toString()]);
        }
    }
    for (let nbr = 25; nbr <= 33; nbr++)
    {
        if (isPandigital(nbr, nbr*2, nbr*3, nbr*4))
        {
            solution.push([nbr.toString(), (nbr*2).toString(), (nbr*3).toString(), (nbr*4).toString()]);
        }
    }
    for (let nbr = 2; nbr <= 9; nbr++)
    {
        if (isPandigital(nbr, nbr*2, nbr*3, nbr*4, nbr*5))
        {
            solution.push([nbr.toString(), (nbr*2).toString(), (nbr*3).toString(), (nbr*4).toString(), (nbr*5).toString()]);
        }
    }

    return getMaxPandigital(solution);
}

function isPandigital()
{
    let nbrs ="x";
    for (let arg of arguments)
    {
        nbrs += arg;
    }
    nbrs += "x";

    if (nbrs.indexOf("0") != -1)
    {
        return false;
    }
    for (let i = 1; i <= 9; i++)
    {
        let currentSplit = nbrs.split(i.toString()).length;

        if(currentSplit != 2)
        {
            return false;
        }
    }
    return true;
}

function getMaxPandigital(arr)
{
    let max = 0;
    for (let sol of arr)
    {
        let possibleSol = "";
        for (let nbr of sol)
        {
            possibleSol += nbr;
        }

        if (max < parseInt(possibleSol))
        {
            max = parseInt(possibleSol);
        }
    }
    return max;
}