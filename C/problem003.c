/*

The prime factors of 13195 are 5, 7, 13 and 29.

What is the largest prime factor of the number 600851475143 ?

*/

#include <stdio.h>
#include <math.h>
#include <stdlib.h>

void primeSieve(int, int*);

int main(){
    long number =  600851475143;
    int bound = (int)sqrt(number) + 1;
    int arraylength = (int)(1.25506*bound/log(bound)) + 1;
    int primes[arraylength];

    for (int i = 0; i < arraylength; i++){
        primes[i] = 0;
    }
    printf("%i, %i \n", bound, arraylength);
    primeSieve(bound, primes);

    for (int i = arraylength; i > 0; --i)
    {
        if (primes[i - 1] != 0 && number%primes[i - 1] == 0)
        {
            printf("The largest prime factor of %li is %i.\n", number, primes[i-1]);
            break;
        }


    }

    return 0;
}

void primeSieve(int bound, int* primes){
    int primeindex = 0;
    int sieve[bound];

    for (int i = 0; i < bound; ++i)
    {
        sieve[i] = i;
    }

    for (int i = 2; i < bound; ++i){
        if (sieve[i] != 0){
            primes[primeindex++] = sieve[i];
            for (int j = 2 * sieve[i]; j < bound; j+= sieve[i]){
                sieve[j] = 0;
            }
        }
    }
}