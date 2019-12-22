<template>
  <div class="table">
    <Row
      v-for="row in rows"
      :key="row"
      :row="mines_table[row]"
      :cols="cols"
    />
    <GameOverOverlay v-if="game_over" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
import Row from './Row.vue';
import GameOverOverlay from './GameOverOverlay.vue';

export default Vue.extend({
  name: 'Table',
  props: {
    rows: Array,
    cols: Array,
    mines_table: Object,
    game_over: Boolean,
  },
  components: {
    Row,
    GameOverOverlay,
  },
});
</script>

<style scoped lang="scss">
.table {
  width: 270px;
  height: 270px;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  position: relative;
}
</style>
