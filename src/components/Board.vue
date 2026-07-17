<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import Cell from './Cell.vue'
import { useBoard } from '../stores/board'
import { useCursor } from '../stores/cursor'

const boardStore = useBoard()

const { board } = storeToRefs(boardStore)

const { cursorRow, cursorCol } = storeToRefs(useCursor())
const { moveCursor } = useCursor()

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowUp' || e.key === 'k') {
    moveCursor('up')
  }
  if (e.key === 'ArrowDown' || e.key === 'j') {
    moveCursor('down')
  }
  if (e.key === 'ArrowLeft' || e.key === 'h') {
    moveCursor('left')
  }
  if (e.key === 'ArrowRight' || e.key === 'l') {
    moveCursor('right')
  }
  if (e.key === ' ') {
    boardStore.openCell(cursorRow.value, cursorCol.value)
  }
  if (e.key === 'f') {
    boardStore.toggleFlagCell(cursorRow.value, cursorCol.value)
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
    <template v-for="(row, rowIndex) in board" :key="rowIndex">
      <Cell
        v-for="(item, itemIndex) in row"
        :id="itemIndex"
        :has_mine="item.has_mine"
        :row="item.row"
        :col="item.col"
        :is_open="item.is_open"
        :mines_around="item.mines_around"
        :is_flagged="item.is_flagged"
        :isSelected="cursorRow === item.row && cursorCol === item.col"
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
