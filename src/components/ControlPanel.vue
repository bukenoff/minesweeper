<script setup lang="ts">
import { Smile, Frown, Laugh } from '@lucide/vue'
import type { Difficulty, GameState } from '@/models/minesweeper'

const { state, difficulty, flagsLeft, time } = defineProps<{
  state: GameState
  difficulty: Difficulty
  flagsLeft: number
  time: number
}>()

const emit = defineEmits<{
  restart: [value: Difficulty]
}>()

function onDifficultyChange(event: Event) {
  const value = (event.currentTarget as HTMLSelectElement).value

  if (value === 'easy' || value === 'normal' || value === 'hard') {
    emit('restart', value)
  } else {
    throw new Error('Unsupported difficulty level')
  }
}
</script>

<template>
  <div class="difficulty-select">
    <select id="difficulty-select" name="select" :value="difficulty" @change="onDifficultyChange">
      <option value="easy">easy</option>
      <option value="normal">medium</option>
      <option value="hard">hard</option>
    </select>
  </div>
  <div class="controls">
    <span class="controls__counter">{{ String(flagsLeft).padStart(3, '0') }}</span>
    <button class="controls__restart-button" @click="emit('restart', difficulty)">
      <Laugh v-if="state === 'victory'" :size="24" />
      <Frown v-else-if="state === 'loss'" :size="24" />
      <Smile v-else :size="24" />
    </button>
    <span class="controls__counter">{{ String(time).padStart(3, '0') }}</span>
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
  background: var(--bg-color);
  color: var(--fg-color);
}
</style>
