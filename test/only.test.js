import { only } from '../src';
const obj = {
  id: '1',
  name: 'yue',
  friend: 'heizi',
};
test(`The result  is "{name: 'yue',friend: 'heizi',}".`, () => {
  expect(only(obj, 'name friend')).toEqual({
    name: 'yue',
    friend: 'heizi',
  });
});
