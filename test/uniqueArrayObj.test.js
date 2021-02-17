import { uniqueArrayObj } from '../src/common';
const arr = [
  {
    id: '1',
    name: 'yue',
    friend: 'heizi',
  },
  {
    id: '2',
    name: 'yue',
    friend: 'heizi',
  },
];
test(`The result is "{id: '2',name: 'yue',friend: 'heizi',}".`, () => {
  expect(uniqueArrayObj(arr, ['name'])).toEqual([
    {
      id: '1',
      name: 'yue',
      friend: 'heizi',
    },
  ]);
});
