const areAllCellsOpen = (
  cells_open: number,
  rows: number,
  cols: number,
  bombs: number,
): boolean => {
  console.log('CELLS OPEN', cells_open);
  console.log(cells_open === (rows * cols - bombs));
  return cells_open === (rows * cols - bombs);
};

export { areAllCellsOpen };
