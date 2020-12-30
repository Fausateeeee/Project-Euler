const { performance } = require('perf_hooks')
/*

A permutation is an ordered arrangement of objects. For example, 3124 is one possible permutation of the digits 1, 2, 3 and 4.
If all of the permutations are listed numerically or alphabetically, we call it lexicographic order. The lexicographic permutations of 0, 1 and 2 are:

012   021   102   120   201   210

What is the millionth lexicographic permutation of the digits 0, 1, 2, 3, 4, 5, 6, 7, 8 and 9?

*/
function p024 (n) {
  const t0 = performance.now()
  const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

  const allPermuations = []

  computePermutation(digits, allPermuations, 0, digits.length - 1)

  const answer = allPermuations.sort()[n - 1]
  const t1 = performance.now()
  return { answer: answer, time: t1 - t0 }
}

function computePermutation (arr, permutations, startingIndex, endIndex) {
  if (startingIndex === endIndex) {
    permutations.push(arr.reduce((a, b) => { return a + b }))
  } else {
    for (let i = startingIndex; i <= endIndex; i++) {
      swapArrayElements(arr, startingIndex, i)
      computePermutation(arr, permutations, startingIndex + 1, endIndex)
      swapArrayElements(arr, startingIndex, i)
    }
  }
}

function swapArrayElements (arr, index1, index2) {
  [arr[index1], arr[index2]] = [arr[index2], arr[index1]]
}

module.exports = p024
