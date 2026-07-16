<script setup lang="ts">
import Board from './components/Board.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import ControlPanel from './components/ControlPanel.vue'

import './style.css'
</script>

<template>
  <div style="border: 5px solid var(--fg-color)">
    <ThemeToggle></ThemeToggle>
    <ControlPanel></ControlPanel>
    <Board></Board>
  </div>
</template>
