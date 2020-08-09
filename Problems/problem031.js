/*jshint esversion: 6 */
/*

In England the currency is made up of pound, £, and pence, p, and there are eight coins in general circulation:

    1p, 2p, 5p, 10p, 20p, 50p, £1 (100p) and £2 (200p).

It is possible to make £2 in the following way:

    1×£1 + 1×50p + 2×20p + 1×5p + 1×2p + 3×1p

How many different ways can £2 be made using any number of coins?

*/

/*
    Remarks: There is the same number of permutation for 10p and 11p, maybe this is true if the number is congruent 0 or 1 mod 10
    I should read on dynamic programming to solve this problem
*/

/*
    I need to solve the base cases
    case sol[1] = 1, sol[2] = 2, sol[5] = 4, etc... do I overcomplicate the problem here?
*/
const readline = require('readline');

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
        let coins = [1,2,5,10,20,50,100,200];
        console.log("There are", coinCount(coins, coins.length, parsed), "ways to make ", parsed, "pences");
        rl.close();
    }



});

/*
    This function separate the problem into two parts

    First, we solve the problem
*/
function coinCount(coins, coinIndex, coinTotal)
{
    /*
        We are in this branch if coinTotal == coins[coinIndex], there is one way to solve this problem
    */
    if (coinTotal == 0)
    {
        return 1;
    }

    /*
        If coinTotal is less than 0, than we are in a branch where coins[coinIndex] was greater than the rest to count
    */
    if (coinTotal < 0)
    {
        return 0;
    }

    /*
        If coinIndex is 0 and coinTotal is not 0, we haven't finished counting this branch, so no solution is found here
    */
    if (coinIndex <= 0 && coinTotal >= 1)
    {
        return 0;
    }

    /*
        Count the solution including the coin at index coinIndex - 1 and then 
        count the solution excluding the coin at index coinIndex - 1
    */
    return coinCount(coins, coinIndex - 1, coinTotal) + coinCount(coins, coinIndex, coinTotal - coins[coinIndex - 1]);
}