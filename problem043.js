/*jshint esversion: 6 */
/*

The number, 1406357289, is a 0 to 9 pandigital number because it is made up of each of the digits 0 to 9 in some order, but it also has a rather interesting sub-string divisibility property.

Let d1 be the 1st digit, d2 be the 2nd digit, and so on. In this way, we note the following:

    d2d3d4=406 is divisible by 2
    d3d4d5=063 is divisible by 3
    d4d5d6=635 is divisible by 5
    d5d6d7=357 is divisible by 7
    d6d7d8=572 is divisible by 11
    d7d8d9=728 is divisible by 13
    d8d9d10=289 is divisible by 17

Find the sum of all 0 to 9 pandigital numbers with this property.

*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {


    let digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    let allPermuations = [];

    computePermutation(digits, allPermuations, 0, digits.length - 1);

    allPermuations.sort();
    allPermuations = allPermuations.filter(elem => {return elem[0] != '0';});

    let solution = [];

    for (let number of allPermuations)
    {
        if (isSubstringDivisible(number))
        {
            	solution.push(parseInt(number));
        }
    }
    console.log("The sum of each numbers that are 0 to 9 pandigital and have the substring divisibilty property are",
    solution.reduce((a,b) => {return a+b;}));
    rl.close();


});

function computePermutation(arr, permutations, startingIndex, endIndex)
{
    if (startingIndex == endIndex)
    {
        permutations.push(arr.reduce((a,b) => {return a+b;}));
    }
    else
    {
        for (let i = startingIndex; i <= endIndex; i++)
        {
            swapArrayElements(arr, startingIndex, i);
            computePermutation(arr, permutations, startingIndex + 1, endIndex);
            swapArrayElements(arr, startingIndex, i);
        }
    }
}

function swapArrayElements(arr, index1, index2)
{
  let temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;  
}

function isSubstringDivisible(number)
{
    if (parseInt(number.substring(1,4))%2 != 0)
    {
        return false;
    }

    if (parseInt(number.substring(2,5))%3 != 0)
    {
        return false;
    }

    if (parseInt(number.substring(3,6))%5 != 0)
    {
        return false;
    }

    if (parseInt(number.substring(4,7))%7 != 0)
    {
        return false;
    }

    if (parseInt(number.substring(5,8))%11 != 0)
    {
        return false;
    }

    if (parseInt(number.substring(6,9))%13 != 0)
    {
        return false;
    }

    if (parseInt(number.substring(7))%17 != 0)
    {
        return false;
    }

    return true;
}
