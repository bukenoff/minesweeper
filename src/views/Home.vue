<template>
  <div class="home">
    <div class="game">
      <Panel :flags_count="flags_count" />
      <Table
        :rows="rows"
        :cols="cols"
        :mines_table="mines_table"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
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
    ...mapState({
      game_over: 'game_over',
      flags_count: 'mines/flags_count',
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
