<template>
  <div class="cell">
    1
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Cell',
  props: {
    msg: String,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.cell {
  height: 30px;
  width: 30px;
  border: 3px inset #ccc;
  background-color: #f5f5f5;
  cursor: pointer;
  transition:
    background-color 0.25s ease,
    border-width 0.25s ease;

  &:hover {
    background-color: #e5e5e5;
  }

  &:active {
    border-width: 4px;
  }
}
</style>
