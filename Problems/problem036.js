/*jshint esversion: 6 */
/*

The decimal number, 585 = 10010010012 (binary), is palindromic in both bases.

Find the sum of all numbers, less than one million, which are palindromic in base 10 and base 2.

(Please note that the palindromic number, in either base, may not include leading zeros.)


*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter an natural number : ', (answer) => {

    const parsed = parseInt(answer);

    if (isNaN(parsed)) {
        console.log("Please, enter a natural number next time <3");
        rl.close();
    }

    else if (parsed < 1) {
        console.log("Enter a number greater than 0 next time");
        rl.close();
    }

    else
    {
        console.log(toBinary(3), isPalindrome(toBinary(3)));
        let i = 1;
        let ans = [];
        while (i <= parsed)
        {
            if (isPalindrome(i.toString()) && isPalindrome(toBinary(i)))
            {
                ans.push(i);
            }
            i++;
        }
        console.log("The sum of all palindromic number in base 10 and base 2 bellow", parsed, "is", ans.reduce((a,b) => {return a + b;}));
        rl.close();
    }

});


function isPalindrome(number)
{
    let arr = number.split("");

    let j = arr.length - 1;

    for (let i = 0; i < j; i++, j--)
    {
        if (arr[i] != arr[j])
        {
            return false;
        }
    }
    return true;
}

function toBinary(number)
{
    let binary = [];
    while (number > 0)
    {
        binary.unshift((number%2).toString());
        number = Math.floor(number/2) ;
    }

    return binary.reduce((a,b) => {return a+b;});
}