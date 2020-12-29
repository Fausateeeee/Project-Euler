const { performance } = require('perf_hooks')
const fs = require('fs')
/*

    Su Doku (Japanese meaning number place) is the name given to a popular puzzle concept.
    Its origin is unclear, but credit must be attributed to Leonhard Euler who invented a similar,
    and much more difficult, puzzle idea called Latin Squares. The objective of Su Doku puzzles,
    however, is to replace the blanks (or zeros) in a 9 by 9 grid in such that each row, column,
    and 3 by 3 box contains each of the digits 1 to 9.
    Below is an example of a typical starting puzzle grid and its solution grid.

    0 0 3   0 2 0   6 0 0
    9 0 0   3 0 5   0 0 1
    0 0 1 	8 0 6   4 0 0

    0 0 8   1 0 2   9 0 0
    7 0 0   0 0 0   0 0 8
    0 0 6   7 0 8   2 0 0

    0 0 2   6 0 9   5 0 0
    8 0 0   2 0 3   0 0 9
    0 0 5   0 1 0 	3 0 0

    ************************

    4 8 3   9 2 1   6 5 7
    9 6 7   3 4 5   8 2 1
    2 5 1   8 7 6   4 9 3

    5 4 8   1 3 2   9 7 6
    7 2 9   5 6 4   1 3 8
    1 3 6   7 9 8	  2 4 5

    3 7 2   6 8 9 	5 1 4
    8 1 4   2 5 3   7 6 9
    6 9 5   4 1 7   3 8 2

    A well constructed Su Doku puzzle has a unique solution and can be solved by logic,
    although it may be necessary to employ "guess and test" methods in order
    to eliminate options (there is much contested opinion over this).
    The complexity of the search determines the difficulty of the puzzle;
    the example above is considered easy because it can be solved by straight forward direct deduction.

    The 6K text file, sudoku.txt (right click and 'Save Link/Target As...'),
    contains fifty different Su Doku puzzles ranging in difficulty,
    but all with unique solutions (the first puzzle in the file is the example above).

    By solving all fifty puzzles find the sum of the 3-digit numbers found in the top left corner of each solution grid;
    for example, 483 is the 3-digit number found in the top left corner of the solution grid above.

*/

function p096 (path) {
  const t0 = performance.now()
  const sudokus = SudokuReader(path)
  let answer = 0
  for (const sudoku of sudokus) {
    sudoku.Solve()
    answer += sudoku.GetAnswer()
  }

  const t1 = performance.now()
  return { answer: answer, time: t1 - t0 }
}

function SudokuReader (path) {
  const allSudokus = fs.readFileSync(path, 'utf8')

  const allRows = allSudokus.split('\n')
  const sudokus = []
  for (let row = 0; row < allRows.length; row += 10) {
    const sudoku = new Sudoku()
    for (let i = 1; i <= 9; i++) {
      sudoku.SetRow(allRows[row + i], i - 1)
    }
    sudokus.push(sudoku)
  }
  return sudokus
}

class Values {
  constructor () {
    this.row = 0
    this.col = 0
  }
}

class Sudoku {
  constructor () {
    this.grid =
    [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      []
    ]

    this.row = 0
    this.col = 0
  }

  SetRow (row, index) {
    this.grid[index] = row.split('')
  }

  NumberIsInCol (col, num) {
    for (let i = 0; i < 9; ++i) {
      if (this.grid[i][col] === num) {
        return true
      }
    }
    return false
  }

  NumberIsInRow (row, num) {
    for (let i = 0; i < 9; ++i) {
      if (this.grid[row][i] === num) {
        return true
      }
    }
    return false
  }

  NumberIsInBox (row, col, num) {
    for (let i = 0; i < 3; ++i) {
      for (let j = 0; j < 3; ++j) {
        if (this.grid[row + i][col + j] === num) {
          return true
        }
      }
    }
    return false
  }

  FindEmptySquare (v) {
    for (v.row = 0; v.row < 9; ++v.row) {
      for (v.col = 0; v.col < 9; ++v.col) {
        if (this.grid[v.row][v.col] === '0') {
          return true
        }
      }
    }
    return false
  }

  IsValidPlacement (row, col, num) {
    return !this.NumberIsInRow(row, num) && !this.NumberIsInCol(col, num) && !this.NumberIsInBox(row - (row % 3), col - (col % 3), num)
  }

  Solve () {
    const v = new Values()
    if (!this.FindEmptySquare(v)) {
      return true
    }
    for (let number = 1; number <= 9; ++number) {
      const num = number.toString()
      if (this.IsValidPlacement(v.row, v.col, num)) {
        this.grid[v.row][v.col] = num

        if (this.Solve()) {
          return true
        }
        this.grid[v.row][v.col] = '0'
      }
    }
    return false
  }

  Print () {
    for (const row of this.grid) {
      console.log(row.toString())
    }
    console.log('\n')
  }

  GetAnswer () {
    return parseInt(this.grid[0][0] + this.grid[0][1] + this.grid[0][2])
  }
}

module.exports = p096
