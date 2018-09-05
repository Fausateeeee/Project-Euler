/*

If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.

Find the sum of all the multiples of 3 or 5 below 1000.

*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter a natural number ', (answer) => {

    const parsed = parseInt(answer);

    if (isNaN(parsed)) {
        console.log("Please, enter a natural number next time <3")
        return 0;
    }

    if (parsed < 3) {
        return 0;
    }
    let arr = [];
    for (let i = 3; i < parsed; i++) {

        if (i % 3 === 0 || i % 5 === 0) {
            arr.push(i);
        }

    }

    console.log("The sum of all the multiples of 3 or 5 bellow ", parsed, " is :", arr.reduce((accumulator, currentValue) => accumulator + currentValue));
    rl.close();
});