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

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// rl.question('Press enter to continue : ', (answer) => {

//     console.log("The lowest sum for a set of five primes for which any two primes concatenate to produce another prime is",
//     "ANSWER");
//     rl.close();
// });

ComputePeriod(100);
function ComputePeriod(upperbound)
{
    for (let radical = 23; radical <= upperbound; ++radical)
    {
        let root = Math.sqrt(radical);
        if (Number.isInteger(root))
        {
            continue;
        }
        let int_part = Math.floor(root);

        _ComputePeriod([int_part], [1], [-1*int_part], radical, root, []);
        

    }
}

function _ComputePeriod(period, numerator, denominator, radical, root, has_looped)
{
    let index = numerator.length - 1;
    denominator.push((radical - Math.pow(denominator[index], 2))/numerator[index]);
    period.push(Math.floor((root - denominator[index])/denominator[index + 1]));
    numerator.push(-1*denominator[index] - (period[index + 1] * denominator[index + 1]));
    let loop = [numerator[index + 1], denominator[index + 1]];
    if (has_looped.indexOf(loop) != -1)
    {
        return period;
    }
    else
    {
        has_looped.push(loop);
        _ComputePeriod(period, numerator, denominator, radical, root, has_looped);
    }
}