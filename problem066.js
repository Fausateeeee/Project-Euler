/*jshint esversion: 6 */
/*

Consider quadratic Diophantine equations of the form:

x^2 – Dy^2 = 1

For example, when D=13, the minimal solution in x is 649^2 – 13×180^2 = 1.

It can be assumed that there are no solutions in positive integers when D is square.

By finding minimal solutions in x for D = {2, 3, 5, 6, 7}, we obtain the following:

3^2 – 2×2^2 = 1
2^2 – 3×1^2 = 1
9^2 – 5×4^2 = 1
5^2 – 6×2^2 = 1
8^2 – 7×3^2 = 1

Hence, by considering minimal solutions in x for D ≤ 7, the largest x is obtained when D=5.

Find the value of D ≤ 1000 in minimal solutions of x for which the largest value of x is obtained.

*/

/*

We are trying to solve Pell's equation
https://en.wikipedia.org/wiki/Pell%27s_equation#Solutions

*/
const readline = require('readline');
const bigInt = require('big-integer');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


rl.question('Press enter to continue : ', (answer) => {

    console.log("The value of D where x is the largest for D ≤ 1000 is", Diophantine(1000)[1]);
    rl.close();
});

function Diophantine(upperBound)
{
    let max = [bigInt(0),0];
    for (let constant = 2; constant <= upperBound; ++constant)
    {
        if (Number.isInteger(Math.sqrt(constant)))
        {
            continue;
        }

        let period = ComputePeriod(constant);

        let numerator = [bigInt(0),bigInt(1)];
        let denominator = [bigInt(1),bigInt(0)];
        ComputeConvergent(numerator, denominator, period.shift());
        let periodIndex = 0;
        while (true)
        {          
            let dio_answer = numerator[1].pow(2).minus(denominator[1].pow(2).times(constant));
            if (dio_answer.equals(1))
            {
                if (max[0].lt(numerator[1]))
                {
                    max[0] = numerator[1];
                    max[1] = constant;
                }
                break;
            }
            ComputeConvergent(numerator, denominator, period[periodIndex]);
            periodIndex = (periodIndex + 1)%period.length;
        }

    }
    return max;
}

function ComputePeriod(radical)
{

    let root = Math.sqrt(radical);
    let int_part = Math.floor(root);
    let period = [int_part];
    let numerator = [1];
    let denominator = [-1*int_part];

    denominator.push((radical - Math.pow(denominator[0], 2))/numerator[0]);
    period.push(Math.floor((root - denominator[0])/denominator[1]));
    numerator.push(-1*denominator[0] - (period[1] * denominator[1]));
    let has_looped = {};
    has_looped[numerator[1]] = [denominator[1]];
    _ComputePeriod(period, numerator, denominator, radical, root, has_looped);
    period.pop();

    return period;
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
                return;
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

function ComputeConvergent(numerator, denominator, period)
{
    numerator.push(numerator[1].times(period).plus(numerator[0]));
    denominator.push(denominator[1].times(period).plus(denominator[0]));
    numerator.shift();
    denominator.shift();
}