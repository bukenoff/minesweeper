<template>
  <div class="row">
    <Cell
      v-for="col in cols"
      :key="row[col].id"
      :cell="row[col]"
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
    cols: Array,
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
