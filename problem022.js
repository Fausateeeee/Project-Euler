/*jshint esversion: 6 */
/*

Let d(n) be defined as the sum of proper divisors of n (numbers less than n which divide evenly into n).
If d(a) = b and d(b) = a, where a ≠ b, then a and b are an amicable pair and each of a and b are called amicable numbers.

For example, the proper divisors of 220 are 1, 2, 4, 5, 10, 11, 20, 22, 44, 55 and 110; therefore d(220) = 284. The proper divisors of 284 are 1, 2, 4, 71 and 142; so d(284) = 220.

Evaluate the sum of all the amicable numbers under 10000.

*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Write the path to a valid input file ', (answer) => {
    
    answer = "C:/Projects/P/Project-Euler/Additional-Files/Problem022/p022_names.txt";
    let textFile = new XMLHttpRequest();

    textFile.open("GET", answer);
    let allText = textFile.responseText;
    console.log(allText);
    console.log("The total score of every name scrores in the file is :", "ANSWER");
    rl.close();
});

