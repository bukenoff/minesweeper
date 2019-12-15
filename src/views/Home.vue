<template>
  <div class="home">
    <Table
      :rows="rows"
      :cols="cols"
      :mines_table="mines_table"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Table from '@/components/Table.vue';

export default {
  name: 'home',
  components: {
    Table,
  },
  computed: {
    ...mapGetters({
      rows: 'mines/rows',
      cols: 'mines/cols',
      mines_table: 'mines/mines_table',
    }),
  },
};
</script>
