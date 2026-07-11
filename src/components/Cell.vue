<script setup lang="ts">
import { useBoard } from '../stores/board'

const { row, col, is_open, mines_around, has_mine, is_flagged } = defineProps<{
  id: number
  has_mine: boolean
  row: number
  col: number
  is_open: boolean
  mines_around: number
  is_flagged: boolean
}>()

const { openCell, toggleFlagCell } = useBoard()

function handleOpenClick() {
  console.log('click')
  openCell(row, col)
}

function handleToggleFlagClick() {
  console.log('clack')
  toggleFlagCell(row, col)
}
</script>

<template>
  <button
    class="cell"
    :class="{
      'cell--open': is_open,
    }"
    @click="handleOpenClick"
    @contextmenu.prevent="handleToggleFlagClick"
  >
    <span v-if="is_open">
      {{ mines_around && !has_mine ? mines_around : '' }}
    </span>
    <img class="cell__icon" v-if="has_mine && is_open" src="@/assets/bomb.svg" />
    <img class="cell__icon" v-if="is_flagged" src="@/assets/flag.svg" />
  </button>
</template>

<style scoped>
.cell {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.75rem;
  width: 1.75rem;
  border: 3px inset #ccc;
  background-color: #f5f5f5;
  cursor: pointer;
  user-select: none;
  color: transparent;
  font-weight: bold;
  outline: none;

  &:hover {
    background-color: #e5e5e5;
  }

  &:active {
    background-color: #c2c2c2;
  }
}

.cell--open {
  background-color: #fefefe;
  border: 1px solid #ccc;
  color: black;
}

.cell__icon {
  width: 0.75rem;
  height: 0.75rem;
}
</style>
