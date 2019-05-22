/*jshint esversion: 6 */
/*

Let p(n) represent the number of different ways in which n coins can be separated into piles. 
For example, five coins can be separated into piles in exactly seven different ways, so p(5)=7.

OOOOO 
OOOO   O
OOO   OO
OOO   O   O
OO   OO   O
OO   O   O   O
O   O   O   O   O

Find the least value of n for which p(n) is divisible by one million.

*/

/*
    Try to count every case

    Case 4 coins (5)

    OOOO                + new case (1)
    OOO  O              + number of case for 3 coins (3)
    OO  OO              + number of case for 2 coins (2)
    OO  O   O           - number of case common to 2 and 3 coins
    O   O   O   O

    Case 5 coins (7)

    OOOOO               + new case (1)
    OOOO   O            + number of case for 4 coins (5)
    OOO   OO            + number of case for 3 coins (3) 
    OOO   O   O         - case when there are pile with 1 coin left (1)
    OO   OO   O
    OO   O   O   O
    O   O   O   O   O

    Case 6 coins (11)

    OOOOOO             + new case (1)     
    OOOOO   O          + number of case for 5 coins (7)
    OOOO   OO          + number of case for 4 coins (5) 
    OOOO   O   O
    OOO   OOO
    OOO   OO   O
    OOO   O    O    O
    OO  OO  OO
    OO  OO  O   O
    OO  O   O   O   O   
    O   O   O   O   O

1 1
2 2
3 3
4 5
5 7
6 11
7 15
8 22
9 30
10 42
11 56
12 77
13 101
14 135
15 176
16 231
17 297
18 385
19 490
*/

const readline = require('readline');
const bigInt = require('big-integer');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    console.log("The first number of coins that can be seperated in a number of different piles divisible by one million is", 
    findPile());
    rl.close();
});

findPile();

function findPile()
{
    let coins = [1];
    let totalPile = 1;
    let lastCoin = 1;

    while (true)
    {
        totalPile = pileCount(coins, lastCoin);
        if (totalPile)
        {
            return lastCoin;
        }
        //console.log(lastCoin, totalPile);
        if (lastCoin%100==0)
        {
            console.log(lastCoin);
        }
        coins.push(++lastCoin);
    }
}


function pileCount(coins, coinTotal)
{
    let memoization = [bigInt(1)];
    for (let k = 1; k <= coinTotal; k++)
    {
        memoization[k] = bigInt(0);
    }

    for (let i = 0; i < coins.length; ++i)
    {
        for (let j = coins[i]; j <= coinTotal; ++j)
        {
            memoization[j] = memoization[j].plus(memoization[j - coins[i]]);
        }
    }
    
    return memoization[coinTotal].isDivisibleBy(1000000);
}