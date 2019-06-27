/*jshint esversion: 6 */
/*

    A number chain is created by continuously adding the square of the digits 
    in a number to form a new number until it has been seen before.

    For example,

    44 → 32 → 13 → 10 → 1 → 1

    85 → 89 → 145 → 42 → 20 → 4 → 16 → 37 → 58 → 89

    Therefore any chain that arrives at 1 or 89 will become stuck in an endless loop. 
    What is most amazing is that EVERY starting number will eventually arrive at 1 or 89.

    How many starting numbers below ten million will arrive at 89?

*/

const readline = require('readline');

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// rl.question('Press enter to continue : ', (answer) => {

//     console.log("There are", LoopChain(), "starting numbers below ten million that will arrive at 89.");
//     rl.close();
// });

ComputeChain(136);

function LoopChain()
{
    let total = 0;
    for(let i = 1; i < 10000000; ++i)
    {

        console.log(i);

        if(ComputeChain(i))
        {
            ++total;
        }
    }

    return total;
}

function ComputeChain(number)
{
    let nbr = number.toString();
    while ((nbr != "1") && (nbr != "89"))
    {
        if(nbr.length == 1)
        {
            nbr = nbr.padStart(2,"0");
        }
        nbr = nbr.split("").reduce((a,b) => {return Math.pow(Number.parseInt(a),2) + Math.pow(Number.parseInt(b),2);}).toString();
    }
    return nbr == "89";
}