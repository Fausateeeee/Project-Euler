const { performance } = require('perf_hooks')
const fs = require('fs')
/*

    By replacing each of the letters in the word CARE with 1, 2, 9, and 6 respectively,
    we form a square number: 1296 = 36^2. What is remarkable is that,
    by using the same digital substitutions, the anagram, RACE, also forms a square number: 9216 = 96^2.
    We shall call CARE (and RACE) a square anagram word pair and specify further that leading zeroes are not permitted,
    neither may a different letter have the same digital value as another letter.

    Using words.txt (right click and 'Save Link/Target As...'),
    a 16K text file containing nearly two-thousand common English words,
    find all the square anagram word pairs (a palindromic word is NOT considered to be an anagram of itself).

    What is the largest square number formed by any member of such a pair?

    NOTE: All anagrams formed must be contained in the given text file.

*/

function p098 (path) {
  const t0 = performance.now()

  const wordDict = ReadFile(path)
  const squares = new Squares()
  const answer = FindPairs(wordDict, squares)

  const t1 = performance.now()
  return { answer: answer, time: t1 - t0 }
}

function ReadFile (path) {
  const allText = fs.readFileSync(path, 'utf8')

  const allWords = allText.split(',')

  const wordDict = {}
  for (const word of allWords) {
    const split = word.split('"')
    const wordObj = new Word(split[1])
    if (Object.keys(wordDict).includes(wordObj.anagram)) {
      wordDict[wordObj.anagram].push(wordObj)
    } else {
      wordDict[wordObj.anagram] = [wordObj]
    }
  }
  for (const key of Object.keys(wordDict)) {
    if (wordDict[key].length === 1) {
      delete wordDict[key]
    }
  }

  return wordDict
}

function FindPairs (wordsDict, squares) {
  let max = 0
  for (const key in wordsDict) {
    const wordsPairs = wordsDict[key]
    const potentialsSquares = squares.GetSquares(wordsPairs[0].word.length)
    for (let i = 0; i < wordsPairs.length - 1; ++i) {
      const word1 = wordsPairs[i]
      for (let j = i + 1; j < wordsPairs.length; ++j) {
        const word2 = wordsPairs[j]
        for (let k = potentialsSquares.length - 1; k >= 0; --k) {
          const patron = CurrentWordFitsSquare(word2, potentialsSquares[k])
          const potentialSquareAnagram = IsSquareAnagram(patron, word1, potentialsSquares)
          if (potentialSquareAnagram !== false) {
            max = Math.max(potentialSquareAnagram, potentialsSquares[k], max)
          }
        }
      }
    }
  }
  return max
}

function CurrentWordFitsSquare (word, square) {
  const squareWord = square.toString()
  const dict = {}
  let constructedSquare = ''
  for (const letterIndex in word.word) {
    const letter = word.word[letterIndex]
    if (letter in Object.keys(dict)) {
      constructedSquare += dict[letter]
    } else {
      dict[letter] = squareWord[letterIndex]
      constructedSquare += dict[letter]
    }
  }
  if (Object.values(dict).unique().length < word.anagram.length) {
    return false
  }
  if (constructedSquare === squareWord) {
    return dict
  }
  return false
}

function IsSquareAnagram (patron, word, squares) {
  if (patron === false) {
    return false
  }
  let constructedNumber = ''
  for (const letter of word.word) {
    constructedNumber += patron[letter]
  }
  const num = Number.parseInt(constructedNumber)

  if (squares.includes(num)) {
    return num
  }
  return false
}

class Word {
  constructor (word) {
    this.word = word
    this.uniqueletters = word.split('').unique().sort().reduce((a, b) => { return a + b })
    this.anagram = this.word.split('').sort().reduce((a, b) => { return a + b })
  }
}

class Squares {
  constructor () {
    this.s1 = []
    this.s2 = []
    this.s3 = []
    this.s4 = []
    this.s5 = []
    this.s6 = []
    this.s7 = []
    this.s8 = []
    this.s9 = []
    this.GenerateSquares()
  }

  GenerateSquares () {
    let b = 1
    let s = 1
    while ((s = b ** 2) < 1000000000) {
      this.StoreSquare(s)
      ++b
    }
  }

  StoreSquare (s) {
    if (s < 10) {
      this.s1.push(s)
    } else if (s < 100) {
      this.s2.push(s)
    } else if (s < 1000) {
      this.s3.push(s)
    } else if (s < 10000) {
      this.s4.push(s)
    } else if (s < 100000) {
      this.s5.push(s)
    } else if (s < 1000000) {
      this.s6.push(s)
    } else if (s < 10000000) {
      this.s7.push(s)
    } else if (s < 100000000) {
      this.s8.push(s)
    } else if (s < 1000000000) {
      this.s9.push(s)
    }
  }

  GetSquares (l) {
    switch (l) {
      case 1:
        return this.s1
      case 2:
        return this.s2
      case 3:
        return this.s3
      case 4:
        return this.s4
      case 5:
        return this.s5
      case 6:
        return this.s6
      case 7:
        return this.s7
      case 8:
        return this.s8
      case 9:
        return this.s9
    }
  }
}

Array.prototype.unique = function () {
  var a = this.concat()
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) { a.splice(j--, 1) }
    }
  }

  return a
}
module.exports = p098
