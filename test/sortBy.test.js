import { sortBy } from '../src';
const arr = [
  {
    id: '1',
    name: 'yue',
    friend: 'heizi',
  },
  {
    id: '2',
    name: 'yue',
    friend: 'you',
  },
  {
    id: '3',
    name: 'yue',
    friend: 'joe',
  },
];

test(`The result is Positive order Array.`, () => {
  expect(sortBy(arr, ['id'])).toEqual([
    {
      id: '1',
      name: 'yue',
      friend: 'heizi',
    },
    {
      id: '2',
      name: 'yue',
      friend: 'you',
    },
    {
      id: '3',
      name: 'yue',
      friend: 'joe',
    },
  ]);
});

test(`The result Desc order Array.`, () => {
  expect(sortBy(arr, ['id'], 'desc')).toEqual([
    {
      id: '3',
      name: 'yue',
      friend: 'joe',
    },
    {
      id: '2',
      name: 'yue',
      friend: 'you',
    },
    {
      id: '1',
      name: 'yue',
      friend: 'heizi',
    },
  ]);
});
