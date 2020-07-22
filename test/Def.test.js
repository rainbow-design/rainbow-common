import { isDef } from '../src';
import { isUndef } from '../src';

var a = 123;

test('a is defined.', () => {
  expect(isDef(a)).toBe(true);
});

test('b is undefined.', () => {
  expect(isUndef(b)).toBe(true);
  var b = 456;
});
