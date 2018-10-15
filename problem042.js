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

const SCORE = {A : 1, B : 2, C : 3, D : 4, E : 5, F : 6, G : 7, H : 8, I : 9, J : 10, K : 11, L : 12, M : 13, N : 14, O : 15,
    P : 16, Q : 17, R : 18, S : 19, T : 20, U : 21, V : 22, W : 23, X : 24, Y : 25, Z : 26};

rl.question('Write the path to a valid input file  : ', (answer) => {

    let allText = fs.readFileSync(answer, 'utf8');

    //Remove  every " " from the file
    let regex = /"/g;
    allText = allText.replace(regex,"");

    //Split the names into an array
    let arrNames = allText.split(",");

    let arrScores = ComputeScore(arrNames);

    let arrTriangular = ComputeTriangular();

    let count = 0;
    for (let score in arrScores)
    {
        if (arrTriangular.indexOf(score) != - 1)
        {
            count++;
        }
    }
    console.log("There are", count, "triangle words in the linked file.");
    rl.close();

});

function ComputeScore(arrNames)
{
    let arrScores = [];
    for (let word of arrNames)
    {
        let currentScore = 0;
        for(let letter of word)
        {
            currentScore += SCORE[letter];
        }
        arrScores.push(currentScore);
    }

    return arrScores;
}

//Longest common word is 45 letters, so only need to compute triangular number up to 1170
function ComputeTriangular()
{
    let t_n = 1;
    let arrTriangular = [1];
    for (let n = 2; t_n < 1170; n++)
    {
        t_n = n*(n+1)/2;
        arrTriangular.push(t_n);
    }

    return arrTriangular;
}
