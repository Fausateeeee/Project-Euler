/*jshint esversion: 6 */
/*

By replacing the 1st digit of the 2-digit number *3, 
it turns out that six of the nine possible values: 13, 23, 43, 53, 73, and 83, are all prime.

By replacing the 3rd and 4th digits of 56**3 with the same digit, 
this 5-digit number is the first example having seven primes among the ten generated numbers, 
yielding the family: 56003, 56113, 56333, 56443, 56663, 56773, and 56993. 
Consequently 56003, being the first member of this family, is the smallest prime with this property.

Find the smallest prime which, by replacing part of the number (not necessarily adjacent digits) with 
the same digit, is part of an eight prime value family.

*/

/*
    There are multiple cases to check, if n < 100, then I check for *a.
    For 100 < n < 1000, I need to check for *ab, a*b, **a.
    For 1000 < n < 10000, I need to check for *abc, a*bc, ab*c, **ab, *a*b, a**b

    Also, the last digit must be 1, 3, 7 or 9.

    ~~~~~~~~~

    Above is not the right way to approch the problem imo.
    Imagine I an n-digits number, then I can divide the number in two block,
    where the first block is all digits except the last and the second block is the last digit.
    The first block is of length n - 1. There is then 2^(n-1) - 1 total case to study to find a prime family.
    So if I compute every permutation possible and check if they are part of a family, I can
    quickly mark off the cantidates where it is impossible.

*/

const readline = require('readline');
const bigInt = require('big-integer');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter an integer between 6, 7, 8 or 9: ', (answer) => {

    let parsed = parseInt(answer);

    if (isNaN(parsed)) {
        console.log("Please, enter a natural number next time <3");
        rl.close();
    }

    else if (parsed <= 5 || parsed >= 10) {
        console.log("Only 6, 7, 8 or 9 are valid number");
        rl.close();
    }

    else
    {
        let sol = -1;
        let number = 11;
        while (sol < 0)
        {
            sol = checkFamilies(number, parsed);
            number = findNextPrime(number);
        }
    
        console.log("The smallest prime that have the prime digit replacement that is part of an", parsed, "prime value family is", 
        sol);
        rl.close();
    }
});

function checkFamilies(prime, familySize)
{
    let arrPrime = prime.toString().split("");
    let lastNbr = arrPrime[arrPrime.length - 1];


    for(let i = 0; i < arrPrime.length - 1; i++)
    {
        let nbrChecked = [];
        let isPrime = 0;
        let firstDigit = arrPrime[0];
        let nbrToReplace = arrPrime[i];

        if(nbrToReplace != lastNbr && nbrChecked.indexOf(nbrToReplace) == -1)
        {
            let digit;
            arrPrime[i] == firstDigit ? digit = 1 : digit = 0;

            for (; digit < 10; digit++)
            {
                while (arrPrime.indexOf(nbrToReplace) != -1)
                {
                    arrPrime[arrPrime.indexOf(nbrToReplace)] = digit;
                }
                if (bigInt(Number.parseInt(arrPrime.join(""))).isPrime())
                {
                    isPrime++;
                }
                arrPrime = prime.toString().split("");
                if (digit - isPrime > 10 - familySize)
                {
                    break;
                }
            }
            if (isPrime >= familySize)
            {
                return prime;
            }
        }
    }

    return -1;
}

function findNextPrime(number)
{
    number += 2;
    while(true)
    {
        if (number%3 !=0 && number%5 !=0 && number%7 !=0 && bigInt(number).isPrime)
        {
            return number;
        }
        number += 2;
    }
}