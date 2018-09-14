/*jshint esversion: 6 */
/*

Using names.txt (right click and 'Save Link/Target As...'), a 46K text file containing over five-thousand first names, 
begin by sorting it into alphabetical order. Then working out the alphabetical value for each name, multiply this value by 
its alphabetical position in the list to obtain a name score.

For example, when the list is sorted into alphabetical order, COLIN, 
which is worth 3 + 15 + 12 + 9 + 14 = 53, is the 938th name in the list. So, COLIN would obtain a score of 938 × 53 = 49714.

What is the total of all the name scores in the file?


*/

const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const SCORE = {A : 1, B : 2, C : 3, D : 4, E : 5, F : 6, G : 7, H : 8, I : 9, J : 10, K : 11, L : 12, M : 13, N : 14, O : 15,
P : 16, Q : 17, R : 18, S : 19, T : 20, U : 21, V : 22, W : 23, X : 24, Y : 25, Z : 26};

rl.question('Write the path to a valid input file ', (answer) => {
    
    //Read the file
    let allText = fs.readFileSync(answer, 'utf8');
    //Remove  every " " from the file
    let regex = /"/g;
    allText = allText.replace(regex,"");

    //Split the names into an array
    let arrNames = allText.split(",");

    //Sort the array using default sort
    arrNames.sort();
    
    let arrScores = [];
    for (let i = 0; i < arrNames.length; i++)
    {
        let currentScore = 0;
        for(let letter of arrNames[i])
        {
            currentScore += SCORE[letter];
        }
        arrScores.push((i+1) * currentScore);
    }

    console.log("The total score of every name scrores in the file is :", arrScores.reduce((a,b) => {return a+b;}));
    rl.close();
});

