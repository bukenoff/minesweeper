<template>
  <div class="home">
    <Table
      :rows="rows"
      :cells="cells"
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
      cells: 'mines/cells',
      mines_table: 'mines/mines_table',
    }),
  },
};
</script>
