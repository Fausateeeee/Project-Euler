const { performance } = require('perf_hooks')
/*

2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.

What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?

*/
function p005 (n) {
  const t0 = performance.now()
  let lcmf = 1
  for (let i = 1; i <= n; i++) {
    lcmf = lcm(lcmf, i)
  }
  const t1 = performance.now()
  return { answer: lcmf, time: t1 - t0 }
}

function lcm (number1, number2) {
  return number1 * number2 / gcd(number1, number2)
}

function gcd (number1, number2) {
  if (number1 < number2) {
    return gcd(number2, number1)
  }

  while (number2 > 0) {
    const rest = number1 % number2
    number1 = number2
    number2 = rest
  }

  return number1
}

module.exports = p005
