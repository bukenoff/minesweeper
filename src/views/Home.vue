<template>
  <div class="home">
    <Table :mines="showMines" />
  </div>
</template>

<script>
// @ is an alias to /src
import Table from '@/components/Table.vue';

export default {
  name: 'home',
  components: {
    Table,
  },
  computed: {
    showMines() {
      return Object.values(this.$store.state.mines);
    },
  },
};
</script>
