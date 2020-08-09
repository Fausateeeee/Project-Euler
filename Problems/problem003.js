/*

The prime factors of 13195 are 5, 7, 13 and 29.

What is the largest prime factor of the number 600851475143 ?

*/
function p003 (n) {
  console.time('p003')
  const answer = LargestPrime(n)
  const time = console.timeEnd('p003')

  return { answer: answer, time: time }
}

function LargestPrime (n) {
  if (n === 1) {
    return 1
  }
  let biggestPrime = 1n
  let N = BigInt(n)
  while (N % 2n === 0n) {
    N /= 2n
    biggestPrime = 2n
  }
  let currentPrime = 3n
  let maxPrime = BigInt(Math.ceil(Math.sqrt(N.toString())))

  // currentPrime is not always a prime but it will only enter the do condition if it is a prime
  // Could be a possibility to construct a prime sieve but I don't think it will be usefull for 10 cases at most

  while (N > 1n && currentPrime <= maxPrime) {
    if (N % currentPrime === 0n) {
      do {
        N /= currentPrime
        biggestPrime = currentPrime
      } while (N % currentPrime === 0n)

      maxPrime = BigInt(Math.floor(Math.sqrt(N.toString())))
    }

    currentPrime += 2n
  }

  if (N === 1n) {
    return biggestPrime.toString()
  } else {
    return N.toString()
  }
}

module.exports = p003
