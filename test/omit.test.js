import { omit } from '../src/common';
const obj = {
  id: '1',
  name: 'yue',
  friend: 'heizi',
};
test(`The result is "{name: 'yue',friend: 'heizi',}".`, () => {
  expect(omit(obj, ['id'])).toEqual({
    name: 'yue',
    friend: 'heizi',
  });
});
