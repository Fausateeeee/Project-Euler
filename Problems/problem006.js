const { performance } = require('perf_hooks')
/*

The sum of the squares of the first ten natural numbers is,
1^2 + 2^2 + ... + 10^2 = 385

The square of the sum of the first ten natural numbers is,
(1 + 2 + ... + 10)^2 = 552 = 3025

Hence the difference between the sum of the squares of the first ten natural numbers and the square of the sum is 3025 − 385 = 2640.

Find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum.

*/

function p006 (n) {
  const t0 = performance.now()
  const squaredsum = Math.pow(n * (n + 1) / 2, 2)
  const sumofsquares = n * (n + 1) * (2 * n + 1) / 6
  const t1 = performance.now()

  return { answer: squaredsum - sumofsquares, time: t1 - t0 }
}

module.exports = p006
