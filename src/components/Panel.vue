<template>
  <div class="panel">
    <div>9x9</div>
    <div>9</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Panel',
  props: {},
  components: {},
});
</script>

<style scoped lang="scss">
.panel {
  display: flex;
  background-color: var(--white);
  padding: 0.25rem;
}
</style>
