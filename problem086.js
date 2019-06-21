/*jshint esversion: 6 */
/*

    A spider, S, sits in one corner of a cuboid room, measuring 6 by 5 by 3, and a fly, F, sits in the opposite corner.
    By travelling on the surfaces of the room,
    the shortest "straight line" distance from S to F is 10 and the path is shown on the diagram.

    However, there are up to three "shortest" path candidates for any given cuboid 
    and the shortest route doesn't always have integer length.

    It can be shown that there are exactly 2060 distinct cuboids, ignoring rotations, 
    with integer dimensions, up to a maximum size of M by M by M, 
    for which the shortest route has integer length when M = 100. 
    This is the least value of M for which the number of solutions first exceeds two thousand; 
    the number of solutions when M = 99 is 1975.

    Find the least value of M such that the number of solutions first exceeds one million.

*/

/*

    The problem can be thought as follow:

    The shortest path will always touch 2 sides. Suppose we have a cuboid of side A,B and C. 
    Then the shortest path will be the minimal solution between:

    sqrt(A^2 + (B + C)^2);
    sqrt(B^2 + (A + C)^2);
    sqrt(C^2 + (A + B)^2);

    We can see this by deconstructing the faces of the cuboid and  sticking them in a plane
    Since the shortest path will be the diagonal of the rectangle formed by 2 of the 3 faces,
    one of these combination will be the shortest path.

    We search the lower bound of M, where A, B, C <= M such that the number of pythagorean triple
    exceeds one million.

*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    console.log("The least value of M such that the number of solutions first exceeds one million is", 
    LoopUntilLowerBound(1000000));
    rl.close();
});

function LoopUntilLowerBound(lowerbound)
{
    let total = 0;
    let upperbound = 0;
    
    while (total < lowerbound)
    {
        //console.log(total, upperbound);
        total += FindPythagoreanTriple(++upperbound);
    }

    return upperbound;
}
function FindPythagoreanTriple(upperbound)
{
    let total = 0;
    for (let A = 1; A <= upperbound; ++A)
    {
        for (let B = A; B <= upperbound; ++B)
        {
            //console.log(A,B,upperbound);
            let T1 = Math.sqrt(Math.pow(A, 2) + Math.pow(B + upperbound, 2));
            let T2 = Math.sqrt(Math.pow(B, 2) + Math.pow(A + upperbound, 2));
            let T3 = Math.sqrt(Math.pow(upperbound, 2) + Math.pow(A + B, 2));

            let min = Math.min(T1, T2, T3);
            //console.log(T1,T2,T3, min);
            if (Number.isInteger(min))
            {
                ++total;
            }

        }
    }

    return total;
}