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
    We already know from problem 9 that the length of the wire must be even.
    See problem039

*/
const readline = require('readline');
const bigInt = require('big-integer');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    console.log("There are exactly",
    LoopOverWireLength(),
    "right angle triangles that can be formed with a given length of wire in a unique way.");
    rl.close();
});

function LoopOverWireLength()
{
    let totalWire = 0;
    for (let i = 12; i <= 1500000; i += 2)
    {
        if(findPythagoreanTriples(i))
        {
            ++totalWire;
        }
    }

    return totalWire;
}

function findPythagoreanTriples(perimeter)
{
    let numberOfSol = 0;
    for (let a = 2; a < perimeter/2; a++)
    {
        let b = perimeter*(a - perimeter/2)/(a - perimeter);

        if (b <= 0 || b < a)
        {
            break;
        }
        if (Number.isInteger(b))
        {
            ++numberOfSol;
            if(numberOfSol > 1)
            {
                return false;
            }
        }
    }

    if (numberOfSol ==0 || numberOfSol > 1)
    {
        return false;
    }

    return true;
}