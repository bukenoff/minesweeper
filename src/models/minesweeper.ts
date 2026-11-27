type Coordinates = {
  row: number
  col: number
}

export class Cell {
  row: number
  col: number
  has_mine: boolean
  mines_around: number
  is_open: boolean
  is_flagged: boolean
  id: number

  static lastId = 0

  constructor(row: number, col: number) {
    this.row = row
    this.col = col
    this.has_mine = false
    this.mines_around = 0
    this.is_open = false
    this.is_flagged = false
    this.id = Cell.lastId++
  }

  static encodeHashKey(row: number, col: number, max_col: number): number {
    return row * max_col + col
  }

  static decodeHashKey(key: number, max_col: number): Coordinates {
    const row = Math.floor(key / max_col)
    const col = key % max_col
    return { row, col }
  }
}

export type Difficulty = 'easy' | 'normal' | 'hard'

export type Board = Cell[][]

export type GameState = 'pending' | 'active' | 'victory' | 'loss'

export type MinesweeperState = {
  rows: number
  cols: number
  mines: number
  board: Board
  state: GameState
  cells_open: number
  flags_left: number
  difficulty: Difficulty
}

export function createMinesweeperGame(state: MinesweeperState) {
  function init(newDifficulty: Difficulty) {
    state.difficulty = newDifficulty

    switch (newDifficulty) {
      case 'easy':
        state.rows = 9
        state.cols = 9
        state.mines = 9
        break
      case 'normal':
        state.rows = 16
        state.cols = 16
        state.mines = 40
        break
      case 'hard':
        state.rows = 16
        state.cols = 30
        state.mines = 99
        break

      default:
        throw new Error('Unsupported difficulty level')
    }

    state.flags_left = state.mines

    const newBoard = generateEmptyBoard(state.rows, state.cols)

    state.board.length = 0
    for (let i = 0; i < newBoard.length; i++) {
      state.board.push(newBoard[i])
    }
    state.state = 'pending'
    state.cells_open = 0
  }

  function totalCells() {
    return state.rows * state.cols
  }

  function flush(newDifficulty: Difficulty) {
    init(newDifficulty)
    Cell.lastId = 0
  }

  function generateEmptyBoard(rows: number, cols: number) {
    const board = new Array(rows)

    for (let i = 0; i < board.length; i++) {
      board[i] = new Array(cols)

      for (let j = 0; j < board[i].length; j++) {
        board[i][j] = new Cell(i, j)
      }
    }

    return board
  }

  function generateMinesPositions(count: number, avoided_cell: Coordinates): Set<number> {
    const positions = new Set<number>()

    while (count) {
      const randow_row = Math.floor(Math.random() * state.rows)
      const randow_col = Math.floor(Math.random() * state.cols)

      if (randow_row === avoided_cell.row && randow_col === avoided_cell.col) {
        continue
      }

      const hash = Cell.encodeHashKey(randow_row, randow_col, state.cols)

      if (positions.has(hash)) {
        continue
      }

      positions.add(hash)
      count -= 1
    }

    return positions
  }

  function plantHints(row: number, col: number) {
    const neighbors = getCellNeighbors(row, col)

    neighbors.forEach((neighbor) => {
      const neighborCell = state.board?.[neighbor.row]?.[neighbor.col]

      if (!neighborCell) {
        throw new Error(`Could not locate cell at row - ${neighbor.row}, col - ${neighbor.col}`)
      }

      neighborCell.mines_around += 1
    })
  }

  function plantMines(avoided_cell: Coordinates) {
    const mines_positions = generateMinesPositions(state.mines, avoided_cell)

    mines_positions.forEach((mine_position) => {
      const { row, col } = Cell.decodeHashKey(mine_position, state.cols)

      if (!state.board?.[row]?.[col]) {
        throw new Error(`Could not locate cell at row - ${row}, col - ${col}`)
      }

      state.board[row][col].has_mine = true
      plantHints(row, col)
    })
  }

  function getCellNeighbors(row: number, col: number): Coordinates[] {
    const maxRow = state.rows - 1
    const maxCol = state.cols - 1

    return [
      { row: row - 1, col },
      { row: row - 1, col: col - 1 },
      { row: row - 1, col: col + 1 },
      { row: row + 1, col },
      { row: row + 1, col: col - 1 },
      { row: row + 1, col: col + 1 },
      { row, col: col - 1 },
      { row, col: col + 1 },
    ].filter(
      (neighbor) =>
        neighbor.row !== -1 &&
        neighbor.col !== -1 &&
        neighbor.row !== maxRow + 1 &&
        neighbor.col !== maxCol + 1,
    )
  }

  function flagCell(row: number, col: number): void {
    const cell = state.board?.[row]?.[col]

    if (!cell) {
      throw new Error(`Could not locate cell at row - ${row}, col - ${col}`)
    }

    if (cell.is_open || !state.flags_left) {
      return
    }

    cell.is_flagged = !cell.is_flagged

    if (cell.is_flagged) {
      state.flags_left -= 1
    } else {
      state.flags_left += 1
    }
  }

  function openCell(row: number, col: number) {
    // Check bounds
    if (row < 0 || row >= state.rows || col < 0 || col >= state.cols) {
      return
    }

    const cell = state.board?.[row]?.[col]

    if (!cell) {
      throw new Error(`Could not locate cell at row - ${row}, col - ${col}`)
    }

    // Check state
    if (cell.is_open || cell.is_flagged) {
      return
    }
    if (state.state === 'loss' || state.state === 'victory') {
      return
    }
    // Start game if not started yet
    if (state.state === 'pending') {
      plantMines({ row, col })
      state.state = 'active'
    }

    if (!state.board?.[row]?.[col]) {
      throw new Error('oh no')
    }

    state.board[row][col].is_open = true
    state.cells_open += 1

    if (cell.has_mine) {
      state.state = 'loss'
      return
    } else {
    }

    if (state.cells_open === totalCells() - state.mines) {
      state.state = 'victory'
    }

    if (!cell.mines_around) {
      const neighbors = getCellNeighbors(row, col)

      neighbors.forEach((neighbor) => {
        setTimeout(() => openCell(neighbor.row, neighbor.col), 50)
      })
    }
  }

  init(state.difficulty)

  return {
    flush,
    flagCell,
    openCell,
  }
}
