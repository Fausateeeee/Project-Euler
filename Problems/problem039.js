/*jshint esversion: 6 */
/*

If p is the perimeter of a right angle triangle with integral length sides, {a,b,c}, there are exactly three solutions for p = 120.

{20,48,52}, {24,45,51}, {30,40,50}

For which value of p ≤ 1000, is the number of solutions maximised?

*/

/*
    We have the equation a + b + c = p.
    We know from pythagorean theorem that a^2 + b^2  = c^2
    Mixing both equation, we get a + b +sqrt(a^2 + b^2) = p
    By fixing a value "a", we can isolate and compute b, it gives us the equation
    b = p*(a - p/2)/(a - p)
    From that, we check if b is an integer and we check that we do not already have this solution 
    since (a,b) and (b,a) is the same solution
*/
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter an natural number : ', (answer) => {

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
        let max = 0;
        let perimeter = 0;

        for (let i = 1; i <= parsed; i++)
        {
            let value = findPythagoreanTriples(i);
            if(value > max)
            {
                max = value;
                perimeter = i;
            }
        }

        console.log("The value of the perimiter that maximised the number of solution bellow", parsed, 
        "is", perimeter);
        rl.close();
    }

});

function findPythagoreanTriples(perimeter)
{
    let numberOfSol = [];
    for (let a = 1; a < perimeter; a++)
    {
        let b = perimeter*(a - perimeter/2)/(a - perimeter);

        if (b <= 0)
        {
            break;
        }
        if (Number.isInteger(b) && numberOfSol.indexOf(b) == -1)
        {
            numberOfSol.push(a);
        }
    }

    return numberOfSol.length;
}
