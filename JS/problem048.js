/*jshint esversion: 6 */
/*

The series, 1^1 + 2^2 + 3^3 + ... + 10^10 = 10405071317.

Find the last ten digits of the series, 1^1 + 2^2 + 3^3 + ... + 1000^1000.

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
    else if (parsed < 1) {
        console.log("Enter a positive number next time");
        rl.close();
    } 
    else {
        let total = bigInt(0);
        for(let i = 1; i <= parsed; i++)
        {
            total = total.add(bigInt(i).pow(i));
        }
        console.log("The last ten digits of the sequence a^a from 1 to", parsed,
        "is", total.mod(10000000000).valueOf());
        rl.close();
    }

});

