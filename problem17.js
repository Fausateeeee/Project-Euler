/*jshint esversion: 6 */
/*

If the numbers 1 to 5 are written out in words: one, two, three, four, five, then there are 3 + 3 + 5 + 4 + 4 = 19 letters used in total.

If all the numbers from 1 to 1000 (one thousand) inclusive were written out in words, how many letters would be used?

NOTE: Do not count spaces or hyphens. For example, 342 (three hundred and forty-two) contains 23 letters and 115 
(one hundred and fifteen) contains 20 letters. The use of "and" when writing out numbers is in compliance with British usage.

*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const BASE_NAMES = [0,3/*one*/,3/*two*/,5/*three*/,4/*four*/,4/*five*/,3/*six*/,5/*seven*/,5/*eight*/,4/*nine*/,3/*ten*/,
                    6/*eleven*/,6/*twelve*/,8/*thirteen*/, 8/*fourteen*/, 7/*fifteen*/, 7/*sixteen*/, 9/*seventeen*/, 
                    8/*eighteen*/, 8/*nineteen*/];

const SPECIAL_NAMES = [0, 0, 6/*twenty*/, 6/*thirty*/, 5/*forty*/, 5/*fifty*/, 5/*sixty*/, 7/*seventy*/, 6/*eighty*/, 6/*ninety*/];

rl.question('Enter a natural number between 1 and 1000 : ', (answer) => {

    const parsed = parseInt(answer);

    if (isNaN(parsed)) {
        console.log("Please, enter a natural number next time <3");
        rl.close();
    }

    if (parsed < 1) {
        console.log("Enter a number greater or equals than 1 or smaller or equals than 1000 next time :-");
        rl.close();

    }

    let letterNumber = 0;
    for (let i = 1; i <= parsed && i < 100; i++)
    {
        letterNumber += BellowHundreds(i);
    }
    for (let i = 100; i <= parsed && i < 1000; i++)
    {
        letterNumber += BellowThousand(i);
    }
    if (parsed == 1000)
    {
        letterNumber += 3 + 8;
    }

    console.log("The number of letter used to count from 1 to", parsed, "is :", letterNumber);
    rl.close();
});

function BellowHundreds(number)
{
    if (number < 20)
    {
        return BASE_NAMES[number];
    }
    else
    {
        const UNIT = number%10;
        const TENTH = Math.floor((number/10));
        return SPECIAL_NAMES[TENTH] + BASE_NAMES[UNIT];
    }
}

function BellowThousand(number)
{
    const HUNDRED_LENGTH = 7;
    const AND_LENGTH = 3;
    const UNIT = number%10;
    const TENTH = Math.floor((number%100)/10);
    const HUNDRED = Math.floor(number/100);

    if( UNIT == 0 && TENTH == 0)
    {
        return BASE_NAMES[HUNDRED] + HUNDRED_LENGTH;
    }
    else if (TENTH < 2)
    {
        return BASE_NAMES[HUNDRED] + HUNDRED_LENGTH + AND_LENGTH + BASE_NAMES[TENTH*10 + UNIT];
    }
    else
    {
        return BASE_NAMES[HUNDRED] + HUNDRED_LENGTH + AND_LENGTH + SPECIAL_NAMES[TENTH] + BASE_NAMES[UNIT];
    }
}