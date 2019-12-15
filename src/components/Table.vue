<template>
  <div class="table" :class="{ game_over: game_over }">
    <Row
      v-for="row in rows"
      :key="row"
      :row="mines_table[row]"
      :cols="cols"
    />
    <span v-if="game_over" class="game-over-overlay">
      <h1>game over</h1>
      <button @click="handleStartClick" type="button">start again</button>
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
import Row from './Row.vue';

export default Vue.extend({
  name: 'Table',
  props: {
    rows: Array,
    cols: Array,
    mines_table: Object,
  },
  components: {
    Row,
  },
  computed: {
    ...mapState({
      game_over: 'game_over',
    }),
  },
  methods: {
    ...mapActions({
      startOver: 'startOver',
    }),
    handleStartClick() {
      this.startOver();
    },
  },
});
</script>

<style scoped lang="scss">
@keyframes appear {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.table {
  width: 270px;
  height: 270px;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
}

.game_over {
  position: relative;

  .game-over-overlay {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: rgba(0,0,0,0.5);
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
    }
  }
}
</style>
