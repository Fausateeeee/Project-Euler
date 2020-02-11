/*jshint esversion: 6 */
/*

    The proper divisors of a number are all the divisors excluding the number itself. 
    For example, the proper divisors of 28 are 1, 2, 4, 7, and 14. 
    As the sum of these divisors is equal to 28, we call it a perfect number.

    Interestingly the sum of the proper divisors of 220 is 284 and the sum of the proper divisors of 284 is 220, 
    forming a chain of two numbers. For this reason, 220 and 284 are called an amicable pair.

    Perhaps less well known are longer chains. 
    For example, starting with 12496, we form a chain of five numbers:

    12496 → 14288 → 15472 → 14536 → 14264 (→ 12496 → ...)

    Since this chain returns to its starting point, it is called an amicable chain.

    Find the smallest member of the longest amicable chain with no element exceeding one million.

*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    console.log("The smallest member of the longest amicable chain with no element exceeding one million is",
    p95(1000000));
    rl.close();
});

function p95(upperbound){
    let dict = {};
    for (let i = 1; i <= upperbound; i++){

        dict[i] = {'next':FindProperDivisorSum(i), chain:false};
    }
    return FindChainLength(dict, upperbound);
}
function FindProperDivisorSum(nbr){
    let sum = 1;
    for(let i = 2; i <= Math.sqrt(nbr); i++){
        if (nbr%i == 0){
            if(nbr/i == i){
                sum += i;
            }
            else{
                sum += i + nbr/i;
            }
        }
    }
    return sum;
}
function FindChainLength(dict, upperbound){
    let max = 0;
    let nbr = 0;
    for(let start of Object.keys(dict)){
        chain_flag = false;

        let next = dict[start].next;
        let numberInChain = [];
        let chain = 1;
        if(next > upperbound || next == start){
            next = 1;
        }
        while(next != 1){
            numberInChain.push(next);
            next = dict[next].next;

            chain++;
            if (next > upperbound){
                next = 1;
            }
            else if(next == start){
                next = 1;
                chain_flag = true;
            }
            else if (numberInChain.includes(next) || dict[next].chain){
                next = 1;
            }

       }
       if (chain_flag){
           if (chain > max){
               max = chain;
               nbr = start;
               dict[start].chain = true;
           }
       }

    }
    console.log(dict[nbr]);
    return nbr;
}