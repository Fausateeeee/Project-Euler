/*jshint esversion: 6 */
/*

    A natural number, N, that can be written as the sum and product of a given set of 
    at least two natural numbers, {a_1, a_2, ... , a_k} is called a product-sum number: 
    N = a_1 + a_2 + ... + a_k = a_1 × a_2 × ... × a_k.

    For example, 6 = 1 + 2 + 3 = 1 × 2 × 3.

    For a given set of size, k, we shall call the smallest N with this property a minimal product-sum number. 
    The minimal product-sum numbers for sets of size, k = 2, 3, 4, 5, and 6 are as follows.

    k=2: 4 = 2 × 2 = 2 + 2
    k=3: 6 = 1 × 2 × 3 = 1 + 2 + 3
    k=4: 8 = 1 × 1 × 2 × 4 = 1 + 1 + 2 + 4
    k=5: 8 = 1 × 1 × 2 × 2 × 2 = 1 + 1 + 2 + 2 + 2
    k=6: 12 = 1 × 1 × 1 × 1 × 2 × 6 = 1 + 1 + 1 + 1 + 2 + 6

    Hence for 2≤k≤6, the sum of all the minimal product-sum numbers is 4+6+8+12 = 30; note that 8 is only counted once in the sum.

    In fact, as the complete set of minimal product-sum numbers for 2≤k≤12 is {4, 6, 8, 12, 15, 16}, the sum is 61.

    What is the sum of all the minimal product-sum numbers for 2≤k≤12000?

*/

/*

    It is obvious that the minimal bound of a set of size k is k since the minimal addition is k*1.
    I need to find an upper bound and I suppose this is given by the multiplication side.

    The upperbound is always 2k since we can use the set {k, 2, 1, ..., 1}.
    On the multiplication side, we will have 2*k*1*...*1 = 2k.
    On the addition side, we will have k + 2 + (k-2)*1 = 2k.

    So the minimal product-sum number N is always k <= N <= 2k. (It is probably k < N <= 2k in reality.)

    I should factorize each number up to 24000 and find every way to write it.
    Per example, 12 = 2 * 2 * 3 = 4 * 3 = 2 * 6.

*/

const readline = require('readline');
const bigInt = require('big-integer')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    console.log("The sum of all the minimal product-sum numbers for 2 ≤ k ≤ 12000 is", 
        LoopMinimalProductSum());
    rl.close();
});


function LoopMinimalProductSum()
{
    let upperbound = 12000;
    let factorization = FactorizeNumber(GeneratePrimeArray(upperbound), upperbound);
    return factorization.max;
}

function GeneratePrimeArray(upperbound)
{
    let primes = [2,3, 5, 7,11];
    for (let p = 13; primes.length <= upperbound; p += 2)
    {
        if (p%3 != 0 && p%5 != 0 && p%7 != 0 && p%11 !=0 && bigInt(p).isPrime())
        {
            primes.push(p);
        }
    }
    return primes;
}

function FactorizeNumber(primes, upperbound)
{
    let obj = {};
    for (let i = 2; i <= upperbound; ++i)
    {
        if (primes.includes(i))
        {
            obj[i] = [i];
        }
        else
        {
            let reminder = i;
            let factorization = [];
            for (let prime of primes)
            {
                while (reminder%prime == 0)
                {
                    reminder /= prime;
                    factorization.push(prime);
                }
                if (reminder == 1)
                {
                    obj[i] = factorization;
                    break;
                }
            }
        }
    }
    return obj;
}
