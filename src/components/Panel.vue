<template>
  <div class="panel">
    <div>9x9</div>
    <div>{{ flags_count }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Panel',
  props: {
    flags_count: Number,
  },
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
