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




    
    The previous methods doesn't seem to yield the solution. I decided to generate each
    combination of 6 number on the die and check if this is a valid solution.
  
*/

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {
    let dices = LexicographicCombination();
    console.log("There are", FindValidDiceSolution(),
    "distinct arrangements of the two cubes that allow for all of the square numbers to be displayed.");
    rl.close();
});

function FindValidDiceSolution(){
    let combination = LexicographicCombination()
    let total = 0;

    for (let dice1 = 0; dice1 < combination.length - 1; dice1++){
        for (let dice2 = dice1 + 1; dice2 < combination.length; dice2++){
            let found = [false, false, false, false, false, false, false, false, false];
            for (let n of combination[dice1]){
                let num1 = n.toString();
                for (let m of combination[dice2]){
                    let num2 = m.toString();
                    FindCombination(found, num1, num2);         
                }
            }
            if (!(found.includes(false))){
                total++;
            }
            // else{
            //     console.log(found);
            // }
        }
    }
    return total;
}

function FindCombination(found, num1, num2){
    let cubes = ["01", "04", "09", "16", "25", "36", "49", "64", "81"];
    let comp1 = num1 + num2;
    let comp2 = num2 + num1;
    
    if (cubes.includes(comp1)){
        found[cubes.indexOf(comp1)] = true;
    }
    if (cubes.includes(comp2)){
        found[cubes.indexOf(comp2)] = true;
    }

    if (num1 == "6"){
        comp1 = "9" + num2;
        comp2 = num2 + "9";

        if (cubes.includes(comp1)){
            found[cubes.indexOf(comp1)] = true;
        }
        if (cubes.includes(comp2)){
            found[cubes.indexOf(comp2)] = true;
        }
    }

    if (num1 == "9"){
        comp1 = "6" + num2;
        comp2 = num2 + "6";

        if (cubes.includes(comp1)){
            found[cubes.indexOf(comp1)] = true;
        }
        if (cubes.includes(comp2)){
            found[cubes.indexOf(comp2)] = true;
        }
    }

    if (num2 == "6"){
        comp1 = "9" + num1;
        comp2 = num1 + "9";

        if (cubes.includes(comp1)){
            found[cubes.indexOf(comp1)] = true;
        }
        if (cubes.includes(comp2)){
            found[cubes.indexOf(comp2)] = true;
        }
    }

    if (num2 == "9"){
        comp1 = "6" + num1;
        comp2 = num1 + "6";

        if (cubes.includes(comp1)){
            found[cubes.indexOf(comp1)] = true;
        }
        if (cubes.includes(comp2)){
            found[cubes.indexOf(comp2)] = true;
        }
    }
}

function LexicographicCombination(){
    let dices = [];
    for (let f_6 = 5; f_6 < 10; f_6++){
        for (let f_5 = 4; f_5 < f_6; f_5++){
            for (let f_4 = 3; f_4 < f_5; f_4++){
                for (let f_3 = 2; f_3 < f_4; f_3++){
                    for (let f_2 = 1; f_2 < f_3; f_2++){
                        for (let f_1 = 0; f_1 < f_2; f_1++){
                            dices.push([f_1, f_2, f_3, f_4, f_5, f_6]);
                        }
                    }
                }
            }
        }
    }

    return dices;
}