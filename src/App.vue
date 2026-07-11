<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Cell from './components/Cell.vue'
import { useBoard } from './stores/board'
import './style.css'

const boardStore = useBoard()

const { board } = storeToRefs(boardStore)
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
