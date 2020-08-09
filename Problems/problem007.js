const { performance } = require('perf_hooks')
/*

By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13, we can see that the 6th prime is 13.

What is the 10 001st prime number?

*/

function p007 (n) {
  const t0 = performance.now()

  if (n === 1) {
    const t1 = performance.now()

    return { answer: 2, time: t1 - t0 }
  } else if (n === 2) {
    const t1 = performance.now()

    return { answer: 3, time: t1 - t0 }
  } else {
    let primeTotal = 2
    var primeCandidate = 1
    while (primeTotal < n) {
      primeCandidate += 2
      primeTotal += IsPrime(primeCandidate)
    }

    const t1 = performance.now()

    return { answer: primeCandidate, time: t1 - t0 }
  }
}

// I do not check every case since I assume the number here is odd
function IsPrime (n) {
  if (n % 3 === 0) {
    return 0
  } else {
    const upperbound = Math.floor(Math.sqrt(n))
    let f = 5
    while (f <= upperbound) {
      if (n % f === 0) {
        return 0
      }
      if (n % (f + 2) === 0) {
        return 0
      }
      f += 6
    }
  }

  return 1
}

module.exports = p007
