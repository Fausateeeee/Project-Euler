/*jshint esversion: 7 */
/*

    If a box contains twenty-one coloured discs, composed of fifteen blue discs and six red discs, 
    and two discs were taken at random, it can be seen that the probability of taking two blue discs, 
    P(BB) = (15/21)×(14/20) = 1/2.

    The next such arrangement, for which there is exactly 50% chance of taking two blue discs at random, 
    is a box containing eighty-five blue discs and thirty-five red discs.

    By finding the first arrangement to contain over 10^12 = 1,000,000,000,000 discs in total, 
    determine the number of blue discs that the box would contain.

*/

/*

    Suppose k is the number of blue discs and n the total number of discs.
    We have k(k-1)/n(n-1) = 0.5 iff k(k-1) = n(n-1)/2. The last part is a constant. 
    We have the quadratic equation k^2 - k - p where p is (n(n-1)/2).
    This quadratic equation has roots at 1/2(1 - sqrt(4p + 1)) and 1/2(1 + sqrt(4p + 1)).
    We need to find the first number over 10^12 where both roots are integers

*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    console.log("The sum of all the minimal product-sum numbers for 2 ≤ k ≤ 12000 is", 
    p100(Math.pow(10,12)));
    rl.close();
});

function p100(lowerbound){
    let i = lowerbound + 1;
    while(!root(i)){
        i++;
        if(i%1000 == 0){
            console.log(i);
        }
    }

    return HeronsMethod(i);
}
function HeronsMethod(potentialsquare){
    let x_0 = potentialsquare/BigInt(2);
    let x_1 = (x_0 + potentialsquare/x_0)/BigInt(2);
    let potentialroot = [x_0];
    while(!potentialroot.includes(x_1)){
        // console.log(potentialsquare, x_0, x_1, potentialroot);
        x_0 = x_1;
        x_1  = (x_0 + potentialsquare/x_0)/BigInt(2);
        potentialroot.push(x_0);
    }
    if (x_1**BigInt(2) == potentialsquare){
        return x_1;
    }
    return false;
}
function root(nbr){    
    let p = (BigInt(nbr) * BigInt(nbr - 1) * BigInt(2)) + BigInt(1);
    return HeronsMethod(p);
}