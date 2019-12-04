/*jshint esversion: 6 */
/*

    Each of the six faces on a cube has a different digit (0 to 9) written on it; 
    the same is done to a second cube. By placing the two cubes side-by-side in different positions 
    we can form a variety of 2-digit numbers.

    For example, the square number 64 could be formed:

    In fact, by carefully choosing the digits on both cubes it is possible to display 
    all of the square numbers below one-hundred: 01, 04, 09, 16, 25, 36, 49, 64, and 81.

    For example, one way this can be achieved is by placing {0, 5, 6, 7, 8, 9} on one cube
    and {1, 2, 3, 4, 8, 9} on the other cube.

    However, for this problem we shall allow the 6 or 9 to be turned upside-down 
    so that an arrangement like {0, 5, 6, 7, 8, 9} and {1, 2, 3, 4, 6, 7} allows for 
    all nine square numbers to be displayed; otherwise it would be impossible to obtain 09.

    In determining a distinct arrangement we are interested in the digits on each cube, not the order.

    {1, 2, 3, 4, 5, 6} is equivalent to {3, 6, 4, 1, 2, 5}

    {1, 2, 3, 4, 5, 6} is distinct from {1, 2, 3, 4, 5, 9}

    But because we are allowing 6 and 9 to be reversed, 
    the two distinct sets in the last example both represent the extended set 
    {1, 2, 3, 4, 5, 6, 9} for the purpose of forming 2-digit numbers.

    How many distinct arrangements of the two cubes allow for all of the square numbers to be displayed?

*/

/*

    Basic deduction gives us:

    7 is the only number that is not mandatory
    
    1)0 and {1, 4, (6,9)} must be on two different die at least
    2)1 and {8, (6,9)} must be on two different die at least
    3)2 and 5 must be on two different die at least
    4)3 and (6,9) must be on two different die at least
    5)4 and (6,9) must be on two different die at least

    Combining 1) and 2), we get that (6,9) must be present on each die
    So far, we have the minimum set {(6,9), *, *, *, *, *} {(6,9), *, * , *, *, *}

    Without loss of generality, place 0 in the first set, we get
    {(6,9), 0, 8, *, *, *} {(6,9), 1, 4, *, *, *}

    We have two last choice to add to respect the rules and is the fact that [2,5] must be on 2 seperate die and
    3 must be somewhere on any of the dice
    {(6,9), 0, 8, [2,5], [3,*], *} {(6,9), 1, 4, [2,5], [3,*] , *}

    We then have 4 flexible slots and for every combination, we have a total of 8 when we consider every swap of 
    6 and 9 and the swapping between dice of 2 and 5.

  
*/

const readline = require('readline');
const fs = require('fs');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    console.log("There are", GenerateDice(), 
    "distinct arrangements of the two cubes that allow for all of the square numbers to be displayed.");
    rl.close();
});

function GenerateDice()
{
    let die1 = ['6', '0', '8', '2', '3', '*'];
    let die2 = ['6', '1', '4', '5', '*', '*'];
    let mem = [];

    for (let i = 0; i < 10; ++i)
    {
        for (let j = 0; j < 10; ++j)
        {
            for (let k = 0; k < 10; ++k)
            {
                die1[5] = i.toString();
                die2[4] = j.toString();
                die2[5] = k.toString();
                AddToMemory(die1, die2, mem);
                GenerateOtherPermutation(die1, die2, mem);
            }
        }
    }
    //fs.writeFileSync("keys.txt", Object.keys(dict).toString());
    return mem.length;
}

function GenerateOtherPermutation(die1, die2, mem)
{
    for(let i = 0; i < 4; i++)
    {
        SwapPosition(die1, die2, 5);
        AddToMemory(die1, die2, mem);
        
        SwapPosition(die1, die2, 5);
        SwapPosition(die1, die2, 4);
        AddToMemory(die1, die2, mem);
    
        SwapPosition(die1, die2, 5);
        AddToMemory(die1, die2, mem);
    
        SwapPosition(die1, die2, 4);
        SwapPosition(die1, die2, 5);
        SwapPosition(die1, die2, 0);
        AddToMemory(die1, die2, mem);
    }
}

function SwapPosition(die1, die2, position)
{
    if (position == 0)
    {
        if (die1[0] == die2[0])
        {
            if (die1[0] == '6')
            {
                die1[0] = '9';
            }
            else
            {
                die1[0] = '6';
            }
        }
        else
        {
            if (die1[0] == '6')
            {
                die2[0] = '6';
            }
            else
            {
                die2[0] = '9';
            }
        }
    }
    else
    {
        let temp = die1[position];
        die1[position] = die2[position];
        die2[position] = temp;
    }

}

function AddToMemory(die1, die2, mem)
{
    let extended_set1 = [...die1].sort();
    let extended_set2 = [...die2].sort();
    let key1 = extended_set1.reduce((a,b) => {return a + b;}) + extended_set2.reduce((a,b) => {return a + b;});
    let key2 = extended_set2.reduce((a,b) => {return a + b;}) + extended_set1.reduce((a,b) => {return a + b;});

    if(mem.includes(key1) || mem.includes(key2))
    {
    }
    else{
        mem.push(key1);
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