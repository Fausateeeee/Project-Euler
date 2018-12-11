/*jshint esversion: 6 */
/*

There are exactly ten ways of selecting three from five, 12345:

123, 124, 125, 134, 135, 145, 234, 235, 245, and 345

In combinatorics, we use the notation, 5C3 = 10.

In general,
nCr = n!/(r!(n−r)!),where r ≤ n, n! = n×(n−1)×...×3×2×1, and 0! = 1.

It is not until n = 23, that a value exceeds one-million: 23C10 = 1144066.

How many, not necessarily distinct, values of  nCr, for 1 ≤ n ≤ 100, are greater than one-million?


*/

const readline = require('readline');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter an integer greater or equals to 0: ', (answer) => {

    let parsed = parseInt(answer);

    if (isNaN(parsed)) {
        console.log("Please, enter a natural number next time <3");
        rl.close();
    }

    else if (parsed < 0) {
        console.log("Enter a number greater or equals to 0.");
        rl.close();
    }

    else
    {
        console.log(combinatorics(23,10), combinatorics(23,13));
        console.log("The number of combination that exceeds", parsed, "with n = 100 is", combinatoricsOverBound(parsed));
        rl.close();
    }
});

function combinatoricsOverBound(upperBound)
{
    let count = 0;
    for (let i = 1; i <= 100; i++)
    {
        for (let j = 1; j <= Math.ceil(i/2); j++)
        {

            if (combinatorics(i,j) >= upperBound)
            {
                console.log("i:",i,"j:", j,"comb:", combinatorics(i,j), "count:",i - 2*j +  1);
                count += i - 2*j +  1;
                break;
            }
        }
    }
    return count;
}

function factorial(n)
{
    if (n == 1 || n == 0)
    {
        return 1;
    }

    return n * factorial(n-1);
}


function combinatorics(n,r)
{
    return factorial(n)/(factorial(r)*factorial(n-r));
}