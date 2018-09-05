/*jshint esversion: 6 */
/*

The prime factors of 13195 are 5, 7, 13 and 29.

What is the largest prime factor of the number 600851475143 ?

*/
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

    if (parsed < 2) {
        return 0;
    }

    /* Either, the number is prime or the largest prime factor is smaller than the square root of the number */
  
    let copy = parsed;
    let arr = [];

    while (copy%2 == 0){
        copy /= 2;
        arr.push(2);
    }

    const sup = Math.sqrt(copy);

    for (let i = 3; i <= sup; i = i + 2)
    {
        if (copy % i == 0)
        {
            copy /= i;
            arr.push(i);
        }
    }
    /*If the number is prime, add it to the array*/
    if (arr.length == 0)
    {
        arr.push(parsed);
    }
    console.log("The largest prime factor of ", parsed, " is :", arr[arr.length - 1]);
    rl.close();
});