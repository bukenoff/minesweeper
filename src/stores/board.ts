import { defineStore } from 'pinia'

import { createMinesweeperGame } from '@/models/minesweeper'

export const useBoard = defineStore('board', () => {
  const game = createMinesweeperGame('easy')

  function openCell(row: number, col: number) {
    game.openCell(row, col)
  }

  function toggleFlagCell(row: number, col: number) {
    game.flagCell(row, col)
  }

  function flush() {
    game.flush()
  }

  return {
    board: game.board,
    state: game.state,
    flagsLeft: game.flagsLeft,
    cellsOpen: game.cellsOpen,
    openCell,
    toggleFlagCell,
    flush,
  }
})
