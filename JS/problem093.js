/*jshint esversion: 6 */
/*

    By using each of the digits from the set, {1, 2, 3, 4}, exactly once, 
    and making use of the four arithmetic operations (+, −, *, /) and brackets/parentheses, 
    it is possible to form different positive integer targets.

    For example,

    8 = (4 * (1 + 3)) / 2

    14 = 4 * (3 + 1 / 2)

    19 = 4 * (2 + 3) − 1

    36 = 3 * 4 * (2 + 1)

    Note that concatenations of the digits, like 12 + 34, are not allowed.

    Using the set, {1, 2, 3, 4}, it is possible to obtain thirty-one different target numbers of which 36 is the maximum, 
    and each of the numbers 1 to 28 can be obtained before encountering the first non-expressible number.

    Find the set of four distinct digits, a < b < c < d, for which the longest set of consecutive positive integers, 
    1 to n, can be obtained, giving your answer as a string: abcd.

*/

/*
    Omitting the parentheses, there are 4^3 = 64 combinations possible of arithmetic operations.
    From 9 numbers, we choose 4 and have 126 sets to check.

    The first thing to notice is that if we only have + or - symbols, the parentheses have to effects on the result.
    That means that 8 combinations are straight foward.

    When there is only * or / symbols, the parentheses have no effects on the result. 
    8 more combinations are straight foward.

    When there are one * or / symbol,
*/
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    console.log("The set of four distinct digits, a < b < c < d, for which the longest set of consecutive positive integers, 1 to n, can be obtained", 
    mainLoop());
    rl.close();
});

function mainLoop(){
    let str;
    let length = 0;
    for(let a = 0; a < 6; ++a){
        for(let b = 1; b < 7; ++b){
            for(let c = 2; c < 8; ++c){       
                for(let d = 3; d < 9; ++d){
                    let r = makeEachPermutation(a,b,c,d);
                    if (r > length){
                        length = r;
                        str = a.toString() + b.toString() + c.toString() + d.toString();
                    }
                }
            }
        }
    }

    return str;
}
function makeEachPermutation(a,b,c,d){
    possibleNumbers = [];

    callEachCombinations(a,b,c,d,possibleNumbers);
    callEachCombinations(a,b,d,c,possibleNumbers);
    callEachCombinations(a,c,b,d,possibleNumbers);
    callEachCombinations(a,c,d,b,possibleNumbers);
    callEachCombinations(a,d,b,c,possibleNumbers);
    callEachCombinations(a,d,c,b,possibleNumbers);

    callEachCombinations(b,a,c,d,possibleNumbers);
    callEachCombinations(b,a,d,c,possibleNumbers);
    callEachCombinations(b,c,a,d,possibleNumbers);
    callEachCombinations(b,c,d,a,possibleNumbers);
    callEachCombinations(b,d,a,c,possibleNumbers);
    callEachCombinations(b,d,c,a,possibleNumbers);

    callEachCombinations(c,a,b,d,possibleNumbers);
    callEachCombinations(c,a,d,b,possibleNumbers);
    callEachCombinations(c,b,a,d,possibleNumbers);
    callEachCombinations(c,b,d,a,possibleNumbers);
    callEachCombinations(c,d,a,b,possibleNumbers);
    callEachCombinations(c,d,b,a,possibleNumbers);

    callEachCombinations(d,a,b,c,possibleNumbers);
    callEachCombinations(d,a,c,b,possibleNumbers);
    callEachCombinations(d,b,a,c,possibleNumbers);
    callEachCombinations(d,b,c,a,possibleNumbers);
    callEachCombinations(d,c,a,b,possibleNumbers);
    callEachCombinations(d,c,b,a,possibleNumbers);

    return GetChainLength(possibleNumbers);

}

function callEachCombinations(a,b,c,d, possibleNumbers){
    trivialCombinations(a,b,c,d, possibleNumbers);
    OneOperatorParenthesesLeftCase(a,b,c,d, possibleNumbers);
    OneOperatorParenthesesMiddleCase(a,b,c,d, possibleNumbers);
    TwoOperatorCase(a,b,c,d,possibleNumbers);
}

function trivialCombinations(a,b,c,d, possibleNumbers){
    r = a + b + c + d;
    possibleNumbers[r] = r;

    r = a + b + c - d;
    if (r > 0){
        possibleNumbers[r] = r;
    }

    r = a + b - c - d;
    if (r > 0){
        possibleNumbers[r] = r;
    }

    r = a - b + c + d;
    if (r > 0){
        possibleNumbers[r] = r;
    }

    r = a - b + c - d;
    if (r > 0){
        possibleNumbers[r] = r;
    }

    r = a - b - c + d;
    if (r > 0){
        possibleNumbers[r] = r;
    }

    r = a - b - c - d;
    if (r > 0){
        possibleNumbers[r] = r;
    }

    r = a * b * c * d;
    possibleNumbers[r] = r;

    r = a * b * (c / d);
    if (Number.isInteger(r)){
        possibleNumbers[r] = r;
    }

    r = a * (b / c) * d;
    if (Number.isInteger(r)){
        possibleNumbers[r] = r;
    }

    r = a * ((b / c) / d);
    if (Number.isInteger(r)){
        possibleNumbers[r] = r;
    }

    r = (a / b) * c * d;
    if (Number.isInteger(r)){
        possibleNumbers[r] = r;
    }

    r = (a / b) * (c / d);
    if (Number.isInteger(r)){
        possibleNumbers[r] = r;
    }

    r = ((a / b) / c) * d;
    if (Number.isInteger(r)){
        possibleNumbers[r] = r;
    }

    r = ((a / b) / c) / d;
    if (Number.isInteger(r)){
        possibleNumbers[r] = r;
    }
}

