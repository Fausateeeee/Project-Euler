/*jshint esversion: 6 */
/*

The nth term of the sequence of triangle numbers is given by, tn = ½n(n+1); so the first ten triangle numbers are:

1, 3, 6, 10, 15, 21, 28, 36, 45, 55, ...

By converting each letter in a word to a number corresponding to its alphabetical 
position and adding these values we form a word value. 
For example, the word value for SKY is 19 + 11 + 25 = 55 = t10. 
If the word value is a triangle number then we shall call the word a triangle word.

Using words.txt (right click and 'Save Link/Target As...'), 
a 16K text file containing nearly two-thousand common English words, how many are triangle words?

*/

const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Write the path to a valid input file  : ', (answer) => {

    let allText = fs.readFileSync(answer, 'utf8');

    //Remove  every " " from the file
    let regex = /"/g;
    allText = allText.replace(regex,"");

    //Split the names into an array
    let arrNames = allText.split(",");

    console.log("There are", "ANSWER", "triangle words in the linked file.");
    rl.close();


});

