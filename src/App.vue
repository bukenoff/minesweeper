<script setup lang="ts">
import Board from './components/Board.vue'

import './style.css'
import { useTheme } from './composables/useTheme'

const { toggleTheme } = useTheme()
</script>

<template>
  <button @click="toggleTheme">switch theme</button>
  <Board></Board>
</template>
