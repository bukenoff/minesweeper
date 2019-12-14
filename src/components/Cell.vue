<template>
  <div
    class="cell"
    :class="{
      open: cell.is_open,
      flagged: cell.is_flagged,
    }"
    @click="handleOpenClick"
    @click.right.prevent="handleToggleFlagClick"
  >
    {{ cell.bombs_around }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';

export default Vue.extend({
  name: 'Cell',
  props: {
    cell: Object,
  },
  methods: {
    ...mapActions({
      openCell: 'mines/openCell',
      toggleFlagCell: 'mines/toggleFlagCell',
    }),
    handleOpenClick() {
      const {
        is_open,
        col, row,
        is_flagged,
      } = this.cell;

      if (is_open || is_flagged) {
        return null;
      }

      const cell_position = {
        col,
        row,
      };

      this.openCell(cell_position);

      return null;
    },
    handleToggleFlagClick() {
      const { is_open, col, row } = this.cell;
      if (is_open) {
        return null;
      }

      const cell_position = {
        col,
        row,
      };

      this.toggleFlagCell(cell_position);

      return null;
    },
  },
});
</script>

<style scoped lang="scss">
.cell {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
  border: 3px inset #ccc;
  background-color: #f5f5f5;
  cursor: pointer;
  transition:
    background-color 0.25s ease,
    color 0.25s ease;
  user-select: none;
  color: transparent;
  font-weight: bold;

  &:hover {
    background-color: #e5e5e5;
  }

  &:active {
    background-color: #c2c2c2;
  }

  &.open {
    background-color: #fefefe;
    border-width: 0;
    color: black;
  }

  &.flagged {
    background-color: red;
  }
}
</style>
