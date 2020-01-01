<template>
  <div class="setup">
    <h1>Minesweeper</h1>
    <div class="levels">
      <LevelItem
        cols="9"
        rows="9"
        bombs="9"
        difficulty="easy"
      />
      <LevelItem
        cols="16"
        rows="16"
        bombs="40"
        difficulty="normal"
      />
      <LevelItem
        cols="30"
        rows="16"
        bombs="99"
        difficulty="hard"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import LevelItem from '@/components/LevelItem.vue';

export default {
  name: 'Setup',
  computed: {},
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
