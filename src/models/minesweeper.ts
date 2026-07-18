import { ref, reactive } from 'vue'

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

export function createMinesweeperGame(difficulty: Difficulty) {
  let rows = 0
  let cols = 0
  let mines = 0
  let board: Board = reactive([])
  const state = ref<GameState>('pending')
  const cells_open = ref(0)
  const flags_left = ref(0)

  function init() {
    switch (difficulty) {
      case 'easy':
        rows = 9
        cols = 9
        mines = 9
        break
      case 'normal':
        rows = 16
        cols = 16
        mines = 40
        break
      case 'hard':
        rows = 16
        cols = 30
        mines = 99
        break

      default:
        throw new Error('Unsupported difficulty level')
    }

    flags_left.value = mines

    const newBoard = generateEmptyBoard(rows, cols)
    board.length = 0
    for (let i = 0; i < newBoard.length; i++) {
      board.push(newBoard[i])
    }
    state.value = 'pending'
    cells_open.value = 0
  }

  function totalCells() {
    return rows * cols
  }

  function flush() {
    init()
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
      const randow_row = Math.floor(Math.random() * rows)
      const randow_col = Math.floor(Math.random() * cols)

      if (randow_row === avoided_cell.row && randow_col === avoided_cell.col) {
        continue
      }

      const hash = Cell.encodeHashKey(randow_row, randow_col, cols)

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
      const neighborCell = board?.[neighbor.row]?.[neighbor.col]

      if (!neighborCell) {
        throw new Error(`Could not locate cell at row - ${neighbor.row}, col - ${neighbor.col}`)
      }

      neighborCell.mines_around += 1
    })
  }

  function plantMines(avoided_cell: Coordinates) {
    const mines_positions = generateMinesPositions(mines, avoided_cell)

    mines_positions.forEach((mine_position) => {
      const { row, col } = Cell.decodeHashKey(mine_position, cols)

      if (!board?.[row]?.[col]) {
        throw new Error(`Could not locate cell at row - ${row}, col - ${col}`)
      }

      board[row][col].has_mine = true
      plantHints(row, col)
    })
  }

  function getCellNeighbors(row: number, col: number): Coordinates[] {
    const maxRow = rows - 1
    const maxCol = cols - 1

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

  function flagCell(row: number, col: number) {
    const cell = board?.[row]?.[col]

    if (!cell) {
      throw new Error(`Could not locate cell at row - ${row}, col - ${col}`)
    }

    if (cell.is_open || !flags_left.value) {
      return
    }

    cell.is_flagged = !cell.is_flagged

    if (cell.is_flagged) {
      flags_left.value -= 1
    } else {
      flags_left.value += 1
    }
  }

  function openCell(row: number, col: number) {
    // Check bounds
    if (row < 0 || row >= rows || col < 0 || col >= cols) {
      return
    }

    const cell = board?.[row]?.[col]

    if (!cell) {
      throw new Error(`Could not locate cell at row - ${row}, col - ${col}`)
    }

    // Check state
    if (cell.is_open || cell.is_flagged) {
      return
    }
    if (state.value === 'loss' || state.value === 'victory') {
      return
    }
    // Start game if not started yet
    if (state.value === 'pending') {
      plantMines({ row, col })
      state.value = 'active'
    }

    if (!board?.[row]?.[col]) {
      throw new Error('oh no')
    }

    board[row][col].is_open = true
    cells_open.value += 1

    if (cell.has_mine) {
      state.value = 'loss'
      return
    } else {
    }

    if (cells_open.value === totalCells() - mines) {
      state.value = 'victory'
    }

    if (!cell.mines_around) {
      const neighbors = getCellNeighbors(row, col)

      neighbors.forEach((neighbor) => {
        setTimeout(() => openCell(neighbor.row, neighbor.col), 50)
      })
    }
  }

  init()

  return {
    get rows() {
      return rows
    },
    get cols() {
      return cols
    },
    get mines() {
      return mines
    },
    get board() {
      return board
    },
    get state() {
      return state.value
    },
    get cellsOpen() {
      return cells_open.value
    },
    get flagsLeft() {
      return flags_left.value
    },
    init,
    flush,
    flagCell,
    openCell,
  }
}
