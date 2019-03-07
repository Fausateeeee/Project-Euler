/*jshint esversion: 6 */
/*

The primes 3, 7, 109, and 673, are quite remarkable. 
By taking any two primes and concatenating them in any order the result will always be prime. 
For example, taking 7 and 109, both 7109 and 1097 are prime. 
The sum of these four primes, 792, represents the lowest sum for a set of four primes with this property.

Find the lowest sum for a set of five primes for which any two primes concatenate to produce another prime.

*/
const readline = require('readline');
const bigInt = require('big-integer');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    console.log("The lowest sum for a set of five primes for which any two primes concatenate to produce another prime is", 
    FindPrimeFamily(GenerateOddPrimeArray(10000)));
    rl.close();
});

function FindPrimeFamily(primes)
{
    for (let index1 = 0; index1 < primes.length; ++index1)
    {
        let prime1Family = ComputePrimeFamily(index1, primes);
        if (prime1Family.length > 0)
        {
            for (let index2 = 0; index2 < prime1Family.length; ++index2)
            {
                let prime2Family = ComputePrimeFamily(index2, prime1Family);
                if (prime2Family.length > 0)
                {
                    for (let index3 = 0; index3 < prime2Family.length; ++index3)
                    {
                        let prime3Family = ComputePrimeFamily(index3, prime2Family);
                        if (prime3Family.length > 0)
                        {
                            for (let index4 = 0; index4 < prime3Family.length; ++index4)
                            {
                                let prime4Family = ComputePrimeFamily(index4, prime3Family);
                                if (prime4Family.length > 0)
                                {
                                    return [primes[index1], prime1Family[index2], prime2Family[index3], 
                                    prime3Family[index4], prime4Family[0]].reduce((a,b) => parseInt(a) + parseInt(b));
                                }
                            }
                        }
                    }
                }
            }
        }

    }
    return 0;
}

function ComputePrimeFamily(index, primes)
{
    let currentPrime = primes[index];
    let primeFamily = [];
    for (let i = index + 1; i < primes.length; i++)
    {
        let testPrime1 = currentPrime + primes[i];
        let testPrime2 = primes[i] + currentPrime;
        if (bigInt(parseInt(testPrime1)).isPrime() && bigInt(parseInt(testPrime2)).isPrime())
        {
            primeFamily.push(primes[i]);
        }
    }
    return primeFamily;
}

function GenerateOddPrimeArray(upperbound)
{
    let primes = ["3","7","11"];
    for (let p = 13; p < upperbound; p += 2)
    {
        if (p%3 != 0 && p%5 != 0 && p%7 != 0 && p%11 !=0 && bigInt(p).isPrime())
        {
            primes.push(p.toString());
        }
    }
    return primes;
}