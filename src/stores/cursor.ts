import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCursor = defineStore('cursor', () => {
  const cursorRow = ref(0)
  const cursorCol = ref(0)

  function moveCursor(direction: 'up' | 'right' | 'down' | 'left') {
    switch (direction) {
      case 'up':
        cursorRow.value = Math.max(cursorRow.value - 1, 0)
        break
      case 'right':
        cursorCol.value = Math.min(cursorCol.value + 1, 8)
        break
      case 'down':
        cursorRow.value = Math.min(cursorRow.value + 1, 8)
        break
      case 'left':
        cursorCol.value = Math.max(cursorCol.value - 1, 0)
        break
      default:
        throw new Error('unknown direction')
    }
  }

  return {
    cursorRow,
    cursorCol,
    moveCursor,
  }
})
