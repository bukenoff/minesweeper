<template>
  <div class="row">
    <Cell
      v-for="cell in cells"
      :key="cell.id"
      :cell="row[cell]"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Cell from './Cell.vue';

export default Vue.extend({
  name: 'Row',
  props: {
    row: Object,
    cells: Array,
  },
  components: {
    Cell,
  },
});
</script>

<style scoped lang="scss">
.row {
  display: flex;
}
</style>
