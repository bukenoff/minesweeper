<template>
  <button
    class="cell"
    :class="{
      open: cell.is_open,
      flagged: cell.is_flagged,
      exploded: cell.is_open && cell.has_bomb,
    }"
    @click="handleOpenClick"
    @click.right.prevent="handleToggleFlagClick"
  >
    <span v-if="cell.is_open">
      {{ cell.bombs_around && !cell.has_bomb ? cell.bombs_around : '' }}
    </span>
    <img v-if="cell.has_bomb && cell.is_open" src="@/assets/img/bomb.svg" />
    <img v-if="cell.is_flagged" src="@/assets/img/flag.svg" />
  </button>
</template>

<script lang="ts">
/* eslint-disable no-unused-expressions */
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
      openEmptyCell: 'mines/openEmptyCell',
      toggleFlagCell: 'mines/toggleFlagCell',
    }),

    handleOpenClick() {
      const {
        is_open,
        col, row,
        is_flagged,
        bombs_around,
      } = this.cell;

      if (is_open || is_flagged) {
        return null;
      }

      const cell_position = {
        col,
        row,
      };

      if (bombs_around === 0) {
        this.openEmptyCell(cell_position);
        return null;
      }

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
  outline: none;

  & img {
    width: 12px;
    height: 12px;
  }

  &:hover {
    background-color: #e5e5e5;
  }

  &:active {
    background-color: #c2c2c2;
  }

  &.open {
    background-color: #fefefe;
    border: 1px solid #ccc;
    color: black;

  }

  &.flagged {
    background-color: var(--green);
  }

  &.exploded {
    background-color: var(--red);
  }
}
</style>
