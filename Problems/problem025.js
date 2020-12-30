const { performance } = require('perf_hooks')
/*

The Fibonacci sequence is defined by the recurrence relation:

    Fn = Fn−1 + Fn−2, where F1 = 1 and F2 = 1.

Hence the first 12 terms will be:

    F1 = 1
    F2 = 1
    F3 = 2
    F4 = 3
    F5 = 5
    F6 = 8
    F7 = 13
    F8 = 21
    F9 = 34
    F10 = 55
    F11 = 89
    F12 = 144

The 12th term, F12, is the first term to contain three digits.

What is the index of the first term in the Fibonacci sequence to contain 1000 digits?

*/

function p025 (n) {
  const t0 = performance.now()
  let FibNumbers = [BigInt(1), BigInt(1)]
  let answer = 2
  while (FibNumbers[1].toString().length < n) {
    FibNumbers = [FibNumbers[1], FibNumbers[0] + FibNumbers[1]]
    ++answer
  }

  const t1 = performance.now()
  return { answer: answer, time: t1 - t0 }
}

module.exports = p025
