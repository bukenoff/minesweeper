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
  })
  const game = createMinesweeperGame(state, 'easy')
  const { board, state: gameState, cells_open, flags_left } = toRefs(state)

  return {
    board,
    state: gameState,
    flagsLeft: flags_left,
    cellsOpen: cells_open,
    openCell: game.openCell,
    toggleFlagCell: game.flagCell,
    restart: game.flush,
  }
})
