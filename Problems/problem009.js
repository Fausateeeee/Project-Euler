const { performance } = require('perf_hooks')
/*

A Pythagorean triplet is a set of three natural numbers, a < b < c, for which,
a^2 + b^2 = c^2

For example, 3^2 + 4^2 = 9 + 16 = 25 = 5^2.

There exists exactly one Pythagorean triplet for which a + b + c = 1000.
Find the product abc.

*/

/*

    Using Euclid's formula, we have the fact that for m > n > 0 and m != n, a = m^2 - n^2, b = 2mn and c = m^2 + n^2.
    For any integer m and n respecting that condition, we will get a Pythaforean triple.
    Using the fact that we know a + b + c = K, we get the expression m(m + n) = K/2
    Since m and n are integer, this means that m must divide K/2 and same is true for m + n.
    If we get each divider of K/2, we can try for each K/(2m) - m = n.
    When we find a solution where both m and n are positive integer, we stop.
    If we find no solution, we return 0.
    Note: K must be even for a solution to exist

*/

function p009 (nbr) {
  const t0 = performance.now()
  if (nbr % 2 === 1) {
    const t1 = performance.now()
    return { answer: -1, time: t1 - t0 }
  }
  const sum = nbr / 2
  const solution = [0, 0, 0]
  const upperbound = Math.ceil(Math.sqrt(sum)) - 1

  for (let m = 2; m <= upperbound; ++m) {
    if (sum % m === 0) {
      let sumM = sum / m
      while (sumM % 2 === 0) {
        sumM /= 2
      }
      let k = (m % 2 === 1 ? m + 2 : m + 1)
      while (k < 2 * m && k <= sumM) {
        if (sumM % k === 0 && gcd(k, m) === 1) {
          const d = sum / (k * m)
          const n = k - m
          const a = d * (m ** 2 - n ** 2)
          const b = 2 * d * m * n
          const c = d * (m ** 2 + n ** 2)
          if (a * b * c > solution[0] * solution[1] * solution[2]) {
            solution[0] = a
            solution[1] = b
            solution[2] = c
          }
        }
        k += 2
      }
    }
  }
  const t1 = performance.now()
  return { answer: (solution[0] * solution[1] * solution[2] > 0) ? solution[0] * solution[1] * solution[2] : -1, time: t1 - t0 }
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

module.exports = p009
