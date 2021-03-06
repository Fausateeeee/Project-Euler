const { performance } = require('perf_hooks')
/*

The sequence of triangle numbers is generated by adding the natural numbers. So the 7th triangle number would be 1 + 2 + 3 + 4 + 5 + 6 + 7 = 28. The first ten terms would be:

1, 3, 6, 10, 15, 21, 28, 36, 45, 55, ...

Let us list the factors of the first seven triangle numbers:

     1: 1
     3: 1,3
     6: 1,2,3,6
    10: 1,2,5,10
    15: 1,3,5,15
    21: 1,3,7,21
    28: 1,2,4,7,14,28

We can see that 28 is the first triangle number to have over five divisors.

What is the value of the first triangle number to have over five hundred divisors?

*/

/*

    To have K divisor, the number must be greater than K.
    I need a great bound or else, the computation may take forever

*/

function p012 (n) {
  const t0 = performance.now()
  const primes = EratosthenesSieve(10 ** 6)
  const answer = Factorise(n, primes)
  const t1 = performance.now()
  return { answer: answer, time: t1 - t0 }
}

function Factorise (number, primes) {
  let k = 3
  let divisorCount = 0
  let primaryDivisorCount = 2
  while (divisorCount <= number) {
    let k1 = ++k
    if (k1 % 2 === 0) {
      k1 /= 2
    }
    let subDivCount = 1
    for (let i = 0; i < primes[primes.length - 1]; ++i) {
      if (primes[i] ** 2 > k1) {
        subDivCount *= 2
        break
      }
      let e = 1
      while (k1 % primes[i] === 0) {
        ++e
        k1 /= primes[i]
      }
      if (e > 1) subDivCount *= e
      if (k1 === 1) break
    }
    divisorCount = primaryDivisorCount * subDivCount
    primaryDivisorCount = subDivCount
  }
  return k * (k - 1) / 2
}

function EratosthenesSieve (upperbound) {
  // We reduce the sieve in half by skipping every even number
  const oddUpperbound = Math.floor((upperbound + 1) / 2)
  const innerLimit = Math.floor((Math.floor(Math.sqrt(upperbound)) - 1) / 2)
  const numberArr = Array(oddUpperbound).fill(true)
  const primes = [2]
  numberArr[0] = false
  for (let i = 1; i <= innerLimit; ++i) {
    if (numberArr[i]) {
      for (let j = 2 * i * (i + 1); j <= oddUpperbound; j += 2 * i + 1) {
        numberArr[j] = false
      }
    }
  }

  for (const i in numberArr) {
    if (numberArr[i]) {
      primes.push(2 * i + 1)
    }
  }

  return primes
}

module.exports = p012
