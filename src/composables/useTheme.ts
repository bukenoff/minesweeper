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
