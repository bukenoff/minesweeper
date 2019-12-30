<template>
  <div class="setup">
    <h1>Minesweeper</h1>
    <div class="levels">
      <button
        class="difficulty-level easy"
        data-rows="9"
        data-cols="9"
        data-bombs="9"
        data-difficulty="easy"
        @click="handleClick"
      >
        <div class="level-info">
          <span><b>Size:</b> 9x9</span>
          <span><b>Bombs:</b> 9</span>
        </div>
        <div class="play"><b>Play</b></div>
      </button>
      <button
        class="difficulty-level normal"
        data-rows="16"
        data-cols="16"
        data-bombs="40"
        data-difficulty="normal"
        @click="handleClick"
      >
        <div class="level-info">
          <span><b>Size:</b> 16x16</span>
          <span><b>Bombs:</b> 40</span>
        </div>
        <div class="play"><b>Play</b></div>
      </button>
      <button
        class="difficulty-level hard"
        data-rows="16"
        data-cols="30"
        data-bombs="99"
        data-difficulty="hard"
        @click="handleClick"
      >
        <div class="level-info">
          <span><b>Size:</b> 16x30</span>
          <span><b>Bombs:</b> 99</span>
        </div>
        <div class="play"><b>Play</b></div>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';

export default {
  name: 'Setup',
  computed: {},
  methods: {
    ...mapActions(['startOver']),
    handleClick(e) {
      const {
        cols,
        rows,
        bombs,
        difficulty,
      } = e.target.dataset;

      this.startOver({
        cols: +cols,
        rows: +rows,
        bombs: +bombs,
        difficulty,
      });
      this.$router.push('/game');
    },
  },
  components: {},
};
</script>

<style scoped lang="scss">
.setup {
  background: var(--white);
  display: flex;
  flex-direction: column;
  width: 300px;
}

.levels {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-around;
}

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
