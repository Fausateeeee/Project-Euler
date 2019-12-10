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

*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    console.log("The sum of the perimeters of all almost equilateral triangles with integral", 
     "side lengths and area and whose perimeters do not exceed one billion is", 
    GenerateHeronianTriangle(60));
    rl.close();
});

function LoopArea()
{
    //1000000000
    let total = 0;
    for (let side = 5; 3*side - 1 <= 1000000000; side += 2)
    {  
        if (side%100000 < 10)
        {
            console.log(3*side - 1);
        }

        total += IsHeronianTriangle(side);
    }

    return total;
}

function GenerateHeronianTriangle(upperbound){
    let a = 0;
    let b = 0;
    let c = 0;
    let m = 0;
    let total_perimeter = 0;
    let perimeter = 0;
    while(perimeter < upperbound){
        m++;
        for(let n = 1; n <= m; n++){
            for(let k = 1; k**2 < n*m; k++){
                if(gcd(m,gcd(n,k)) == 1){
                    a = n*(m**2 + k**2);
                    b = m*(n**2 + k**2);
                    c = (m + n)*(m*n - k**2);
                    console.log(a,b,c);
                    perimeter = a + b + c;
                }
                if(AlmostEquilateral(a,b,c)){
                    total_perimeter += perimeter;
                }
            }
        }
    }

    return total_perimeter;
}

function AlmostEquilateral(a,b,c){
    if(a == b && Math.abs(a - c) == 1){
        return true;
    }
    if(a == c && Math.abs(a - b) == 1){
        return true;
    }
    if(b == c && Math.abs(b - a) == 1){
        return true;
    }
    return false;
}
function gcd(x,y){
    while(y) {
        var t = y;
        y = x % y;
        x = t;
      }
      return x;
}

function IsHeronianTriangle(side)
{
    let total_perimeter = 0;
    console.log((side-1)*(3*side + 1));
    let test_plus1 = Math.sqrt((side - 1)*(3*side + 1));
    let test_minus1 = Math.sqrt((side + 1)*(3*side - 1));

    if(Number.isInteger(test_plus1) && (side + 1)*test_plus1 %4 == 0){
        total_perimeter += 3*side + 1;
    }


    if(Number.isInteger(test_minus1)   && (side - 1)*test_minus1 %4 == 0){
        total_perimeter += 3*side + 1;
    }
    return total_perimeter;
}