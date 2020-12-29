const { performance } = require('perf_hooks')
/*

n! means n × (n − 1) × ... × 3 × 2 × 1

For example, 10! = 10 × 9 × ... × 3 × 2 × 1 = 3628800,
and the sum of the digits in the number 10! is 3 + 6 + 2 + 8 + 8 + 0 + 0 = 27.

Find the sum of the digits in the number 100!

*/

/*
    Run npm install big-integer
*/

function p020 (n) {
  const t0 = performance.now()
  let factorial = BigInt(1)
  for (let i = 2; i <= n; i++) {
    factorial *= BigInt(i)
  }

  let answer = 0
  for (const digit of factorial.toString()) {
    answer += Number.parseInt(digit)
  }
  const t1 = performance.now()
  return { answer: answer, time: t1 - t0 }
}

module.exports = p020
