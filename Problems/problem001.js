const { performance } = require('perf_hooks')
/*

If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.

Find the sum of all the multiples of 3 or 5 below 1000.

*/

function p001 (n) {
  const t0 = performance.now()
  const N = BigInt(n)
  const nbrDivisibleBy3 = nbrDivisible(N, 3)
  const nbrDivisibleBy5 = nbrDivisible(N, 5)
  const nbrDivisibleBy15 = nbrDivisible(N, 15)

  const sumDivisibleBy3 = (3n * nbrDivisibleBy3 * (nbrDivisibleBy3 + 1n)) / 2n
  const sumDivisibleBy5 = 5n * nbrDivisibleBy5 * (nbrDivisibleBy5 + 1n) / 2n
  const sumDivisibleBy15 = 15n * nbrDivisibleBy15 * (nbrDivisibleBy15 + 1n) / 2n
  const sum = (sumDivisibleBy3 + sumDivisibleBy5 - sumDivisibleBy15).toString()
  const t1 = performance.now()
  return { answer: sum, time: t1 - t0 }
}

function nbrDivisible (upperBound, quotient) {
  return (upperBound - 1n) / BigInt(quotient)
}

module.exports = p001
