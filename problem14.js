/*jshint esversion: 6 */
/*

The following iterative sequence is defined for the set of positive integers:

n → n/2 (n is even)
n → 3n + 1 (n is odd)

Using the rule above and starting with 13, we generate the following sequence:
13 → 40 → 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1

It can be seen that this sequence (starting at 13 and finishing at 1) contains 10 terms. Although it has not been proved yet (Collatz Problem), it is thought that all starting numbers finish at 1.

Which starting number, under one million, produces the longest chain?

NOTE: Once the chain starts the terms are allowed to go above one million.

*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter a natural number ', (answer) => {
  
    const parsed = parseInt(answer);
    var collatzValues = [];

    if (isNaN(parsed)) {
        console.log("Please, enter a natural number next time <3");
        rl.close();
    }

    if (parsed < 1) {
        console.log("Enter a number greater than 0 next time");
        rl.close();
    
    }
    let r_collatz = Collatz(parsed);

    let max = r_collatz.reduce((a,b) => Math.max(a,b));

    console.log("The number with the longuest Collatz chain under", parsed, "is", r_collatz.indexOf(max), "with length", max);
    rl.close();
});

//Collatz will return the starting number and the length of the chain

function Collatz(nbr)
{
    let values = [true, true];
    let length = [0,1];

    for (let i = 2; i < nbr; i++)
    {
        let number = i;
        let length_l = 1;
        while(number > 1)
        {
            if (values[number])
            {
               
                values[i] = true;
                length[i] = length[number] + length_l;
                number=1;
            }

            else if (number%2 == 0)
            {
                length_l++;
                number /= 2;
                if (number == 1)
                {
                    values[i] = true;
                    length[i] = length_l;
                }         
            }
            else
            {
                length_l++;
                number = 3*number + 1;
            }
        }
        
    }
    return length;
}