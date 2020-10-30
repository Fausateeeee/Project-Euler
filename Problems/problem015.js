const { performance } = require('perf_hooks')
/*

Starting in the top left corner of a 2×2 grid, and only being able to move to the right and down, there are exactly 6 routes to the bottom right corner.

How many such routes are there through a 20×20 grid?

*/

/*
First, we implement the simpleConnectedGrid which ressemble of a graph class
*/

/*
    Slow approch, I should do the combinational work to count how many paths are possible
*/

function p015 (n) {
  const t0 = performance.now()
  let answer = 1
  for (let i = 1; i <= n; i++) {
    answer *= (n + i) / i
  }
  answer = Math.ceil(answer)
  const t1 = performance.now()
  return { answer: answer, time: t1 - t0 }
}

module.exports = p015
