/*jshint esversion: 6 */
/*

The number 145 is well known for the property that the sum of the factorial of its digits is equal to 145:

1! + 4! + 5! = 1 + 24 + 120 = 145

Perhaps less well known is 169, in that it produces the longest chain of numbers that link back to 169; 
it turns out that there are only three such loops that exist:

169 → 363601 → 1454 → 169
871 → 45361 → 871
872 → 45362 → 872

It is not difficult to prove that EVERY starting number will eventually get stuck in a loop. For example,

69 → 363600 → 1454 → 169 → 363601 (→ 1454)
78 → 45360 → 871 → 45361 (→ 871)
540 → 145 (→ 145)

Starting with 69 produces a chain of five non-repeating terms, 
but the longest non-repeating chain with a starting number below one million is sixty terms.

How many chains, with a starting number below one million, contain exactly sixty non-repeating terms

*/

const readline = require('readline');
const bigInt = require('big-integer');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {
    console.log("There are",
    ChainLoop(1000000),
    "chains containing exactly sixty non-repeating terms.");
    rl.close();
});

function ChainLoop(upperbound)
{
    let total = 0;
    for(let i = 3; i< upperbound; ++i)
    {
        if(FindChainLength(i) == 60)
        {
            ++total;
        }
    }

    return total;
}

function FindChainLength(number)
{

    let nombre = number;
    let chain = [];
    do{
        chain.push(nombre);
        arr = nombre.toString().split("");
        nombre=0;
        for(let nbr of arr)
        {
            nombre += Factorial(nbr);
        }
    }
    while(!chain.includes(nombre));

    return chain.length;

}

function Factorial(number)
{
    switch(number)
    {
        case '2':
            return 2;
        case '3':
            return 6;
        case '4':
            return 24;
        case '5':
            return 120;
        case '6':
            return 720;
        case '7':
            return 5040;
        case '8':
            return 40320;
        case '9':
            return 362880;
        default:
            return 1;
    }
}