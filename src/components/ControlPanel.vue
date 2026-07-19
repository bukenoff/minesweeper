<script setup lang="ts">
import { Smile, Frown, Laugh } from '@lucide/vue'
import { useBoard } from '../stores/board'
import { useTimer } from '../composables/useTimer'

const boardStore = useBoard()
const timerStore = useTimer(() => boardStore.state)
</script>

<template>
  <div class="difficulty-select">
    <select name="select">
      <option value="easy">easy</option>
      <option value="medium">medium</option>
      <option value="hard">hard</option>
    </select>
  </div>
  <div class="controls">
    <span class="controls__counter">{{ String(boardStore.flagsLeft).padStart(3, '0') }}</span>
    <button class="controls__restart-button" @click="boardStore.restart">
      <Laugh v-if="boardStore.state === 'victory'" size="16" />
      <Frown v-else-if="boardStore.state === 'loss'" size="16" />
      <Smile v-else size="16" />
    </button>
    <span class="controls__counter">{{ String(timerStore.time.value).padStart(3, '0') }}</span>
  </div>
</template>

<style scoped>
.difficulty-select {
  background: var(--bg-color);
}

.controls {
  background: var(--bg-color);
  display: flex;
  justify-content: space-between;
}

.controls__counter {
  padding: 0.1rem 0.2rem;
  background: var(--fg-color);
  color: var(--bg-color);
}

.controls__restart-button {
  padding: 0;
  border: none;
  cursor: pointer;
}
</style>
