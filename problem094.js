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

    The area will be an integer if and only if (a - 1)(3a + 1) or (a + 1)(3a - 1) is a square.

*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    console.log("The sum of the perimeters of all almost equilateral triangles with integral", 
     "side lengths and area and whose perimeters do not exceed one billion is", 
    LoopArea());
    rl.close();
});

function LoopArea()
{
    //1000000000
    let total = 0;
    for (let side = 5; 3*side - 1 <= 1000000000; side += 2)
    {  
        console.log(side);
        total += IsHeronianTriangle(side);
    }

    return total;
}

function IsHeronianTriangle(side)
{

    let b_side = BigInt(side);
    let b_other_side = BigInt(side + 1);
    let divisor = 2n;

    if (side >= 100)
    {
        divisor = 10n;
    }
    else if (side >= 1000)
    {
        divisor = 30n;
    }
    else if (side >= 10000)
    {
        divisor = 100n;
    }
    else if (side >= 100000)
    {
        divisor = 310n;
    }
    else if (side >= 1000000)
    {
        divisor = 1000n;
    }
    else if (side >= 10000000)
    {
        divisor = 3160n;
    }
    else if (side >= 100000000)
    {
        divisor = 10000n;
    }
    else
    {
        divisor = 31620n;
    }

    let test_area = 4n*(b_side**2n) - (b_other_side**2n);
    //let test_area = b_side**2n;
	let total_perimeter = 0;
    let potential_root = test_area/divisor;
    
    while(potential_root**2n > test_area)
    {
        --potential_root;
    }
    if (potential_root**2n === test_area)
    {
        total_perimeter += 3*side + 1;
	}
	
    b_other_side = BigInt(side - 1); 
    test_area = 4n*(b_side**2n) - (b_other_side**2n);
    potential_root = test_area/2n;

    if (potential_root**2n === test_area)
    {
        total_perimeter += 3*side - 1;
    }
    return total_perimeter;
}