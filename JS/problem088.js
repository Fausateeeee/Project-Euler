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

*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    console.log("The sum of all the minimal product-sum numbers for 2 ≤ k ≤ 12000 is", 
   CheckProductSum({'1':1, '2':2, '3':1}));
    rl.close();
});

function LoopMinimalProductSum()
{
    let total = {};
    for (let i = 2; i <= 6; i++)
    {
        let result = FindMinimalProductSum(i);
        if( !total[result.product])
        {
            total[result.product] = true;
        }
        console.log(i, result.set);
    }
    return total;
}

function FindMinimalProductSum(number)
{
    let set = {1 : number - 1};
    set[number] = 1;
    let result = CheckProductSum(set);
    while (result.product != result.sum)
    {
        if (result.product < result.sum)
        {
            set[1]--;
            if (!set[2])
            {
                set[2] = 1;
            }
        }
        else
        {

        }
        result = CheckProductSum(set);
    }

    return result.product;
}

function CheckProductSum(set)
{
    let product = 1;
    let sum = 0;
    for(let prop of Object.keys(set))
    {
        product *= (set[prop] * Number.parseInt(prop));
        sum += (set[prop] * Number.parseInt(prop));
    }
    let obj = { product : product, sum : sum};
    return obj;
}