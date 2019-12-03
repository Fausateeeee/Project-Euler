/*jshint esversion: 6 */
/*

    The points P (x1, y1) and Q (x2, y2) are plotted at integer co-ordinates 
    and are joined to the origin, O(0,0), to form ΔOPQ.

    There are exactly fourteen triangles containing a right angle that can 
    be formed when each co-ordinate lies between 0 and 2 inclusive; that is,0 ≤ x1, y1, x2, y2 ≤ 2.

    Given that 0 ≤ x1, y1, x2, y2 ≤ 50, how many right triangles can be formed?

*/

const readline = require('readline');
const fs = require('fs');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    console.log("Given that 0 ≤ x1, y1, x2, y2 ≤ 50, there are", GeneratePoint(), "right triangles that can be formed.");
    rl.close();
});

function GeneratePoint()
{
    let total = 0;
    let upperbound = 50;
    let dict = {};
    for (let x = 0; x <= upperbound; ++x)
    {
        for (let y = 0; y <= upperbound; ++y)
        {
            if (x == 0 && y == 0)
            {
                ++y;
            }
            for (let u = 0; u <= upperbound; ++u)
            {
                for (let v = 0; v <= upperbound; ++v)
                {
                    if (u == 0 && v == 0)
                    {
                        ++v;
                    }
                    if (x == u && y == v)
                    {
                        ++v;
                    }
                    //console.log([x,y], [u,v]);
                    total += IsRectangle([x,y], [u,v], dict);
                }
            }
        }
    }
    return total;
}

function IsRectangle(point1, point2, dict)
{
    let A = [...point1];
    let B = [...point2];
    let C = [point2[0] - point1[0], point2[1] - point1[1]];

    let AdotB = DotProduct(A,B);
    let BdotC = DotProduct(B,C);
    let AdotC = DotProduct(A,C);

    if(AdotB == 0 || AdotC == 0 || BdotC == 0)
    {
        let point_str1 = point1[0].toString() + point1[1].toString() + point2[0].toString() + point2[1].toString();
        let point_str2 = point2[0].toString() + point2[1].toString() + point1[0].toString() + point1[1].toString();

        if (!dict[point_str1])
        {
            if (!dict[point_str2])
            {
                dict[point_str1] = true;
                dict[point_str2] = true;
                //console.log(point1, point2);
                return 1;
            }
        }
    }

    return 0;

}

function DotProduct(vectorA, vectorB)
{
    return vectorA[0]*vectorB[0] + vectorA[1]*vectorB[1];
}