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

    With a slower solution, I computed the answers for up to 20 for tests purposes:
    2  [ 2, 2 ] = 4
    3  [ 1, 2, 3 ] = 6
    4  [ 1, 1, 2, 4 ] = 8
    5  [ 1, 1, 2, 2, 2 ] = 8
    6  [ 1, 1, 1, 1, 2, 6 ] = 12
    7  [ 1, 1, 1, 1, 1, 3, 4 ] = 14
    8  [ 1, 1, 1, 1, 1, 2, 2, 3 ] = 12
    9  [ 1, 1, 1, 1, 1, 1, 1, 3, 5 ] = 15
    10 [ 1, 1, 1, 1, 1, 1, 1, 1, 4, 4 ] = 16
    11 [ 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 4 ] = 16
    12 [ 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2 ] = 16
    13 [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 3 ] = 18
    14 [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 5 ] = 20
    15 [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 8 ] = 24
    16 [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 6 ] = 24
    17 [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5 ] = 25
    18 [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 4 ] = 24
    19 [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 3 ] = 24
    20 [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 7 ] = 28

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
    let upperbound = 100;
    let factorization = FactorizeNumber(GeneratePrimeArray(2*upperbound), 2*upperbound);
    return GetMinimalProductSum(factorization, upperbound);
}

function GetMinimalProductSum(factorization, upperbound)
{
    let SumProduct = {};
    for (let k = 2; k <= upperbound; ++k)
    {
        let solution = 2*k;

        for (let potentialMinimalSolution = 2*k - 1; potentialMinimalSolution > k; --potentialMinimalSolution)
        {
            factors = factorization[potentialMinimalSolution];
            set = [...factors];

            while(set.length < k)
            {
                set.push(1);
            }
            if (IsSumProduct(set))
            {
                continue;
            }
            else
            {
                SumProduct[k] = potentialMinimalSolution + 1;
                break;
            }

        }
    }

    return SumProduct;
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

//Get every possible way to write a number in a product form
//Example : 8 = 2*2*2 and 8 = 2*4
function GetEveryProductFromFactorization(factorization, upperbound)
{
    for (let k = 2; k <= upperbound; ++k)
    {
        factors = [...factorization[k]];
        for (let index = factors.length - 1; index > 1; --index)
        {
            let fixedElements = factors.length - index;
            
        }
    }
}

function IsSumProduct(set)
{   
    let product = 1;
    let sum = 0;
    for (let nbr of set)
    {
        product *= nbr;
        sum += nbr;
    }

    return (product == sum);
}