function OneOperatorParenthesesLeftCase(a,b,c,d, possibleNumbers){
    r = a * (b + c) + d;
    possibleNumbers[r] = r; 
    r = a * (b + c + d);
    possibleNumbers[r] = r;

    r = a * (b + c) - d;
    if (r > 0){
        possibleNumbers[r] = r; 
    }

    r = a * (b + c - d);
    if (r > 0){
        possibleNumbers[r] = r; 
    }

    r = a * (b - c) + d;
    if (r > 0){
        possibleNumbers[r] = r; 
    }

    r = a * (b - c + d);
    if (r > 0){
        possibleNumbers[r] = r;  
    }

    r = a * (b - c) - d;
    if (r > 0){
        possibleNumbers[r] = r;  
    }

    r = a * (b - c - d);
    if (r > 0){
        possibleNumbers[r] = r;  
    }

    r = (a / (b + c)) + d;
    if (Number.isInteger(r)){
        possibleNumbers[r] = r; 
    }

    r = a / (b + c + d);
    if (Number.isInteger(r)){
        possibleNumbers[r] = r; 
    }

    r = (a / (b + c)) - d;
    if (r > 0 && Number.isInteger(r)){
        possibleNumbers[r] = r; 
    }

    r = a / (b + c - d);
    if (r > 0 && Number.isInteger(r)){
        possibleNumbers[r] = r; 
    }

    r = (a / (b - c)) + d;
    if (r > 0 && Number.isInteger(r)){
        possibleNumbers[r] = r; 
    }

    r = a / (b - c + d);
    if (r > 0 && Number.isInteger(r)){
        possibleNumbers[r] = r; 
    }

    r = (a / (b - c)) - d;
    if (r > 0 && Number.isInteger(r)){
        possibleNumbers[r] = r; 
    }

    r = a / (b - c - d);
    if (r > 0 && Number.isInteger(r)){
        possibleNumbers[r] = r; 
    }
}

function OneOperatorParenthesesMiddleCase(a,b,c,d, possibleNumbers){
    r = a + (b * c) + d;
    possibleNumbers[r] = r;

    r = ((a + b) * c) + d;
    possibleNumbers[r] = r;

    r = ((a + b) * (c + d));
    possibleNumbers[r] = r;

    r = a + ((b * c) + d);
    possibleNumbers[r] = r;


    r = a + (b * c) - d;
    if(r > 0){
        possibleNumbers[r] = r;
    }
    r = ((a + b) * c) - d;
    if(r > 0){
        possibleNumbers[r] = r;
    }
    r = ((a + b) * (c - d));
    if(r > 0){
        possibleNumbers[r] = r;
    }
    r = a + ((b * c) - d);
    if(r > 0){
        possibleNumbers[r] = r;
    }

    r = a - (b * c) + d;
    if(r > 0){
        possibleNumbers[r] = r;
    }
    r = ((a - b) * c) + d;
    if(r > 0){
        possibleNumbers[r] = r;
    }
    r = ((a - b) * (c + d));
    if(r > 0){
        possibleNumbers[r] = r;
    }
    r = a - ((b * c) + d);
    if(r > 0){
        possibleNumbers[r] = r;
    }

    r = a - (b * c) - d;
    if(r > 0){
        possibleNumbers[r] = r;
    }
    r = ((a - b) * c) - d;
    if(r > 0){
        possibleNumbers[r] = r;
    }
    r = ((a - b) * (c - d));
    if(r > 0){
        possibleNumbers[r] = r;
    }
    r = a - ((b * c) - d);
    if(r > 0){
        possibleNumbers[r] = r;
    }

    r = a + (b / c) + d;
    if(Number.isInteger(r)){
        possibleNumbers[r] = r;
    }
    r = ((a + b) / c) + d;
    if(Number.isInteger(r)){
        possibleNumbers[r] = r;
    }
    r = ((a + b) / (c + d));
    if(Number.isInteger(r)){
        possibleNumbers[r] = r;
    }
    r = a + ((b / c) + d);
    if(Number.isInteger(r)){
        possibleNumbers[r] = r;
    }

    r = a + (b / c) - d;
    if (r > 0 && Number.isInteger(r)){
        possibleNumbers[r] = r; 
    }
    r = ((a + b) / c) - d;
    if (r > 0 && Number.isInteger(r)){
        possibleNumbers[r] = r; 
    }
    r = ((a + b) / (c - d));
    if (r > 0 && Number.isInteger(r)){
        possibleNumbers[r] = r; 
    }
    r = a + ((b / c) - d);
    if (r > 0 && Number.isInteger(r)){
        possibleNumbers[r] = r; 
    }

    r = a - (b / c) + d;
    if (r > 0 && Number.isInteger(r)){
        possibleNumbers[r] = r; 
    }
    r = ((a - b) / c) + d;
    if (r > 0 && Number.isInteger(r)){
        possibleNumbers[r] = r; 
    }
    r = ((a - b) / (c + d));
    if (r > 0 && Number.isInteger(r)){
        possibleNumbers[r] = r; 
    }
    r = a - ((b / c) + d);
    if (r > 0 && Number.isInteger(r)){
        possibleNumbers[r] = r; 
    }

    r = a - (b / c) - d;
    if (r > 0 && Number.isInteger(r)){
        possibleNumbers[r] = r; 
    }
    r = ((a - b) / c) - d;
    if (r > 0 && Number.isInteger(r)){
        possibleNumbers[r] = r; 
    }
    r = ((a - b) / (c - d));
    if (r > 0 && Number.isInteger(r)){
        possibleNumbers[r] = r; 
    }
    r = a - ((b / c) - d);
    if (r > 0 && Number.isInteger(r)){
        possibleNumbers[r] = r; 
    }
}

