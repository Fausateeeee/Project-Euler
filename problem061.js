/*jshint esversion: 6 */
/*

Triangle, square, pentagonal, hexagonal, heptagonal, and octagonal numbers are all figurate 
(polygonal) numbers and are generated by the following formulae:
Triangle 	  	P3,n=n(n+1)/2 	  	1, 3, 6, 10, 15, ...
Square 	  	    P4,n=n^2 	  	    1, 4, 9, 16, 25, ...
Pentagonal 	  	P5,n=n(3n−1)/2 	  	1, 5, 12, 22, 35, ...
Hexagonal 	  	P6,n=n(2n−1) 	  	1, 6, 15, 28, 45, ...
Heptagonal 	  	P7,n=n(5n−3)/2 	  	1, 7, 18, 34, 55, ...
Octagonal 	  	P8,n=n(3n−2) 	  	1, 8, 21, 40, 65, ...

The ordered set of three 4-digit numbers: 8128, 2882, 8281, has three interesting properties.

1. The set is cyclic, in that the last two digits of each number is the first two digits 
of the next number (including the last number with the first).
2. Each polygonal type: triangle (P3,127=8128), square (P4,91=8281), and pentagonal (P5,44=2882), 
is represented by a different number in the set.
3. This is the only set of 4-digit numbers with this property.

Find the sum of the only ordered set of six cyclic 4-digit numbers 
for which each polygonal type: triangle, square, pentagonal, hexagonal, 
heptagonal, and octagonal, is represented by a different number in the set.

*/
const readline = require('readline');
const bigInt = require('big-integer');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    console.log("The lowest sum for a set of five primes for which any two primes concatenate to produce another prime is",
    "ANSWER", FindCyclicalSet());
    rl.close();
});

function FindCyclicalSet()
{
    let triangle = GenerateTriangleArray();
    let square = GenerateSquareArray();
    let pentagonal = GeneratePentagonalArray();
    let hexagonal = GenerateHexagonalArray();
    let heptagonal = GenerateHeptagonalArray();
    let octagonal = GenerateOctagonalArray();

    console.log(triangle);
    cons
}

function GenerateTriangleArray()
{
    let n = 1;
    let nbr = 0;
    let arr = {};
    while(nbr < 10000)
    {       
        if (nbr > 999)
        {
            arr[nbr] = true;
        }
        nbr = (n*(n+1))/2;
        ++n;
    }
    return arr;
}

function GenerateSquareArray()
{
    let n = 1;
    let nbr = 0;
    let arr = {};
    while(nbr < 10000)
    {       
        if (nbr > 999)
        {
            arr[nbr] = true;
        }
        nbr = n^2;
        ++n;
    }
    return arr;
}

function GeneratePentagonalArray()
{
    let n = 1;
    let nbr = 0;
    let arr = {};
    while(nbr < 10000)
    {       
        if (nbr > 999)
        {
            arr[nbr] = true;
        }
        nbr = (n*(3*n-1))/2 ;
        ++n;
    }
    return arr;
}

function GenerateHexagonalArray()
{
    let n = 1;
    let nbr = 0;
    let arr = {};
    while(nbr < 10000)
    {       
        if (nbr > 999)
        {
            arr[nbr] = true;
        }
        nbr = n*(2*n-1);
        ++n;
    }
    return arr;
}

function GenerateHeptagonalArray()
{
    let n = 1;
    let nbr = 0;
    let arr = {};
    while(nbr < 10000)
    {       
        if (nbr > 999)
        {
            arr[nbr] = true;
        }
        nbr = (n*(5*n-3))/2;
        ++n;
    }
    return arr;
}

function GenerateOctagonalArray()
{
    let n = 1;
    let nbr = 0;
    let arr = {};
    while(nbr < 10000)
    {       
        if (nbr > 999)
        {
            arr[nbr] = true;
        }
        nbr = n*(3*n-2);
        ++n;
    }
    return arr;
}