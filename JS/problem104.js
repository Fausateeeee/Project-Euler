/*jshint esversion: 7 */
/*

    The Fibonacci sequence is defined by the recurrence relation:

        Fn = Fn−1 + Fn−2, where F1 = 1 and F2 = 1.

    It turns out that F541, which contains 113 digits, is the first Fibonacci number
    for which the last nine digits are 1-9 pandigital (contain all the digits 1 to 9, but not necessarily in order).
    And F2749, which contains 575 digits, is the first Fibonacci number for which the first nine digits are 1-9 pandigital.

    Given that Fk is the first Fibonacci number for which the first nine digits AND the last nine digits are 1-9 pandigital, find k.

*/

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    console.log("The first Fibonacci number for which its first nine and last nine digits are pandigital is at position", p104());
    rl.close();
});

function p104(){
    let fib = [BigInt(1), BigInt(1), 2];
    while(fib[2] < 2749){
        Fibonacci(fib);
    }
    let firstAndLast = false;
    do{
        Fibonacci(fib);
        let F = fib[1];
        F_last = (F%BigInt(1000000000)).toString();
        if (IsPandigital(F_last)){
            F_first = F.toString().substring(0, 9);
            firstAndLast = IsPandigital(F_first);
        }
        if(fib[2]%10000 == 0){
            console.log(fib[2]);
        }
    }
    while(!firstAndLast);
    return fib[2];
}

function IsPandigital(str){
    sorted_str = str.split("").sort();
    return sorted_str[0] == "1" && sorted_str[1] == "2" && sorted_str[2] == "3" &&
    sorted_str[3] == "4" && sorted_str[4] == "5" && sorted_str[5] == "6" &&
    sorted_str[6] == "7" && sorted_str[7] == "8" && sorted_str[8] == "9";

}

function Fibonacci(fib){
    fi = fib[0] + fib[1];
    fib[0] = fib[1];
    fib[1] = fi;
    fib[2]++;
}