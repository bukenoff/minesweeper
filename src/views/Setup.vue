<template>
  <div class="setup">
    <h1>Minesweeper</h1>
    <div class="levels">
      <LevelItem
        :cols="LEVELS.EASY.cols"
        :rows="LEVELS.EASY.rows"
        :bombs="LEVELS.EASY.bombs"
        :difficulty="LEVELS.EASY.name"
      />
      <LevelItem
        :cols="LEVELS.NORMAL.cols"
        :rows="LEVELS.NORMAL.rows"
        :bombs="LEVELS.NORMAL.bombs"
        :difficulty="LEVELS.NORMAL.name"
      />
      <LevelItem
        :cols="LEVELS.HARD.cols"
        :rows="LEVELS.HARD.rows"
        :bombs="LEVELS.HARD.bombs"
        :difficulty="LEVELS.HARD.name"
      />
    </div>
  </div>
</template>

<script>
import LevelItem from '@/components/LevelItem.vue';
import { LEVELS } from '@/constants';

export default {
  name: 'Setup',
  computed: { LEVELS: () => LEVELS },
  methods: {},
  components: {
    LevelItem,
  },
};
</script>

<style scoped lang="scss">
.setup {
  background: var(--white);
  display: flex;
  flex-direction: column;
  width: 300px;
}

.levels {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-around;
}

</style>
