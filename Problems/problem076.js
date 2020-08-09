/*jshint esversion: 6 */
/*

It is possible to write five as a sum in exactly six different ways:

4 + 1
3 + 2
3 + 1 + 1
2 + 2 + 1
2 + 1 + 1 + 1
1 + 1 + 1 + 1 + 1

How many different ways can one hundred be written as a sum of at least two positive integers?

*/

/*
    Should check problem031
*/
const readline = require('readline');
const bigInt = require('big-integer');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter the number : ', (answer) => {

    const parsed = parseInt(answer);

    if (isNaN(parsed)) {
        console.log("Please, enter a natural number next time <3");
        rl.close();
    }

    else if (parsed < 1) {
        console.log("Enter a number greater than 0 next time");
        rl.close();
    }

    else
    {
        let sums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,
        21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,
        41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,
        61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,
        81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99];
        console.log("There are", sumCount(sums, sums.length, parsed), "ways to sum to ", parsed);
        rl.close();
    }



});

/*
    This function separate the problem into two parts

    First, we solve the problem
*/
function sumCount(sums, sumIndex, sumTotal)
{
    /*
        We are in this branch if sumTotal == sums[sumIndex], there is one way to solve this problem
    */
    if (sumTotal == 0)
    {
        return 1;
    }

    /*
        If sumTotal is less than 0, than we are in a branch where sums[sumIndex] was greater than the rest to count
    */
    if (sumTotal < 0)
    {
        return 0;
    }

    /*
        If sumIndex is 0 and sumTotal is not 0, we haven't finished counting this branch, so no solution is found here
    */
    if (sumIndex <= 0 && sumTotal >= 1)
    {
        return 0;
    }

    /*
        Count the solution including the sum at index sumIndex - 1 and then 
        count the solution excluding the sum at index sumIndex - 1
    */
    return sumCount(sums, sumIndex - 1, sumTotal) + sumCount(sums, sumIndex, sumTotal - sums[sumIndex - 1]);
}