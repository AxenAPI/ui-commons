import { nanoid } from 'nanoid';

export const createFakeData = (length: number = 10) => ({
  left: new Array(length).fill(null).map(() => ({
    name: 'Левый',
    surname: `${nanoid(3)}`,
    id: nanoid(),
  })),
  right: new Array(length).fill(null).map(() => ({
    name: 'Правый',
    surname: `${nanoid(3)}`,
    id: nanoid(),
  })),
});
