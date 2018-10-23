/*jshint esversion: 6 */
/*

The prime 41, can be written as the sum of six consecutive primes:
41 = 2 + 3 + 5 + 7 + 11 + 13

This is the longest sum of consecutive primes that adds to a prime below one-hundred.

The longest sum of consecutive primes below one-thousand that adds to a prime, contains 21 terms, and is equal to 953.

Which prime, below one-million, can be written as the sum of the most consecutive primes?

*/

/*
    I will need a prime array up to the parsed number.
    Then, I compute the maximal length a sequence can be by summing 
    the n first primes until the sum exceeds the parsed number.
    Then, I check for every subsequence until I find one
    which sums to a prime under one million.
*/

const readline = require('readline');
const bigInt = require('big-integer');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter an integer : ', (answer) => {

    const parsed = parseInt(answer);

    if (isNaN(parsed)) {
        console.log("Please, enter a natural number next time <3");
        rl.close();
    } 
    else if (parsed < 2) {
        console.log("Enter a number greater than 1 next time");
        rl.close();
    } 
    else {
        primes = getPrimesArray(parsed);
        maxSequenceLength = longestPossibleSequence(parsed,primes);

        
        
        console.log("The prime below", parsed, "that can be written as the sum of the most consecutive primes is", 
        findPrimeSum(maxSequenceLength, parsed, primes));
        rl.close();
    }

});

function getPrimesArray(upperBound)
{
    if (upperBound == 2)
    {
        return [2];
    }
    else if (upperBound <= 4)
    {
        return [2,3];
    }
    else if (upperBound <= 6)
    {
        return [2,3,5];
    }
    else if(upperBound <= 10)
    {
        return [2,3,5,7];
    }
    else if (upperBound <= 12)
    {
        return[2,3,5,7,11];
    }
    else
    {
        primesArr = [2,3,5,7,11];
        for (let i = 11; i <= upperBound; i += 2)
        {
            if (i%3 != 0 && i%5 != 0 && i%7 != 0 && i%11 !=0 && bigInt(i).isPrime())
            {
                primesArr.push(i);
            }
        }
        return primesArr;
    }
}

function longestPossibleSequence(upperBound, primes)
{
    let sum = 0;
    let i = 0;
    while(sum < upperBound && i < primes.length)
    {
        sum += primes[i++];
    }
    return i;
}

function findPrimeSum(sequenceLength, upperBound, primes)
{
    let arr=[];
    let j = 0;
    while(true)
    {    
        let sum = 0;
        for (let i = j; i < sequenceLength; i++)
        {
            sum += primes[i];
        }

        if (primes.indexOf(sum) != -1)
        {
            return sum;
        }
        else if (sum >= upperBound)
        {
            j = 0;
            --sequenceLength;

        }
        else
        {
            ++j;
        }

    }
}