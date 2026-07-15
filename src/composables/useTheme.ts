// 1. Create src/composables/useTheme.ts
//
// - Sync document.documentElement.dataset.colorMode whenever theme changes
// - Persist to localStorage on changes
// - Listen to matchMedia('prefers-color-scheme: dark') for live system preference changes (only when no user override is saved)
// - Expose a toggleTheme() function
//
// 2. Add toggle button to App.vue
//
// Simple button near the board that calls toggleTheme(). The composable will be used in App.vue's <script setup>.
//
// 3. Remove hardcoded data-color-mode="light" from index.html
//
// The composable sets it on mount, and keeping it hardcoded causes a flash on dark-mode users' first visit.
//
// Your existing style.css with data-color-mode selectors and CSS variables already supports this perfectly — no changes needed there.
//
// Ready to implement when you are.

import { ref } from 'vue'

export function useTheme() {
  const initialMode = localStorage.getItem('theme') || 'light'
  const theme = ref(initialMode)

  function toggleTheme() {
    console.log('theme is', theme.value)
    if (theme.value === 'light') {
      theme.value = 'dark'
      document.documentElement.dataset.colorMode = 'dark'
    } else {
      theme.value = 'light'
      document.documentElement.dataset.colorMode = 'light'
    }
  }

  return {
    theme,
    toggleTheme,
  }
}
