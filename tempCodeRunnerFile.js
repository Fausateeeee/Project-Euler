const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    console.log("The sum of the product of 1 throught 9 pandigital multiplicand, multiplier and product is", pandigital());
    rl.close();

});

function pandigital()
{
    let panNbr = [];
    for (let i = 2; i < 10; i++)
    {
        for (let j = 1000; j <= 9876 && i*j < 100000; j++)
        {
            if (isPandigital(i,j));
            {
                if (panNbr.indexOf(i*j) == -1)
                {
                    panNbr.push(i*j);
                }
            }
        }
    }

    for (let i = 12; i <= 98; i++)
    {
        for (let j = 123; j <= 987 && i*j < 10000; j++)
        {
            if (isPandigital(i,j));
            {
                if (panNbr.indexOf(i*j) == -1)
                {
                    panNbr.push(i*j);
                }
            }
        }
    }

    return panNbr;//.reduce((a,b) => {return a + b;});
}

function isPandigital(a,b)
{
    let nbrs ="x"+  a.toString() + b.toString() + (a*b).toString() + "x";

    for (let i = 1; i <= 9; i++)
    {
        let currentSplit = nbrs.split(i.toString()).length;
        if(currentSplit != 2)
        {
            return false;
        }
    }

    return true;

}