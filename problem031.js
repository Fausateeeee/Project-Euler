/*jshint esversion: 6 */
/*

In England the currency is made up of pound, £, and pence, p, and there are eight coins in general circulation:

    1p, 2p, 5p, 10p, 20p, 50p, £1 (100p) and £2 (200p).

It is possible to make £2 in the following way:

    1×£1 + 1×50p + 2×20p + 1×5p + 1×2p + 3×1p

How many different ways can £2 be made using any number of coins?

*/

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter the number of pence : ', (answer) => {

    const parsed = parseInt(answer);

    if (isNaN(parsed)) {
        console.log("Please, enter a natural number next time <3");
        rl.close();
    }

    else if (parsed < 1) {
        console.log("Enter a number greater than 0 next time");
        rl.close();
    }

    else
    {
        console.log("There are", "ANSWER", "ways to make ", parsed, "pences");
        rl.close();
    }

});

function findDigitsRequired(power)
{
    let q = 2;
    while (nbrOfDigits(q*Math.pow(9,power)) >= q)
    {
        q++;
    }
    return q;
}