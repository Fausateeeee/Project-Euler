/*jshint esversion: 6 */
/*

Euler discovered the remarkable quadratic formula:

n^2 + n + 41

It turns out that the formula will produce 40 primes for the consecutive integer values 0 ≤ n ≤ 39. 
However, when n=40, 40^2 + 40 + 41 = 40(40 + 1) + 41 is divisible by 41, and certainly when n = 41, 41^2 + 41 + 41
is clearly divisible by 41.

The incredible formula n^2 − 79n + 1601 was discovered, 
which produces 80 primes for the consecutive values 0 ≤ n ≤ 79. 

The product of the coefficients, −79 and 1601, is −126479.

Considering quadratics of the form:

    n^2 + an + b, where |a| < 1000 and |b| ≤ 1000

where |n| is the modulus/absolute value of n
e.g. |11|=11 and |−4|=4

Find the product of the coefficients, a
and b, for the quadratic expression that produces the maximum number of primes for consecutive values of n, starting with n=0.

*/

const readline = require('readline');
const bigInt = require("big-integer");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter a natural number ', (answer) => {

    const parsed = parseInt(answer);

    if (isNaN(parsed)) {
        console.log("Please, enter a natural number next time <3");
        rl.close();
    }

    if (parsed < 1) {
        console.log("Enter a number greater than 0 next time");
        rl.close();
    }

    let max = {a: undefined, b: undefined, sequence: 0};
    
    
    for (let a = (-1 * answer) + 1 ; a < answer; a++)
    {
        for (let b = -1 * answer; b <= answer; b++)
        {
            if(bigInt(b).isPrime)
            {           
                let primeLength = 0;
                let n = 0;
                while(polynomial(a,b,n).isPrime())
                {
                    n++;
                    primeLength++;
                } 
                
                if (max.sequence < primeLength)
                {
                    max.a = a;
                    max.b = b;
                    max.sequence = primeLength;
                }
            }
        }

    }

    console.log("The two coefficient that produce the most primes are", max.a, "and", max.b, "and their product is :", max.a*max.b);
    rl.close();
});

function polynomial(a, b, n)
{
    return ((bigInt(n).pow(2)).add(bigInt(a*n))).add(bigInt(b));
}