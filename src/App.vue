<script setup lang="ts">
import Board from './components/Board.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import ControlPanel from './components/ControlPanel.vue'
import BoardWrapper from './components/BoardWrapper.vue'

import './style.css'
import { useBoard } from './stores/board'
import { useTimer } from './composables/useTimer'

const boardStore = useBoard()
const timerStore = useTimer(() => boardStore.state)
</script>

<template>
  <BoardWrapper>
    <ThemeToggle></ThemeToggle>
    <ControlPanel
      :state="boardStore.state"
      :difficulty="boardStore.difficulty"
      :flagsLeft="boardStore.flagsLeft"
      :time="timerStore.time.value"
      @restart="boardStore.restart"
    ></ControlPanel>
    <Board></Board>
  </BoardWrapper>
</template>
