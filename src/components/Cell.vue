<script setup lang="ts">
import { useBoard } from '../stores/board'

const { row, col, is_open, mines_around, has_mine, is_flagged, isSelected } = defineProps<{
  id: number
  has_mine: boolean
  row: number
  col: number
  is_open: boolean
  mines_around: number
  is_flagged: boolean
  isSelected: boolean
}>()

const boardStore = useBoard()

function handleOpenClick() {
  console.log('click')
  boardStore.openCell(row, col)
}

function handleToggleFlagClick() {
  console.log('clack')
  boardStore.toggleFlagCell(row, col)
}
</script>

<template>
  <button
    class="cell"
    :class="[
      {
        'cell--open': is_open,
        'cell--selected': isSelected,
      },
      `cell__number--${mines_around}`,
    ]"
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

.cell--selected {
  background-color: #e5e5e5;
}

.cell__icon {
  width: 0.75rem;
  height: 0.75rem;
}

.cell--number__0 {
  color: transparent;
}

.cell__number--1 {
  color: #7ba05b;
}

.cell__number--2 {
  color: #c4847a;
}

.cell__number--3 {
  color: #e07a5f;
}

.cell__number--4 {
  color: #8b7bab;
}

.cell__number--5 {
  color: #d4956a;
}

.cell__number--6 {
  color: #5b8a8b;
}

.cell__number--7 {
  color: #4a4a48;
}

.cell__number--8 {
  color: #9b9b8e;
}
</style>
