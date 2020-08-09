/*jshint esversion: 6 */
/*

The first two consecutive numbers to have two distinct prime factors are:

14 = 2 × 7
15 = 3 × 5

The first three consecutive numbers to have three distinct prime factors are:

644 = 2^2 × 7 × 23
645 = 3 × 5 × 43
646 = 2 × 17 × 19.

Find the first four consecutive integers to have four distinct prime factors each. What is the first of these numbers?

*/

const readline = require('readline');
const bigInt = require('big-integer');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    let primesArr = [2,3];
    let numberFactor = {2: "prime", 3: "prime", 4: {'2': 2}};

    console.log("The first of the four consecutive integers to have four distinct prime factor each is", 
    findConsecutive(primesArr, numberFactor) );
    rl.close();

});

function factorize(number, primesArr, numberFactor)
{
    const originalValue = number;
    numberFactor[originalValue] = {};

    for (let prime of primesArr)
    {
        if (number == 1)
        {
            break;
        }
        while (number%prime == 0)
        {
            if (!numberFactor[originalValue].hasOwnProperty(prime))
            {
                numberFactor[originalValue][prime] = 1;
                number /= prime; 
            }
            else
            {
                numberFactor[originalValue][prime]++;
                number /= prime; 
            }

        }
    }
}

function findConsecutive(primesArr, numberFactor)
{
    let current = 5;
    while(true)
    {
        console.log(current);
        if (bigInt(current).isPrime())
        {
            numberFactor[current] = "prime";
            primesArr.push(current);
            current++;
        }
        factorize (current, primesArr, numberFactor);
        if (numberFactor.hasOwnProperty(current - 1) &&
        numberFactor.hasOwnProperty(current - 2) && numberFactor.hasOwnProperty(current - 3))
        {
            if(compareFactor(numberFactor[current], numberFactor[current-1], numberFactor[current-2], numberFactor[current-3]))
            {
                return current-3;
            }
            current++;
        }
    }

}

function compareFactor(number1, number2, number3, number4)
{
    if (number1 == "prime" || number2 == "prime" || number3 == "prime" || number4 == "prime")
    {
        return false;
    }
    else
    {
        let keys1 = Object.keys(number1);
        let keys2 = Object.keys(number2);
        let keys3 = Object.keys(number3);
        let keys4 = Object.keys(number4);
        if(keys1.length < 4 || keys2.length < 4 || keys3.length < 4 || keys4.length < 4 )
        {
            return false;
        }
        for (let key of keys1)
        {
            if (keys2.indexOf(key) != -1)
            {
                if (number1[key] == number2[key])
                {
                    return false;
                }
            }
            if (keys3.indexOf(key) != -1)
            {
                if (number1[key] == number3[key])
                {
                    return false;
                } 
            }
            if (keys4.indexOf(key) != -1)
            {
                if (number1[key] == number4[key])
                {
                    return false;
                }
            }
        }
        for (let key of keys2)
        {
            if (keys3.indexOf(key) != -1)
            {
                if (number2[key] == number3[key])
                {
                    return false;
                } 
            }
            if (keys4.indexOf(key) != -1)
            {
                if (number2[key] == number4[key])
                {
                    return false;
                }
            }
        }
        for (let key of keys3)
        {
            if (keys4.indexOf(key) != -1)
            {
                if (number3[key] == number4[key])
                {
                    return false;
                }
            }
        }
        return true;
    }
}