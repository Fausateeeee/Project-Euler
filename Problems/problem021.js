const { performance } = require('perf_hooks')
/*

Let d(n) be defined as the sum of proper divisors of n (numbers less than n which divide evenly into n).
If d(a) = b and d(b) = a, where a ≠ b, then a and b are an amicable pair and each of a and b are called amicable numbers.

For example, the proper divisors of 220 are 1, 2, 4, 5, 10, 11, 20, 22, 44, 55 and 110; therefore d(220) = 284. The proper divisors of 284 are 1, 2, 4, 71 and 142; so d(284) = 220.

Evaluate the sum of all the amicable numbers under 10000.

*/

function p021 (n) {
  const t0 = performance.now()
  const values = {}

  for (let i = 2; i <= n; i++) {
    values[i] = { divisorSum: reduceFactor(i), isAmicable: false }
    if (i !== values[i].divisorSum && reduceFactor(values[i].divisorSum) === i) {
      values[i].isAmicable = true
    }
  }
  const answer = findAmicableSum(values)
  const t1 = performance.now()
  return { answer: answer, time: t1 - t0 }
}

function reduceFactor (number) {
  const factor = [1]
  for (let i = 2; i <= Math.ceil(number / 2); i++) {
    if (number % i === 0) {
      factor.push(i)
    }
  }

  return factor.reduce((a, b) => { return a + b })
}
function findAmicableSum (values) {
  let amicables = 0
  // console.log(values);
  for (const i in values) {
    // console.log(i, values[i]);
    if (values[i].isAmicable) {
      amicables += parseInt(i)
    }
  }

  return amicables
}

module.exports = p021
