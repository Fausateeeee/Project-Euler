/*jshint esversion: 6 */
/*

The cube, 41063625 (345^3), can be permuted to produce two other cubes: 56623104 (384^3) and 66430125 (405^3). 
In fact, 41063625 is the smallest cube which has exactly three permutations of its digits which are also cube.

Find the smallest cube for which exactly five permutations of its digits are cube.

*/
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    console.log("The smallest cuve for which there is exactly five permutations is",
    findCubicPermutation());
    rl.close();
});

function findCubicPermutation()
{
    base = 346;
    while(true)
    {
        cube = Math.pow(base, 3);
        arrCube = cube.toString().split("");
        cubePerms = [];
        computePermutation(arrCube,cubePerms,0, arrCube.length - 1);

        if (totalCubePerm(cubePerms) == 5)
        {
            return cube;
        }
        ++cube;
    }
}

function totalCubePerm(cubePerms)
{
    let total = 0;
    for (let perm of cubePerms)
    {
        let p_cube = parseInt(perm);
        let root = Math.round(Math.pow(p_cube,1/3));
        if (Math.pow(root,3) == p_cube)
        {
            ++total;
        }
    }
    return total;
}

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