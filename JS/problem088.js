/*jshint esversion: 6 */
/*

    A natural number, N, that can be written as the sum and product of a given set of 
    at least two natural numbers, {a_1, a_2, ... , a_k} is called a product-sum number: 
    N = a_1 + a_2 + ... + a_k = a_1 × a_2 × ... × a_k.

    For example, 6 = 1 + 2 + 3 = 1 × 2 × 3.

    For a given set of size, k, we shall call the smallest N with this property a minimal product-sum number. 
    The minimal product-sum numbers for sets of size, k = 2, 3, 4, 5, and 6 are as follows.

    k=2: 4 = 2 × 2 = 2 + 2
    k=3: 6 = 1 × 2 × 3 = 1 + 2 + 3
    k=4: 8 = 1 × 1 × 2 × 4 = 1 + 1 + 2 + 4
    k=5: 8 = 1 × 1 × 2 × 2 × 2 = 1 + 1 + 2 + 2 + 2
    k=6: 12 = 1 × 1 × 1 × 1 × 2 × 6 = 1 + 1 + 1 + 1 + 2 + 6

    Hence for 2≤k≤6, the sum of all the minimal product-sum numbers is 4+6+8+12 = 30; note that 8 is only counted once in the sum.

    In fact, as the complete set of minimal product-sum numbers for 2≤k≤12 is {4, 6, 8, 12, 15, 16}, the sum is 61.

    What is the sum of all the minimal product-sum numbers for 2≤k≤12000?

*/

/*

    It is obvious that the minimal bound of a set of size k is k since the minimal addition is k*1.
    I need to find an upper bound and I suppose this is given by the multiplication side.

    The upperbound is always 2k since we can use the set {k, 2, 1, ..., 1}.
    On the multiplication side, we will have 2*k*1*...*1 = 2k.
    On the addition side, we will have k + 2 + (k-2)*1 = 2k.

    So the minimal product-sum number N is always k <= N <= 2k. (It is probably k < N <= 2k in reality.)

    I should factorize each number up to 24000 and find every way to write it.
    Per example, 12 = 2 * 2 * 3 = 4 * 3 = 2 * 6.

    With a slower solution, I computed the answers for up to 20 for tests purposes:
    2  [ 2, 2 ] = 4
    3  [ 1, 2, 3 ] = 6
    4  [ 1, 1, 2, 4 ] = 8
    5  [ 1, 1, 2, 2, 2 ] = 8
    6  [ 1, 1, 1, 1, 2, 6 ] = 12
    7  [ 1, 1, 1, 1, 1, 3, 4 ] = 12
    8  [ 1, 1, 1, 1, 1, 2, 2, 3 ] = 12
    9  [ 1, 1, 1, 1, 1, 1, 1, 3, 5 ] = 15
    10 [ 1, 1, 1, 1, 1, 1, 1, 1, 4, 4 ] = 16
    11 [ 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 4 ] = 16
    12 [ 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2 ] = 16
    13 [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 3 ] = 18
    14 [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 5 ] = 20
    15 [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 8 ] = 24
    16 [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 6 ] = 24
    17 [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5 ] = 25
    18 [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 4 ] = 24
    19 [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 3 ] = 24
    20 [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 7 ] = 28

*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    console.log("The sum of all the minimal product-sum numbers for 2 ≤ k ≤ 12000 is", LoopMinimalProductSum(12000));
    rl.close();
});

function LoopMinimalProductSum(upperbound){

    let maximalProductSum = 2*upperbound;
    let maximalFactorNumber = Math.floor(Math.log2(maximalProductSum));
    let minimalSet = [];

    for (let i = 0; i <= upperbound; ++i){
        minimalSet[i] = 0;
    }

    for(let i = 2; i <= maximalFactorNumber; ++i){

        const PSF = new ProductSumFinder(i, 2*upperbound);

        while(PSF.unfinished){
            if (PSF.product <= maximalProductSum){

                if(PSF.shift < 0){

                }
                else if ((minimalSet[PSF.length + PSF.shift] == 0 || minimalSet[PSF.length + PSF.shift] > PSF.product))
                {
                    minimalSet[PSF.length + PSF.shift] = PSF.product;
                }
                //console.log("Shift", PSF.shift, "Product", PSF.product, "Sum", PSF.sum, "Factors", PSF.factors, "MinimalSet", minimalSet);
            }
            else if(PSF.product > maximalProductSum){
                PSF.skip();
            }
            //console.log(PSF);
            PSF.advanceOne();
        }
    }

    uniqueMinimalSet = [];
    for (let min of minimalSet){
        if(!uniqueMinimalSet.includes(min)){
            uniqueMinimalSet.push(min);
        }
    }
    return uniqueMinimalSet.reduce((a,b) => {return a + b;});
}

class ProductSumFinder{
    constructor(length, upperbound){
        this.length = length;
        this.upperbound = upperbound;
        this.factors = [];
        for (let i = 0; i < this.length; ++i){
            this.factors[i] = 2;
        }
        this.product = this.factors.reduce((a,b) => {return a * b;});
        this.sum = this.factors.reduce((a,b) => {return a + b;});
        this.shift = this.product - this.sum;
        this.unfinished = true;
    }

    advanceOne(){
        this.factors[this.length - 1]++;

        this.product =  this.factors.reduce((a,b) => {return a * b;});
        if(this.product > this.upperbound){
            this.skip();
        }
        else{
            this.sum = this.factors.reduce((a,b) => {return a + b;});
            this.shift = this.product - this.sum;
        }
    }

    skip(){
        this.factors[this.length - 1] = 2;
        this.factors[this.length - 2]++;
        this.product =  this.factors.reduce((a,b) => {return a * b;});

        while (this.product > this.upperbound && this.unfinished){

            let maxIndex = this.factors.indexOf(Math.max(...this.factors));
            if(maxIndex > 0){
                this.factors[maxIndex - 1]++;
                for(let i = maxIndex; i < this.length; i++){
                    this.factors[i] = 2;
                }
                this.factors[this.length - 1] = 1;
                this.product = this.factors.reduce((a,b) => {return a * b;});
            }
            else{
                this.unfinished = false;
            }
        }
        this.sum = this.factors.reduce((a,b) => {return a + b;});
        this.shift = this.product - this.sum;


    }
    
}