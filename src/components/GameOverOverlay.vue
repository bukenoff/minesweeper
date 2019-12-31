<template>
  <div class="game-over-overlay">
    <h1 class="loss-result" v-if="loss">you lost</h1>
    <h1 class="win-result" v-if="win">you won</h1>
    <button
      @click="handleStartClick"
      type="button"
    >
      start again
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';

export default Vue.extend({
  name: 'GameOverOverlay',
  computed: {
    ...mapState([
      'game_result',
      'game_over',
      'difficulty',
    ]),
    ...mapState('mines', ['rows_count', 'cols_count', 'bombs_count']),
    loss() {
      return this.game_result === 'loss' && this.game_over;
    },
    win() {
      return this.game_result === 'win' && this.game_over;
    },
  },
  methods: {
    ...mapActions(['startOver']),
    handleStartClick(e: any) {
      // Ugly workaround of some ts bug that I encountered
      // I know I know, it looks bad
      (this as any).startOver({
        rows: this.rows_count,
        cols: this.cols_count,
        bombs: this.bombs_count,
        difficulty: this.difficulty,
      });
    },
  },
});
</script>

<style scoped lang="scss">
@keyframes growAndGetRed {
  from {
    transform: scale(0.9);
    color: white;
  }

  to {
    transform: scale(1);
    color: var(--red);
  }
}

@keyframes growAndGetGreen {
  from {
    transform: scale(0.9);
    color: white;
  }

  to {
    transform: scale(1);
    color: var(--green);
  }
}

.game-over-overlay {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(0,0,0,0.75);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  font-weight: bold;
  user-select: none;
  animation: appear 0.5s 1;

  & button {
    text-transform: capitalize;
    padding: 0.25rem;
    cursor: pointer;
    border: none;
    outline: none;
    background-color: var(--green);
    color: var(--white);
    font-weight: bold;
    transition: transform 0.25s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  .loss-result {
    color: var(--red);
    font-weight: bold;
    animation: growAndGetRed 1s 1;
  }

  .win-result {
    color: var(--green);
    font-weight: bold;
    animation: growAndGetGreen 1s 1;
  }
}
</style>
