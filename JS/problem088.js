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
const bigInt = require('big-integer')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    console.log("The sum of all the minimal product-sum numbers for 2 ≤ k ≤ 12000 is", 
        LoopMinimalProductSum());
    rl.close();
});

function LoopMinimalProductSum()
{
    let upperbound = 12000; 
    PSF_dict = ComputeProductCombination(upperbound);
    return FindMinimalProductSum(upperbound, PSF_dict);
}

function ComputeProductCombination(upperbound){
    let maximalProductSum = 2*upperbound;
    let maximalFactorNumber = Math.floor(Math.log2(maximalProductSum));
    let PSF_dict = {};
    for (let i = 2; i <= maximalProductSum; ++i)
    {
        PSF_dict[i] = [];
    }
    for(let i = 2; i <= maximalFactorNumber; ++i){
        console.log(i, maximalFactorNumber);
        const PSF = new ProductSumFinder(i);
        while(PSF.value != -1){
            //console.log(PSF.value, maximalProductSum, i, PSF.product);
            if (PSF.value <= maximalProductSum && PSF.value > i){
                product_copy = [...PSF.product];
                //console.log
                product_copy.sort();
                if (!PSF_dict[PSF.value].includes(product_copy))
                {
                    PSF_dict[PSF.value].push(product_copy);
                }

            }
            else if(PSF.value > maximalProductSum){
                PSF.skip();
            }
            PSF.advanceOne();
        }
    }
    return PSF_dict;
}

function FindMinimalProductSum(upperbound, PSF_dict){
    let minimalSet= [];
    let productSet = [];
    for (let i = 0; i <= upperbound; ++i){
        minimalSet[i] = 0;
    }
    for (let i = 2; i <= upperbound; ++i){
        if(i%100 == 0){
            console.log(i);
        }
        for (let j = i; j <= 2*i; ++j){
            for (let prod_arr of PSF_dict[j]){

                let product = j;
                let addition = prod_arr.reduce((a,b) => {return a + b;});
                shift = product - addition;
                //console.log("Product",j,"Addition", addition,"Shift", shift,"arr", prod_arr);
                if(shift < 0 || shift > i){
                }
                else if ((minimalSet[prod_arr.length + shift] == 0 || minimalSet[prod_arr.length + shift] > product))
                {
    
                    minimalSet[prod_arr.length+shift] = product;
                    productSet[prod_arr.length+shift] = prod_arr;
                }
    
            }
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
    constructor(length){
        this.length = length;
        this.product = [];
        for (let i = 0; i < this.length; ++i){
            this.product[i] = 2;
        }
        this.value = this.product.reduce((a,b) => {return a * b;});
    }

    advanceOne(){
        this.product[this.length - 1]++;
        for (let index = this.length - 1; index > 0; --index){
            if(this.product[index] > 9){
                this.product[index] = 1;
                this.product[index - 1]++;
            }
            else{
                break;
            }
        }

        if(this.product[0] > 9){
            this.value = -1;
        }
        else{
            this.value =  this.product.reduce((a,b) => {return a * b;});    
        }

    }
    skip(){
        this.product[this.length - 1] = 9;
        this.advanceOne();
    }
    
}