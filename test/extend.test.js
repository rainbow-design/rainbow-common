import { extend } from '../src';

const obj = {};
const obj1 = {
  id: 1,
  name: 'rainbow',
};
const obj2 = {
  friend: 'heizi',
};

test('obj 被扩展了.', () => {
  extend(obj, obj1, obj2);
  expect(obj).toEqual({
    id: 1,
    name: 'rainbow',
    friend: 'heizi',
  });
});
