<template>
  <div class="container">
    <div
      class="game"
      :class="{
        'easy': difficulty === 'easy',
        'normal': difficulty === 'normal',
        'hard': difficulty === 'hard',
      }"
    >
      <Panel
        :flags_count="flags_count"
      />
      <Table
        :rows="rows"
        :cols="cols"
        :mines_table="mines_table"
        :game_over="game_over"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import Table from '@/components/Table.vue';
import Panel from '@/components/Panel.vue';

export default {
  name: 'Game',
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
    ...mapState(['game_over', 'difficulty']),
    ...mapState('mines', ['flags_count']),
  },
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
}

.game {
  display: flex;
  flex-direction: column;
  width: 270px;

  &.easy {
    width: 270px;
    height: 270px;
  }

  &.normal {
    width: 480px;
    height: 480px;
  }

  &.hard {
    width: 900px;
    height: 480px;
  }
}
</style>
