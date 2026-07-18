<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import Cell from './Cell.vue'
import { useBoard } from '../stores/board'
import { useCursor } from '../stores/cursor'

const boardStore = useBoard()
const cursorStore = useCursor()

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowUp' || e.key === 'k') {
    cursorStore.moveCursor('up')
  }
  if (e.key === 'ArrowDown' || e.key === 'j') {
    cursorStore.moveCursor('down')
  }
  if (e.key === 'ArrowLeft' || e.key === 'h') {
    cursorStore.moveCursor('left')
  }
  if (e.key === 'ArrowRight' || e.key === 'l') {
    cursorStore.moveCursor('right')
  }
  if (e.key === ' ') {
    boardStore.openCell(cursorStore.cursorRow, cursorStore.cursorCol)
  }
  if (e.key === 'f') {
    boardStore.toggleFlagCell(cursorStore.cursorRow, cursorStore.cursorCol)
  }
}

function handleMouseOver(e: MouseEvent) {
  // update cursor from event target
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="board">
    <template v-for="(row, rowIndex) in boardStore.board" :key="rowIndex">
      <Cell
        v-for="(item, itemIndex) in row"
        :id="itemIndex"
        :has_mine="item.has_mine"
        :row="item.row"
        :col="item.col"
        :is_open="item.is_open"
        :mines_around="item.mines_around"
        :is_flagged="item.is_flagged"
        :isSelected="cursorStore.cursorRow === item.row && cursorStore.cursorCol === item.col"
        @open="boardStore.openCell"
        @flag="boardStore.toggleFlagCell"
      />
    </template>
  </div>
</template>

<style scoped>
.board {
  width: fit-content;
  display: grid;
  grid-template-rows: repeat(9, 1fr);
  grid-template-columns: repeat(9, 1fr);
}
</style>
