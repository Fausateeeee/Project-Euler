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

    else if (parsed < 1 || parsed > 11) {
        console.log("Enter a number between than 1 and 11 next time");
        rl.close();
    }

    else
    {

        let arr = truncablePrimes(parsed);

        console.log("The", parsed, "first truncables primes are", arr, "and their sum is", 
        arr.reduce((a,b) => {return parseInt(a) + parseInt(b);}));
        rl.close();
    }

});


function truncablePrimes(bound)
{
    let truncable = [];

    const firstPositionDigits = ["2","3","5","7"];
    const lastPositionDigits = ["3","7"];
    const middlePositionDigits = ["1","3","7","9"];
    let upperBound = 1;

    while (truncable.length < bound)
    {
        
        let positionMarker = [];
        for (let i = 0; i <= upperBound; i++)
        {
            positionMarker.push(0);
        }

        while(positionMarker[0] < 4 )
        {
            let lastIndex = positionMarker.length - 1;
            let firstPart = firstPositionDigits[positionMarker[0]];
            let lastPart = lastPositionDigits[positionMarker[lastIndex]];
            let middlePart = "";

            for (let i = 1; i < upperBound; i++)
            {
                middlePart += middlePositionDigits[positionMarker[i]];
            }

            if (isTruncablePrime(firstPart + middlePart + lastPart))
            {
                truncable.push(firstPart + middlePart + lastPart);
            }

            AdjustPositionMarker(positionMarker, lastIndex);

        }

        upperBound++;

    }
    return truncable.slice(0, bound);
}

function AdjustPositionMarker(positionMarker, lastIndex)
{
    //Adjust last index first since there are only 2 case to check
    positionMarker[lastIndex]++;
    if (positionMarker[lastIndex] > 1)
    {
        positionMarker[lastIndex] = 0;
        positionMarker[lastIndex - 1]++;
    }

    //Adjust the middle position markers
    for (let i = lastIndex - 1; i > 0; i--)
    {
        if (positionMarker[i] > 3)
        {
            positionMarker[i] = 0;
            positionMarker[i - 1]++;
        }
    }
}

function isTruncablePrime(number)
{
    if (number.length == 2)
    {
        return bigInt(parseInt(number)).isPrime();
    }
    else
    {
        //left to right truncation
        for (let i = 0; i < number.length - 1; i++)
        {
            if (!bigInt(parseInt(number.substring(i))).isPrime())
            {
                return false;
            }
        }

        //right to left truncation
        for (let i = number.length - 1; i > 0; i--)
        {
            if (!bigInt(parseInt(number.substring(0, i))).isPrime())
            {
                return false;
            }
        }

        return true;
    }
}