const areAllCellsOpen = (
  cells_open: number,
  rows: number,
  cols: number,
  bombs: number,
): boolean => {
  return cells_open === (rows * cols - bombs);
};

export { areAllCellsOpen };
