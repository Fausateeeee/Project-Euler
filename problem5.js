/*jshint esversion: 6 */
/*

2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.

What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?

*/

/*I will use part of my problem 3 solution, to get the factorisation form of every number below N*/
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter a natural number ', (answer) => {

    const parsed = parseInt(answer);

    if (isNaN(parsed)) {
        console.log("Please, enter a natural number next time <3");
        return 0;
    }

    if (parsed < 1) {
        return 0;
    }
    let arr = [];
    for (let i = 2; i <= parsed; i++)
    {
        arr.push(primeFactorisation(i));
    }
    console.log("The smallest positive number that is evenly divisible by all of the number from 1 to", parsed, " is : ", arr);
    rl.close();
});

function primeFactorisation(number)
{
    let arr = [];
    

    while (number%2 == 0){
        number /= 2;
        arr.push(2);
    }  

    const sup = Math.sqrt(number);
    for (let i = 3; i <= sup; i = i + 2)
    {
        while (number % i == 0)
        {
            number /= i;
            arr.push(i);
        }
    }
    /*If the number is prime, add it to the array*/
    if (arr.length == 0)
    {
        arr.push(number);
    }

    return arr;
}
