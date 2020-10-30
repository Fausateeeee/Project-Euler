const { performance } = require('perf_hooks')
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

function p014 (n) {
  const t0 = performance.now()
  const answer = Collatz(n)
  const t1 = performance.now()
  return { answer: answer, time: t1 - t0 }
}

function Collatz (upperBound) {
  var chain = [0, 1, 2]
  var max = [2, 2]
  for (let currentValue = 3; currentValue < upperBound; ++currentValue) {
    if (currentValue % 2 === 0) {
      chain[currentValue] = chain[currentValue / 2] + 1
    } else {
      let length = 1
      let collatzNumber = 3 * currentValue + 1
      do {
        if (collatzNumber % 2 === 0) {
          ++length
          collatzNumber /= 2
        } else {
          ++length
          collatzNumber = 3 * collatzNumber + 1
        }
      }
      while (collatzNumber > currentValue)
      chain[currentValue] = chain[collatzNumber] + length
      if (chain[currentValue] >= max[1]) {
        max = [currentValue, chain[currentValue]]
      }
    }
  }
  return max[0]
}

module.exports = p014
