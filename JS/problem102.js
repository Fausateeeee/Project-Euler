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

    console.log("The number of triangles which contains the origin is", "ANSWER");
    rl.close();
});

