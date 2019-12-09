/*jshint esversion: 6 */
/*

    By replacing each of the letters in the word CARE with 1, 2, 9, and 6 respectively, 
    we form a square number: 1296 = 36^2. What is remarkable is that, 
    by using the same digital substitutions, the anagram, RACE, also forms a square number: 9216 = 96^2. 
    We shall call CARE (and RACE) a square anagram word pair and specify further that leading zeroes are not permitted, 
    neither may a different letter have the same digital value as another letter.

    Using words.txt (right click and 'Save Link/Target As...'), 
    a 16K text file containing nearly two-thousand common English words, 
    find all the square anagram word pairs (a palindromic word is NOT considered to be an anagram of itself).

    What is the largest square number formed by any member of such a pair?

    NOTE: All anagrams formed must be contained in the given text file.

*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    console.log("The sum of all the minimal product-sum numbers for 2 ≤ k ≤ 12000 is", 
    "ANSWER");
    rl.close();
});

