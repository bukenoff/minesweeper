<template>
  <div class="panel">
    <button
      class="restart"
      @click="handleRestartClick"
    >
      restart
    </button>
    <div class="flags">
      <img src="@/assets/img/flag.svg" />
      {{ flags_count }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';

export default Vue.extend({
  name: 'Panel',
  props: {
    flags_count: Number,
  },
  computed: {
    ...mapState(['difficulty']),
    ...mapState('mines', ['rows_count', 'cols_count', 'bombs_count']),
  },
  methods: {
    ...mapActions(['startOver']),
    handleRestartClick(e: any) {
      this.startOver({
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
.panel {
  display: flex;
  justify-content: space-between;
  background-color: var(--white);
  padding: 0.25rem;
}

.restart {
  padding: 0 5px;
  border: none;
  background-color: var(--green);
  color: var(--white);
  text-transform: uppercase;
  outline: none;
  cursor: pointer;
  transition:
    background-color 0.25s ease,
    transform 0.25s ease;

  &:hover {
    background-color: var(--black);
  }

  &:active {
    transform: scale(0.95);
  }
}

.flags {
  display: flex;
  align-items: center;

  & img {
    width: 12px;
    height: 12px;
    margin-right: 5px;
  }
}
</style>
