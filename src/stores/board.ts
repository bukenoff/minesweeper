import { defineStore } from 'pinia'

import { createMinesweeperGame } from '@/models/minesweeper'
import { computed } from 'vue'

export const useBoard = defineStore('board', () => {
  const game = createMinesweeperGame('easy')
  const state = computed(() => game.state)
  const flagsLeft = computed(() => game.flagsLeft)
  const cellsOpen = computed(() => game.cellsOpen)

  function openCell(row: number, col: number) {
    game.openCell(row, col)
  }

  function toggleFlagCell(row: number, col: number) {
    game.flagCell(row, col)
  }

  function restart() {
    game.flush()
  }

  return {
    board: game.board,
    state,
    flagsLeft,
    cellsOpen,
    openCell,
    toggleFlagCell,
    restart,
  }
})
