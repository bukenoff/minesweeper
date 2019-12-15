<template>
  <div class="table">
    <Row
      v-for="row in rows"
      :key="row"
      :row="mines_table[row]"
      :cols="cols"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
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
});
</script>

<style scoped lang="scss">
.table {
  width: 270px;
  height: 270px;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
}
</style>
