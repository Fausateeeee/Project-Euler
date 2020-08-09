const { performance } = require('perf_hooks')
/*

A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.

Find the largest palindrome made from the product of two 3-digit numbers.

*/
/* Solving the variation of this problem of finding the largest palindrome made from the product of two 3-digits numbers which is less than N. */

function p004 (n) {
  const t0 = performance.now()
  const inf = Math.pow(10, 3 - 1) // parsed = 1 => inf = 1, parsed = 2 => inf = 10, etc...
  const sup = Math.pow(10, 3) // parsed = 1 => sup = 10, parsed = 2 => sup = 100, etc...
  let maxPal = 0
  for (let i = inf; i < sup; i++) {
    for (let j = i; j < sup; j++) {
      if (i * j < n && isPalindrome(i * j) && i * j > maxPal) {
        maxPal = i * j
      }
    }
  }
  const t1 = performance.now()
  return { answer: maxPal, time: t1 - t0 }
}

function isPalindrome (number) {
  const arr = String(number).split('')

  let j = arr.length - 1

  for (let i = 0; i < j; i++, j--) {
    if (arr[i] !== arr[j]) {
      return false
    }
  }
  return true
}

module.exports = p004
