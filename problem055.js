/*jshint esversion: 6 */
/*

If we take 47, reverse and add, 47 + 74 = 121, which is palindromic.

Not all numbers produce palindromes so quickly. For example,

349 + 943 = 1292,
1292 + 2921 = 4213
4213 + 3124 = 7337

That is, 349 took three iterations to arrive at a palindrome.

Although no one has proved it yet, it is thought that some numbers, like 196, never produce a palindrome. 
A number that never forms a palindrome through the reverse and add process is called a Lychrel number. 
Due to the theoretical nature of these numbers, and for the purpose of this problem, 
we shall assume that a number is Lychrel until proven otherwise. 
In addition you are given that for every number below ten-thousand, it will either 
(i) become a palindrome in less than fifty iterations, or, 
(ii) no one, with all the computing power that exists, has managed so far to map it to a palindrome. 
In fact, 10677 is the first number to be shown to require over fifty iterations before producing a palindrome: 
4668731596684224866951378664 (53 iterations, 28-digits).

Surprisingly, there are palindromic numbers that are themselves Lychrel numbers; the first example is 4994.

How many Lychrel numbers are there below ten-thousand?

NOTE: Wording was modified slightly on 24 April 2007 to emphasise the theoretical nature of Lychrel numbers.

*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter a positive integer : ', (answer) => {

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
        let LychrelCount = 0;
        for(let i = 0; i < parsed; i++)
        {
            LychrelCount += ComputeLychrel(i);
        }
        console.log("There are", LychrelCount, "theoritical Lychrels number's below", parsed);
        rl.close();
    }

});

function ComputeLychrel(number)
{
    for (let i = 0; i < 50; ++i)
    {
        number += reverseNumber(number);
        if (isPalindrome(number))
        {
            return 0;
        }

    }
    return 1;
}

function isPalindrome(number)
{
    let arr = number.toString().split("");

    let j = arr.length - 1;

    for (let i = 0; i < j; i++, j--)
    {
        if (arr[i] != arr[j])
        {
            return false;
        }
    }
    return true;
}

function reverseNumber(number)
{
    let arr = number.toString().split("");
    arr.reverse();
    return Number.parseInt(arr.join(""));
}