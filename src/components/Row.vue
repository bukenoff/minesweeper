<template>
  <div class="row">
    <Cell v-for="cell in Object.values(row)" :key="cell.id" :cell="cell" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Cell from './Cell.vue';

export default Vue.extend({
  name: 'Row',
  props: {
    row: Object,
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
