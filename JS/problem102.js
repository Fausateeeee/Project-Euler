/*jshint esversion: 7 */
/*

    Three distinct points are plotted at random on a Cartesian plane, 
    for which -1000 ≤ x, y ≤ 1000, such that a triangle is formed.

    Consider the following two triangles:

    A(-340,495), B(-153,-910), C(835,-947)

    X(-175,41), Y(-421,-714), Z(574,-645)

    It can be verified that triangle ABC contains the origin, whereas triangle XYZ does not.

    Using triangles.txt (right click and 'Save Link/Target As...'), 
    a 27K text file containing the co-ordinates of one thousand "random" triangles, 
    find the number of triangles for which the interior contains the origin.

    NOTE: The first two examples in the file represent the triangles in the example given above.

*/

const readline = require('readline');
const fs = require('fs');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    console.log("The number of triangles which contains the origin is", ReadFile());
    rl.close();
});


function ReadFile()
{
    let total = 0;
    let allText = fs.readFileSync("../Additional-Files/p102_triangles.txt", 'utf8');
    let allTriangles = allText.split("\n");

    for (let coordinates of allTriangles)
    {
        let points = coordinates.split(",");
        let A = [Number.parseInt(points[0]), Number.parseInt(points[1])];
        let B = [Number.parseInt(points[2]), Number.parseInt(points[3])];
        let C = [Number.parseInt(points[4]), Number.parseInt(points[5])];
        
        if (BarycentricCoordinates(A,B,C)){
            ++total;
        }
    }
    return total;
}

function BarycentricCoordinates(A,B,C){
    let lambda1 = ((B[1] - C[1])*(-1*C[0]) + (C[0] - B[0])*(-1*C[1]))/((B[1] - C[1])*(A[0] - C[0]) + (C[0] - B[0])*(A[1] - C[1]));
    let lambda2 = ((C[1] - A[1])*(-1*C[0]) + (A[0] - C[0])*(-1*C[1]))/((B[1] - C[1])*(A[0] - C[0]) + (C[0] - B[0])*(A[1] - C[1]));
    let lambda3 = 1 - lambda1 - lambda2;
    console.log(lambda1, lambda2, lambda3);
    return lambda1 > 0 && lambda2 > 0 && lambda3 > 0;
}
