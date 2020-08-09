/*jshint esversion: 6 */
/*

All square roots are periodic when written as continued fractions and can be written in the form:

√N=a0 + (1 / (a1 + 1 / (a2 + 1 / (a3 +...

For example, let us consider √N:

√N =4 + √23 - 4 = 4 + (1 / (1 / √23 − 4)) = 4 + (1 / ((√23 + 4)/7)) = 4 + (1 / 1 + (√23 −3)/7)

If we continue we would get the following expansion:

√23 = 4 + 1 / ( 1 + 1 /( 3 + (1 / (1 + 1 / (8 +...

The process can be summarised as follows:

a0=4, 1 /(√23 − 4) = (√23 + 4)/7 = 1 + (√23 − 3)/7
a1=1, 7/(√23 − 3) = 7(√23 + 3)/14 = 3 + (√23 − 3)/2
a2=3, 2/(√23 − 3) = 2(√23 + 3)/14 = 1 + (√23 − 4)/7
a3=1, 7/(√23 − 4) = 7(√23 + 4)/7 = 8 + √23 −4
a4=8, 1/(√23 − 4) = (√23 + 4)/7 = 1 + (√23 − 3)/7
a5=1, 7/(√23 − 3) = 7(√23 + 3)/14 = 3 + (√23 − 3)/2
a6=3, 2/(√23 − 3) = 2(√23 + 3)/14 = 1 + (√23 − 4)/7
a7=1, 7/(√23 − 4) = 7(√23 + 4)/7 = 8 + √23 − 4

It can be seen that the sequence is repeating. For conciseness, we use the notation √23=[4;(1,3,1,8)], 
to indicate that the block (1,3,1,8) repeats indefinitely.

The first ten continued fraction representations of (irrational) square roots are:

√2 = [1;(2)], period = 1
√3=[1;(1,2)], period = 2
√5=[2;(4)], period = 1
√6=[2;(2,4)], period = 2
√7=[2;(1,1,1,4)], period = 4
√8=[2;(1,4)], period = 2
√10=[3;(6)], period = 1
√11=[3;(3,6)], period = 2
√12=[3;(2,6)], period = 2
√13=[3;(1,1,1,1,6)], period = 5

Exactly four continued fractions, for N≤13, have an odd period.

How many continued fractions for N≤10000 have an odd period?

*/
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    console.log("The number of continued fractions under 10 000 that have an odd period is",
    ComputePeriod(10000));
    rl.close();
});


function ComputePeriod(upperbound)
{
    let total = 0;
    for (let radical = 2; radical <= upperbound; ++radical)
    {
        let root = Math.sqrt(radical);
        if (Number.isInteger(root))
        {
            continue;
        }
        let int_part = Math.floor(root);
        let period = [int_part];
        let numerator = [1];
        let denominator = [-1*int_part];

        denominator.push((radical - Math.pow(denominator[0], 2))/numerator[0]);
        period.push(Math.floor((root - denominator[0])/denominator[1]));
        numerator.push(-1*denominator[0] - (period[1] * denominator[1]));
        let has_looped = {};
        has_looped[numerator[1]] = [denominator[1]];
        total += _ComputePeriod(period, numerator, denominator, radical, root, has_looped);
        console.log(period, radical);       
    }
    return total;
}

function _ComputePeriod(period, numerator, denominator, radical, root, has_looped)
{
    while (true)
    {
        let index = numerator.length - 1;
        denominator.push((radical - Math.pow(numerator[index], 2))/denominator[index]);
        period.push(Math.floor((root - numerator[index])/denominator[index + 1]));
        numerator.push((-1 * period[index + 1] * denominator[index + 1]) - numerator[index]);
    
        if (has_looped.hasOwnProperty([numerator[index + 1]]))
        {
            if (has_looped[numerator[index + 1]].indexOf(denominator[index + 1]) != -1)
            {
                return period.length%2;
            }
            else
            {
                has_looped[numerator[index + 1]].push(denominator[index + 1]);
            }
        }
        else
        {
            has_looped[numerator[index + 1]] = [denominator[index + 1]];
        }
    }

}