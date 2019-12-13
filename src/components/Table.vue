<template>
  <div class="table">
    <Cell />
    {{ mines }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Cell from './Cell.vue';

export default Vue.extend({
  name: 'Table',
  props: {
    mines: Array,
  },
  components: {
    Cell,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.table {
  width: 270px;
  height: 270px;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
}
</style>