function TwoOperatorCase(a,b,c,d, possibleNumbers){
    r = (a * b * c) + d;
    possibleNumbers[r] = r;

    r = (a * b * c) - d;
    if (r > 0){
        possibleNumbers[r] = r;
    }

    r = (a * (b / c)) + d;
    if (Number.isInteger(r)){
        possibleNumbers[r] = r;
    }
    r = (a * (b / c)) - d;
    if (Number.isInteger(r) && r > 0){
        possibleNumbers[r] = r;
    }

    r = ((a / b) * c) + d;
    if (Number.isInteger(r) && r > 0){
        possibleNumbers[r] = r;
    }
    r = ((a / b) * c) - d;
    if (Number.isInteger(r) && r > 0){
        possibleNumbers[r] = r;
    }

    r = ((a / b) / c) + d;
    if (Number.isInteger(r) && r > 0){
        possibleNumbers[r] = r;
    }
    r = ((a / b) / c) - d;
    if (Number.isInteger(r) && r > 0){
        possibleNumbers[r] = r;
    }


    r = (a * b * (c + d));
    if (Number.isInteger(r) && r > 0){
        possibleNumbers[r] = r;
    }
    r = (a * b * (c - d));
    if (Number.isInteger(r) && r > 0){
        possibleNumbers[r] = r;
    }

    r = (a * (b / (c + d)));
    if (Number.isInteger(r) && r > 0){
        possibleNumbers[r] = r;
    }
    r = (a * (b / (c - d)));
    if (Number.isInteger(r) && r > 0){
        possibleNumbers[r] = r;
    }

    r = ((a / b) * (c + d));
    if (Number.isInteger(r) && r > 0){
        possibleNumbers[r] = r;
    }
    r = ((a / b) * (c - d));
    if (Number.isInteger(r) && r > 0){
        possibleNumbers[r] = r;
    }

    r = ((a / b) / (c + d));
    if (Number.isInteger(r) && r > 0){
        possibleNumbers[r] = r;
    }
    r = ((a / b) / (c - d));
    if (Number.isInteger(r) && r > 0){
        possibleNumbers[r] = r;
    }


    r = (a * ((b * c) + d));
    if (Number.isInteger(r) && r > 0){
        possibleNumbers[r] = r;
    }
    r = (a * ((b * c) - d));
    if (Number.isInteger(r) && r > 0){
        possibleNumbers[r] = r;
    }

    r = a * ((b / c) + d);
    if (Number.isInteger(r) && r > 0){
        possibleNumbers[r] = r;
    }
    r = a * ((b / c) - d);
    if (Number.isInteger(r) && r > 0){
        possibleNumbers[r] = r;
    }

    r = a / ((b * c) + d);
    if (Number.isInteger(r) && r > 0){
        possibleNumbers[r] = r;
    }
    r = a / ((b * c) - d);
    if (Number.isInteger(r) && r > 0){
        possibleNumbers[r] = r;
    }

    r = a / ((b / c) + d);
    if (Number.isInteger(r) && r > 0){
        possibleNumbers[r] = r;
    }
    r = a / ((b / c) - d);
    if (Number.isInteger(r) && r > 0){
        possibleNumbers[r] = r;
    }

    r = ((a / b) * (c + d));
    if (Number.isInteger(r) && r > 0){
        possibleNumbers[r] = r;
    }
    r = (a / b) * (c - d);
    if (Number.isInteger(r) && r > 0){
        possibleNumbers[r] = r;
    }

    r = (a / b) / (c + d);
    if (Number.isInteger(r) && r > 0){
        possibleNumbers[r] = r;
    }
    r = (a / b) / (c - d);
    if (Number.isInteger(r) && r > 0){
        possibleNumbers[r] = r;
    }
}

function GetChainLength(possibleNumbers){
    let i = 1;
    while (possibleNumbers[i] == i){
        ++i;
    }
    return i - 1;
}