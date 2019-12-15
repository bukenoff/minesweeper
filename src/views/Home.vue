<template>
  <div class="home">
    <div class="game">
      <Panel />
      <Table
        :rows="rows"
        :cols="cols"
        :mines_table="mines_table"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Table from '@/components/Table.vue';
import Panel from '@/components/Panel.vue';

export default {
  name: 'home',
  components: {
    Table,
    Panel,
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

<style scoped lang="scss">
.home {
  display: flex;
  justify-content: center;
}

.game {
  display: flex;
  flex-direction: column;
  width: 270px;
}
</style>
