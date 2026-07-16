<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { Sun, Moon } from '@lucide/vue'

import { useTheme } from '../composables/useTheme'

const { theme, toggleTheme } = useTheme()
</script>

<template>
  <button class="button" @click="toggleTheme">
    <Sun v-if="theme === 'dark'" color="white" />
    <Moon v-else />
  </button>
</template>

<style scoped>
.button {
  padding: 0;
  height: 2rem;
  width: 2rem;
  background: var(--bg-color);
  border-style: solid;
  border-color: var(--fg-color);
  right: 1rem;
  top: 1rem;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
