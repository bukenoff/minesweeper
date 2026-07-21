<script setup lang="ts">
import Board from './components/Board.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import ControlPanel from './components/ControlPanel.vue'
import BoardWrapper from './components/BoardWrapper.vue'

import './style.css'
</script>

<template>
  <BoardWrapper>
    <ThemeToggle></ThemeToggle>
    <ControlPanel></ControlPanel>
    <Board></Board>
  </BoardWrapper>
</template>
