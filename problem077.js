/*jshint esversion: 6 */
/*

It is possible to write ten as the sum of primes in exactly five different ways:

7 + 3
5 + 5
5 + 3 + 2
3 + 3 + 2 + 2
2 + 2 + 2 + 2 + 2

What is the first value which can be written as the sum of primes in over five thousand different ways?

*/

const readline = require('readline');
const bigInt = require('big-integer');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    console.log("The first value which can be written as the sum of primes in over five thousand different ways is", 
    FindFirstCandidate(5000));
    rl.close();
});

function FindFirstCandidate(lowerbound)
{
    
    let i = 10;
    let primes = GeneratePrimeArray(lowerbound);
    while(true)
    {            
        if (sumCount(primes, primes.length, i) > lowerbound)
        {
            return i;
        }
        ++i;
    }
}

function GeneratePrimeArray(upperbound)
{
    let primes = [2,3, 5, 7,11];
    for (let p = 13; primes.length < upperbound; p += 2)
    {
        if (p%3 != 0 && p%5 != 0 && p%7 != 0 && p%11 !=0 && bigInt(p).isPrime())
        {
            primes.push(p);
        }
    }
    return primes;
}

function sumCount(sums, sumIndex, sumTotal)
{
    /*
        We are in this branch if sumTotal == sums[sumIndex], there is one way to solve this problem
    */
    if (sumTotal == 0)
    {
        return 1;
    }

    /*
        If sumTotal is less than 0, than we are in a branch where sums[sumIndex] was greater than the rest to count
    */
    if (sumTotal < 0)
    {
        return 0;
    }

    /*
        If sumIndex is 0 and sumTotal is not 0, we haven't finished counting this branch, so no solution is found here
    */
    if (sumIndex <= 0 && sumTotal >= 1)
    {
        return 0;
    }

    /*
        Count the solution including the sum at index sumIndex - 1 and then 
        count the solution excluding the sum at index sumIndex - 1
    */
    return sumCount(sums, sumIndex - 1, sumTotal) + sumCount(sums, sumIndex, sumTotal - sums[sumIndex - 1]);
}