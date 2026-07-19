import { ref, watch, type Ref } from 'vue'

import type { GameState } from '@/models/minesweeper'

export function useTimer(state: () => GameState) {
  let intervalId: ReturnType<typeof setInterval> = 0
  const time = ref(0)

  watch(state, (newState) => {
    if (newState === 'active') {
      time.value = 0
      intervalId = setInterval(() => (time.value += 1), 1000)
    } else if (newState === 'pending') {
      time.value = 0
    } else {
      clearInterval(intervalId)
    }
  })

  return {
    time,
  }
}
