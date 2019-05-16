/*jshint esversion: 6 */
/*

It turns out that 12 cm is the smallest length of wire that can be bent to form an integer 
sided right angle triangle in exactly one way, but there are many more examples.

12 cm: (3,4,5)
24 cm: (6,8,10)
30 cm: (5,12,13)
36 cm: (9,12,15)
40 cm: (8,15,17)
48 cm: (12,16,20)

In contrast, some lengths of wire, like 20 cm, cannot be bent to form an integer sided right angle triangle, 
and other lengths allow more than one solution to be found; 
for example, using 120 cm it is possible to form exactly three different integer sided right angle triangles.

120 cm: (30,40,50), (20,48,52), (24,45,51)

Given that L is the length of the wire, 
for how many values of L ≤ 1,500,000 can exactly one integer sided right angle triangle be formed?

*/

/*
    We already know from problem 9 that the length of the wire must be odd.
*/
const readline = require('readline');
const bigInt = require('big-integer');
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// rl.question('Press enter to continue : ', (answer) => {

//     console.log("There are exactly",
//     TestLength(120),
//     "right angle triangles that can be formed with a given length of wire in a unique way.");
//     rl.close();
// });

console.log(TestLength(20), TestLength(24), TestLength(120));

function TestLength(number)
{
    const K = number/2;
    let factor = findFactor(K);

    let m_sol = 0;
    let n_sol = 0;

    for(let i = 0; i < factor.length; i++)
    {
        let m = factor[i];
        let n = K/m - m;

        if (n > 0 && Number.isInteger(n) && m > n)
        {
            if (m_sol != 0 && n_sol != 0)
            {
                return false;
            }
            m_sol = m;
            n_sol = n;
        }
        if (n < 0)
        {
            break;
        }
    }

    if (m_sol == 0 && n_sol == 0)
    {
        return false;
    }

    return true;
}
function findFactor(number)
{
    factor = [];
    for (let i = 2; i <= number/2; i++)
    {
        if (number%i == 0)
        {
            factor.push(i);
        }
    }
    factor.push(number);

    return factor;
}