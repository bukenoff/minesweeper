<template>
  <button
    class="difficulty-level"
    :class="difficulty"
    @click="handleClick"
  >
    <div class="level-info">
      <span><b>Size:</b> {{ rows }}x{{ cols }}</span>
      <span><b>Bombs:</b> {{ bombs }}</span>
    </div>
    <div class="play">
      <b>Play</b>
    </div>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';

export default Vue.extend({
  name: 'LevelItem',
  props: {
    cols: String,
    rows: String,
    bombs: String,
    difficulty: String,
  },
  methods: {
    ...mapActions(['startOver']),
    handleClick(e: any) {
      this.startOver({
        cols: +this.cols,
        rows: +this.rows,
        bombs: +this.bombs,
        difficulty: this.difficulty,
      });

      this.$router.push('/game');
    },
  },
});
</script>

<style scoped lang="scss">

.level-info {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.difficulty-level {
  cursor: pointer;
  padding: 0.5rem;
  margin: 0.25rem 0;
  background-color: var(--white);
  display: flex;
  justify-content: space-between;
  align-items: center;

  &.easy {
    border: 3px solid var(--green);
    color: var(--green);

    &:hover {
      background-color: var(--green);
      color: var(--white);
    }
  }

  &.normal {
    border: 3px solid var(--yellow);
    color: var(--yellow);

    &:hover {
      background-color: var(--yellow);
      color: var(--white);
    }
  }

  &.hard {
    border: 3px solid var(--red);
    color: var(--red);

    &:hover {
      background-color: var(--red);
      color: var(--white);
    }
  }
}
</style>
