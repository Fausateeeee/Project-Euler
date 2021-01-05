const { performance } = require('perf_hooks')
/*

    If a box contains twenty-one coloured discs, composed of fifteen blue discs and six red discs,
    and two discs were taken at random, it can be seen that the probability of taking two blue discs,
    P(BB) = (15/21)×(14/20) = 1/2.

    The next such arrangement, for which there is exactly 50% chance of taking two blue discs at random,
    is a box containing eighty-five blue discs and thirty-five red discs.

    By finding the first arrangement to contain over 10^12 = 1,000,000,000,000 discs in total,
    determine the number of blue discs that the box would contain.

*/

/*

    Suppose k is the number of blue discs and n the total number of discs.
    We have k(k-1)/n(n-1) = 0.5 iff k(k-1) = n(n-1)/2. The last part is a constant.
    We have the quadratic diophantine equation 2k^2 - 2k - n^2 - n = 0.

    By solving this equation using generating function, we get the recursive solution
    (x_(n+1), y_(n+1)) = (3x_n + 2y_n, 4x_n + 3y_n - 1)

*/

function p100 (lowerbound) {
  const t0 = performance.now()
  let answer = [1, 0]
  while (answer[1] < lowerbound) {
    answer = NextSolution(answer)
  }

  const t1 = performance.now()
  return { answer: answer, time: t1 - t0 }
}

function NextSolution (previousSolution) {
  return [3 * previousSolution[0] + 2 * previousSolution[1], 4 * previousSolution[0] + 3 * previousSolution[1] - 1]
}

module.exports = p100
