/*jshint esversion: 6 */
/*

We shall say that an n-digit number is pandigital if it makes use of all the digits 1 to n exactly once; for example, 
the 5-digit number, 15234, is 1 through 5 pandigital.

The product 7254 is unusual, as the identity, 39 × 186 = 7254, containing multiplicand, multiplier, and product is 1 through 9 pandigital.

Find the sum of all products whose multiplicand/multiplier/product identity can be written as a 1 through 9 pandigital.
HINT: Some products can be obtained in more than one way so be sure to only include it once in your sum.

*/

/*
    A thing that must stay true is that the number of each digit must add to 9, so if D(n) outputs the number of digits of n
    and nm = p is pandigital, then D(n) + D(m) + D(p) = 9

    Case D(n) = 1 => D(m) = 4
    If D(n) = 1, then D(m) must be greater than 3 since it is impossible  to get a 5 digits product
    Moreover, D(m) must be smaller than 5 since the product will have ar lest 5 number and the sum will be greater than 9
    Also, n can't be 1.

    Case D(n) = 2 => D(m) = 3
    If D(n) = 2, then D(m) must be greater than 2 or the digit sum will be smaller than 9
    Also, D(m) must be smaller than 4 or else the digit sum will be greater than 9

    If D(n) = 3 or 4, we are in the previous cases
    If greater, impossible
*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {
    console.log("The sum of the product of 1 throught 9 pandigital multiplicand, multiplier and product is", pandigital());
    rl.close();

});

function pandigital()
{
    let panNbr = [];
    for (let i = 2; i < 10; i++)
    {
        for (let j = 1234; j <= 9876 && i*j < 100000; j++)
        {
            if (isPandigital(i,j))
            {
                if (panNbr.indexOf(i*j) == -1)
                {
                    panNbr.push(i*j);
                }
            }
        }
    }

    for (let i = 12; i <= 98; i++)
    {
        for (let j = 123; j <= 987 && i*j < 10000; j++)
        {
            if (isPandigital(i,j))
            {
                if (panNbr.indexOf(i*j) == -1)
                {
                    panNbr.push(i*j);
                }
            }
        }
    }

    return panNbr.reduce((a,b) => {return a + b;});
}

function isPandigital(a,b)
{
    let nbrs ="x"+  a.toString() + b.toString() + (a*b).toString() + "x";
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