import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

import { MinesweeperModel } from '@/models/minesweeper'

export const useBoard = defineStore('board', () => {
  const model = new MinesweeperModel('easy')
  const board = reactive(model.board)

  function openCell(row: number, col: number) {
    model.openCell(row, col, board)
  }

  function toggleFlagCell(row: number, col: number) {
    model.flagCell(row, col, board)
  }

  return { board, openCell, toggleFlagCell }
})
