const { performance } = require('perf_hooks')
/*

The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.

Find the sum of all the primes below two million.

*/

function p010 (n) {
  const t0 = performance.now()
  const primes = EratosthenesSieve(n)
  const t1 = performance.now()
  return { answer: primes, time: t1 - t0 }
}

function EratosthenesSieve (upperbound) {
  // We reduce the sieve in half by skipping every even number
  const oddUpperbound = Math.floor((upperbound + 1) / 2)
  const innerLimit = Math.floor((Math.floor(Math.sqrt(upperbound)) - 1) / 2)
  const numberArr = Array(oddUpperbound).fill(true)
  const oddSum = Math.ceil(upperbound / 2) ** 2 + 1
  numberArr[0] = false
  let nonPrimeSum = 0
  for (let i = 1; i <= innerLimit; ++i) {
    if (numberArr[i]) {
      for (let j = 2 * i * (i + 1); j <= oddUpperbound; j += 2 * i + 1) {
        if (numberArr[j]) {
          nonPrimeSum += 2 * j + 1
        }
        numberArr[j] = false
      }
    }
  }

  return oddSum - nonPrimeSum
}

module.exports = p010
