/*jshint esversion: 6 */
/*

Starting with 1 and spiralling anticlockwise in the following way, a square spiral with side length 7 is formed.

*37 36  35  34  33 32  *31
38  *17 16  15  14 *13 30
39  18  *5  4   *3 12  29
40  19  6   1   2  11  28
41  20  *7  8   9  10  27
42  21  22  23  24 25  26
*43 44  45  46  47 48  49

It is interesting to note that the odd squares lie along the bottom right diagonal,
 but what is more interesting is that 8 out of the 13 numbers lying along both diagonals are prime; 
 that is, a ratio of 8/13 ≈ 62%.

If one complete new layer is wrapped around the spiral above, a square spiral with side length 9 will be formed. 
If this process is continued, what is the side length of the square spiral for which the 
ratio of primes along both diagonals first falls below 10%?

*/

/*

    {1x1} 1 + {3x3}((1 + 2) + (1 + 4) + (1 + 6) + (1 + 8)) + {5x5}((9 + 4) + (9 + 8) + (9 + 12) + (9 + 16)) + 
    {7x7}((25 + 6) + (25 + 12) + (25 + 18) + (25 + 24)) + ...

*/

/*
    The total number of diagonal number in an odd square is side*2 - 1.
    We can then compute each new number added by using the method at problem 28.
    We check if they are prime and compute the ratio.

*/
const readline = require('readline');
const bigInt = require("big-integer");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter a percentage : ', (answer) => {

    const parsed = parseFloat(answer);

    if (isNaN(parsed)) {
        console.log("Please, enter a valid number next time <3");
        rl.close();
    }

    else if (parsed > 100 || parsed < 0) {
        console.log("Enter a valid percentage next time");
        rl.close();
    }

    else
    {
        let base = 1;
        let ratio = 100;
        let primeCount = 0;
        let side = 1;

        while (ratio > parsed)
        {
            side += 2;
            for (let j = 1; j <= 4; j++)
            {
                diagonal = base + (side - 1)*j;
                console.log(diagonal, bigInt(diagonal).isPrime());
                if  (bigInt(diagonal).isPrime())
                {
                    ++primeCount;
                }
            }
            base += (side - 1)*4;       
            ratio = (primeCount/(side*2 - 1))* 100;

            //console.log(ratio, side,  primeTotal, side*2 - 1);
        }
        console.log("The ratio of prime number on the diagonal is below",parsed, "% when the grid has sides of length", sideLength);
        rl.close();
    }

});

function probablyPrime(n, k) {
	if (n === 2 || n === 3)
		return true;
	if (n % 2 === 0 || n < 2)
		return false;
 
	// Write (n - 1) as 2^s * d
	let s = 0, d = n - 1;
	while (d % 2 === 0) {
		d /= 2;
		++s;
	}
 
	WitnessLoop: do {
		// A base between 2 and n - 2
		let x = Math.pow(2 + Math.floor(Math.random() * (n - 3)), d) % n;
 
		if (x === 1 || x === n - 1)
			continue;
 
		for (let i = s - 1; i--;) {
			x = x * x % n;
			if (x === 1)
				return false;
			if (x === n - 1)
				continue WitnessLoop;
		}
 
		return false;
	} while (--k);
 
	return true;
}