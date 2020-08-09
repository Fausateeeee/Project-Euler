/*jshint esversion: 6 */
/*

A Pythagorean triplet is a set of three natural numbers, a < b < c, for which,
a^2 + b^2 = c^2

For example, 3^2 + 4^2 = 9 + 16 = 25 = 5^2.

There exists exactly one Pythagorean triplet for which a + b + c = 1000.
Find the product abc.

*/


/*

    Using Euclid's formula, we have the fact that for m > n > 0 and m != n, a = m^2 - n^2, b = 2mn and c = m^2 + n^2.
    For any integer m and n respecting that condition, we will get a Pythaforean triple.
    Using the fact that we know a + b + c = K, we get the expression m(m + n) = K/2 
    Since m and n are integer, this means that m must divide K/2 and same is true for m + n.
    If we get each divider of K/2, we can try for each K/(2m) - m = n.
    When we find a solution where both m and n are positive integer, we stop.
    If we find no solution, we return 0.
    Note: K must be even for a solution to exist

*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter an even natural number ', (answer) => {
    
    const parsed = parseInt(answer);

    if (isNaN(parsed)) {
        console.log("Please, enter a natural number next time <3");
        rl.close();
        
    }

    if (parsed%2 != 0) {
        console.log("Please, enter an even natural number next time <3");
        rl.close();
    }

    if (parsed < 1) {
        console.log("Enter a number greater than 0 next time");
        rl.close();
    }

    const K = parsed/2;
    let factor = findFactor(K);

    let m_sol = 0;
    let n_sol = 0;

    for(let i = 0; i < factor.length; i++)
    {
        let m = factor[i];
        let n = K/m - m;

        if (n > 0 && Number.isInteger(n) && m > n)
        {
            m_sol = m;
            n_sol = n;
            break;
        }
    }
    let a = Math.pow(m_sol,2) - Math.pow(n_sol,2);
    let b = 2*m_sol*n_sol;
    let c = Math.pow(m_sol,2) + Math.pow(n_sol,2);
    let triple = "("+a.toString()+", "+b.toString()+", "+c.toString()+")";
    if (a == 0 || b == 0 || c == 0)
    {
        console.log("No pythagorean triple adding to ", parsed, " were found, sorry :(");
    }
    else
    {
        console.log("The pythagorean triple", triple, "was found. It multiplies to ", a*b*c);
    }
    
    rl.close();
});

//We don't want 1 or number in our factor list since it won't work with the other algorith
function findFactor(number)
{
    factor = [];
    for (let i = 2; i <= number; i++)
    {
        if (number%i == 0)
        {
            factor.push(i);
        }
    }

    return factor;
}