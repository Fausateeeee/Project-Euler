/*jshint esversion: 7 */
/*

    It is easily proved that no equilateral triangle exists with integral length sides 
    and integral area. However, the almost equilateral triangle 5-5-6 has an area of 12 square units.

    We shall define an almost equilateral triangle to be a triangle for 
    which two sides are equal and the third differs by no more than one unit.

    Find the sum of the perimeters of all almost equilateral triangles with integral 
    side lengths and area and whose perimeters do not exceed one billion (1,000,000,000).

*/

/*

    Using Heron's formula, we have the area A = sqrt(s(s - a)(s - b)(s - c))
    where s is the semiperimiter s = (a + b + c)/2.

    Knowing that a = b and c = a + 1 or c = a - 1, we simplify the equation to
    (a + 1)/4 * sqrt((a - 1)(3a + 1)) if c = a + 1 or (a - 1)/4 * sqrt((a + 1)(3a - 1))

    The area will be an integer if and only if ((a - 1)(3a + 1) and a + 1 = 0 mod 4)  or ((a + 1)(3a - 1) is a square and a - 1 = 0 mod 4).

    We only need to compute for every fourth number since a = 1 mod 4.
*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    console.log("The sum of the perimeters of all almost equilateral triangles with integral", 
     "side lengths and area and whose perimeters do not exceed one billion is", 
    LoopArea(1000000000));
    //console.log(HeronsMethod(BigInt(25)));
    rl.close();
});

function LoopArea(upperbound)
{
    //1000000000
    let total = 0;
    for (let side = 5; 3*side - 1 <= upperbound; side += 4)
    {  
        // if (side%100000 < 10)
        // {
        //     console.log(3*side - 1);
        // }

        total += IsHeronianTriangle(side);
    }

    return total;
}


function IsHeronianTriangle(side)
{
    let total_perimeter = 0;


    let test_plus1 = BigInt((side - 1))*BigInt((3*side + 1));
    let test_minus1 = BigInt((side + 1))*BigInt((3*side - 1));

    if(HeronsMethod(test_plus1)){
        total_perimeter += 3*side + 1;
    }


    if(HeronsMethod(test_minus1)){
        total_perimeter += 3*side - 1;
    }
    return total_perimeter;
}

function HeronsMethod(potentialsquare){
    let x_0 = potentialsquare/BigInt(2);
    let x_1 = (x_0 + potentialsquare/x_0)/BigInt(2);
    let potentialroot = [x_0];
    while(!potentialroot.includes(x_1)){
        // console.log(potentialsquare, x_0, x_1, potentialroot);
        x_0 = x_1;
        x_1  = (x_0 + potentialsquare/x_0)/BigInt(2);
        potentialroot.push(x_0);
    }
    if (x_1**BigInt(2) == potentialsquare){
        return true;
    }
    return false;
}