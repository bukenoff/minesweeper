import { IConfig } from '@/types';

export const generateRandomIndexes = ({
  rows,
  cols,
  bombs,
}: IConfig): string[] => {
  const random_indexes: string[] = [];

  while (random_indexes.length !== bombs) {
    const random_index = Math.floor(Math.random() * rows) + '-' + Math.floor(Math.random() * cols);

    if (!random_indexes.includes(random_index)) {
      random_indexes.push(random_index);
    }
  }

  return random_indexes;
};
