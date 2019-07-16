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
    for (let side = 3; 3*side - 1 <= 30; side += 2)
    {       
        total += IsHeronianTriangle(side);
    }

    return total;
}

function IsHeronianTriangle(side)
{
    let b_side = BigInt(side);
    let b_other_side = BigInt(side + 1);
    

    let test_area = sqrt((4*b_side**2) - b_other_side**2);
	let total_perimeter = 0;

    console.log(test_area);
    if (Number.isInteger(test_area))
    {
		//console.log(side, other_side);
        total_perimeter += 2*side + other_side;
	}
	
    other_side = side - 1; 
    test_area = sqrt(4*(BigInt(side)**2) - BigInt(other_side)**2);

    if (Number.isInteger(test_area))
    {
		//console.log(side, other_side);
        total_perimeter += 2*side + other_side;
    }
    return total_perimeter;
}

function sqrt(value) {
    if (value < 0n) {
        throw 'square root of negative numbers is not supported'
    }

    if (value < 2n) {
        return value;
    }

    function newtonIteration(n, x0) {
        const x1 = ((n / x0) + x0) >> 1n;
        if (x0 === x1 || x0 === (x1 - 1n)) {
            return x0;
        }
        return newtonIteration(n, x1);
    }

    return newtonIteration(value, 1n);
}