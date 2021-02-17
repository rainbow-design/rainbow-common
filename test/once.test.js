import { once } from '../src/common';
var check = '';
var callback = function () {
  check = 'called';
};

var func = once(callback);

test('once function', () => {
  // should be called
  func();
  expect(check).toBe('called');
  check = '';

  // should not be called
  func();
  expect(check).toBe('');
});
