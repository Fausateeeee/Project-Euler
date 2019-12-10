/*jshint esversion: 6 */
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
    p100(Math.pow(10,12)), p100(22));
    rl.close();
});

function p100(lowerbound){
    let i = lowerbound;
    while(!root(i)){
        i++;
    }
    let p = i*(i - 1)/2;
    console.log(i, p, Math.sqrt(4*p + 1));
    return (1 + Math.sqrt(4*p + 1))/2;
}

function root(nbr){
    let p = nbr*(nbr - 1)/2;
    return Number.isInteger(Math.sqrt(4*p + 1));
}