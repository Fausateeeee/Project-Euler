/*jshint esversion: 6 */
/*

The fraction 49/98 is a curious fraction, as an inexperienced mathematician 
in attempting to simplify it may incorrectly believe that 49/98 = 4/8, 
which is correct, is obtained by cancelling the 9s.

We shall consider fractions like, 30/50 = 3/5, to be trivial examples.

There are exactly four non-trivial examples of this type of fraction, 
less than one in value, and containing two digits in the numerator and denominator.

If the product of these four fractions is given in its lowest common terms, find the value of the denominator.

*/
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {
        //console.log(canDigitCancel("49","98"));
        console.log("The denominator of the product of the four digits cancelling fraction is", digitsCancellingFractions());
        rl.close();

});

function digitsCancellingFractions()
{
    //fill array
    let numDem = [];
    let answers = [];
    for (let i = 11; i < 100; i++)
    {
        if (i%10 != 0)
        {
            numDem.push(i);
        }
    }
    for (let i = 0; i < numDem.length; i++)
    {
        for (let j = i + 1; j < numDem.length; j++)
        {
            let potentialSol = canDigitCancel(numDem[i].toString(),numDem[j].toString());
            for (let k of potentialSol)
            {
                
                if(k.num/k.dem == numDem[i]/numDem[j])
                {
                    console.log(k.num, k.dem, numDem[i], numDem[j], k.num/k.dem, numDem[i]/numDem[j]);
                    answers.push({num: numDem[i], dem: numDem[j]});
                }
            }
        }
    }

    let finalNum = 1;
    let finalDem = 1;

    for (let nbr of answers)
    {
        finalNum *= nbr.num;
        finalDem *= nbr.dem;
    }

    
    return reduceFraction(finalNum, finalDem).dem;
}

function canDigitCancel(a,b)
{
    let firstIndex = b.indexOf(a.substring(0,1));
    let secondIndex = b.indexOf(a.substring(1));

    let frac = [];
    if (firstIndex != -1)
    {
        if (firstIndex == 0)
        {
            frac.push({num : parseInt(a.substring(1)), dem : parseInt(b.substring(1)), oNum : a, oDem : b});
        }
        else
        {
            frac.push({num : parseInt(a.substring(1)), dem : parseInt(b.substring(0,1)), oNum : a, oDem : b});
        }
    }
    if (secondIndex != -1)
    {
        if (secondIndex == 0)
        {
            frac.push({num : parseInt(a.substring(0,1)), dem : parseInt(b.substring(1)), oNum : a, oDem : b});
        }
        else
        {
            frac.push({num : parseInt(a.substring(0,1)), dem : parseInt(b.substring(0,1)), oNum : a, oDem : b});
        }
    }
    return frac;
}

function reduceFraction(num, dem)
{
    for (let i = 2; i <= Math.min(num,dem); i++)
    {
        while (num%i == 0 && dem%i == 0)
        {
            num /= i;
            dem /= i;
        }
    }

    return {num : num, dem : dem};
}