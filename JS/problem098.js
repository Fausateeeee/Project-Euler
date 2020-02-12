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
const fs = require('fs');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    console.log("The sum of all the minimal product-sum numbers for 2 ≤ k ≤ 12000 is", 
    p98());
    rl.close();
});

function p98(){
    let wordDict = ReadFile();
    let anagramDict = GetAnagramPair(wordDict);
    let squares = GenerateSquares(anagramDict);
    return 0;
}

function ReadFile(){
    let allText = fs.readFileSync("../Additional-Files/p098_words.txt", 'utf8');

    let allWords = allText.split(",");

    let wordDict = {};
    for (let word of allWords){
        split = word.split("\"");
        wordObj = new Word(split[1]);
        if(wordObj.anagram in wordDict){
            wordDict[wordObj.anagram].push(wordObj);
        }
        else{
            wordDict[wordObj.anagram] = [wordObj];
        }
    }

    return wordDict;
}

function GetAnagramPair(wordDict){
    anagramPair = {};
    for (let key of Object.keys(wordDict)){
        if(wordDict[key].length > 1){
            anagramPair[key] = wordDict[key];
        }
    }

    return anagramPair;
}

function GenerateSquares(anagramDict){
    let SquareAnagrams = [];
    for (let key of Object.keys(anagramDict)){
        //console.log(anagramDict[key]);
        for (let i = 0; i < anagramDict[key].length - 1; ++i){
            for (let j = i+1; j < anagramDict[key].length; ++j){
                //console.log(anagramDict[key][i], anagramDict[key][j]);
                if(new SquareAnagram(anagramDict[key][i], anagramDict[key][j]).isSquareAnagram()){

                }
            }
        }

    }
}
class Word{
    constructor(word){
        this.word = word;
        this.uniqueletters = word.split("").unique();
        this.anagram = this.word.split("").sort().reduce((a,b) => {return a + b;});
    }
}

class SquareAnagram{
    constructor(firstword, secondword){
        this.w1 = firstword;
        this.w2 = secondword;
    }

    isSquareAnagram() {
        return false;
        
    }
}

Array.prototype.unique = function() {
    var a = this.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
};

