const { performance } = require('perf_hooks')
/*

2^15 = 32768 and the sum of its digits is 3 + 2 + 7 + 6 + 8 = 26.

What is the sum of the digits of the number 2^1000?

*/

function p016 (n) {
  const t0 = performance.now()
  const answer = (BigInt(2) ** BigInt(n)).toString().split('').reduce((acc, val) => { return acc + Number.parseInt(val) }, 0)

  const t1 = performance.now()
  return { answer: answer, time: t1 - t0 }
};

module.exports = p016
