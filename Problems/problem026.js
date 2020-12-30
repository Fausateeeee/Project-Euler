const { performance } = require('perf_hooks')
/*

A unit fraction contains 1 in the numerator. The decimal representation of the unit fractions with denominators 2 to 10 are given:

    1/2	= 	0.5
    1/3	= 	0.(3)
    1/4	= 	0.25
    1/5	= 	0.2
    1/6	= 	0.1(6)
    1/7	= 	0.(142857)
    1/8	= 	0.125
    1/9	= 	0.(1)
    1/10	= 	0.1

Where 0.1(6) means 0.166666..., and has a 1-digit recurring cycle. It can be seen that 1/7 has a 6-digit recurring cycle.

Find the value of d < 1000 for which 1/d contains the longest recurring cycle in its decimal fraction part.

*/

/*
    I know that if the denominator has a prime factorisation of the form (2^n)(5^m), it has a finite cycle.
    From group theory, we try to compute the length of a cycle, or more so the order of the cyclic group.
*/
function p026 (n) {
  const t0 = performance.now()

  const findCycle = {}
  let answer = 1

  for (let i = 1; i < n; ++i) {
    console.log(i)
    findCycle[i] = findCycleLength(i)
    if (findCycle[i] > findCycle[answer]) {
      answer = i
    }
  }

  const t1 = performance.now()
  return { answer: answer, time: t1 - t0 }
}

function findCycleLength (denominator) {
  if (hasNoCycle(denominator) || denominator === 1) {
    return 0 // No cycle
  } else {
    let i = 1
    while (true) {
      for (let j = i - 1; j >= 0; --j) {
        // console.log(BigInt(10) ** BigInt(i), BigInt(10) ** BigInt(j), (BigInt(10) ** BigInt(i) - (BigInt(10) ** BigInt(j))) % BigInt(denominator), (BigInt(10) ** BigInt(i) - (BigInt(10) ** BigInt(j))) % BigInt(denominator) === 0n)
        if ((BigInt(10) ** BigInt(i) - (BigInt(10) ** BigInt(j))) % BigInt(denominator) === BigInt(0)) {
          return i - j
        }
      }
      ++i
    }
  }
}

function hasNoCycle (number) {
  let temp = number
  while (temp % 2 === 0) {
    temp /= 2
  }
  while (temp % 5 === 0) {
    temp /= 5
  }

  if (temp === 1) {
    return true
  }
  return false
}

module.exports = p026
