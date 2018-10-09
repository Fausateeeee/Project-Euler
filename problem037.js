/*jshint esversion: 6 */
/*

The number 3797 has an interesting property. Being prime itself, 
it is possible to continuously remove digits from left to right, 
and remain prime at each stage: 3797, 797, 97, and 7. 
Similarly we can work from right to left: 3797, 379, 37, and 3.

Find the sum of the only eleven primes that are both truncatable from left to right and right to left.

NOTE: 2, 3, 5, and 7 are not considered to be truncatable primes.

*/

/*
    There can't be an even digit in the number except the first one and it must be 2 or else, 
    if we truncate from left to right, we will get an even number which is not prime.

    The number must end with 3 or 7. If it doesn't and we truncate from left to right, 
    we will end on 1 or 9 which are not prime or 5 which guarantees a number won't be prime.

    The digit 5 can't be used except in the first position or else it will cause a 
    right to left truncate to generate a non prime number.
*/

const readline = require('readline');
const bigInt = require("big-integer");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter an natural number between 1 and 11 : ', (answer) => {

    const parsed = parseInt(answer);

    if (isNaN(parsed)) {
        console.log("Please, enter a natural number next time <3");
        rl.close();
    }

    else if (parsed < 1) {
        console.log("Enter a number between than 1 and 11 next time");
        rl.close();
    }

    else
    {

        console.log(truncablePrimes(parsed));

        console.log("The", parsed, "first truncables primes are", "ARR ANSWER", "and their sum is", "ANSWER");
        rl.close();
    }

});


function truncablePrimes(bound)
{
    let truncable = [];

    const firstPositionDigits = ["2","3","5","7"];
    const lastPositionDigits = ["3","7"];
    const middlePositionDigits = ["1","3","7","9"];

    while (truncable.length < bound)
    {
        let upperBound = 1;

        if (upperBound == 1)
        {
            for (let fpd of firstPositionDigits)
            {

                for (let lpd of lastPositionDigits)
                {
                    if (bigInt(parseInt(fpd + lpd)).isPrime())
                    {
                        truncable.push(fpd+lpd);
                    }
                }

            }
        }
        else
        {
            for (let fpd of firstPositionDigits)
            {
                for (let i = 0; i < upperBound - 1; i++)
                {

                }

                for (let lpd of lastPositionDigits)
                {
                    if (bigInt(parseInt(fpd + lpd)).isPrime())
                    {
                        truncable.push(fpd+lpd);
                    }
                }

            }
        }

    }
    return truncable;
}