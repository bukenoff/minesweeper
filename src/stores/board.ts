import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'

import { createMinesweeperGame, type MinesweeperState } from '@/models/minesweeper'

export const useBoard = defineStore('board', () => {
  const state = reactive<MinesweeperState>({
    rows: 0,
    cols: 0,
    mines: 0,
    board: [],
    state: 'pending',
    cells_open: 0,
    flags_left: 0,
    difficulty: 'easy',
  })
  const game = createMinesweeperGame(state)
  const { board, state: gameState, cells_open, flags_left, difficulty, rows, cols } = toRefs(state)

  return {
    board,
    rows,
    cols,
    state: gameState,
    difficulty,
    flagsLeft: flags_left,
    cellsOpen: cells_open,
    openCell: game.openCell,
    toggleFlagCell: game.flagCell,
    restart: game.flush,
  }
})
