import { throttle } from '../src/common';
var check = '';
var callback = function () {
  check = 'called';
};

var func = throttle(callback, 1000);

test('throttle.', () => {
  // should be called
  func();
  expect(check).toBe('called');
  check = '';

  // should not be called
  setTimeout(() => {
    func();
    expect(check).toBe('');
  }, 500);

  //  should be called
  setTimeout(() => {
    func();
    expect(check).toBe('called');
    check = '';
  }, 1000);

  setTimeout(() => {
    func();
    expect(check).toBe('');
  }, 1500);

  setTimeout(() => {
    func();
    expect(check).toBe('');
  }, 1900);
});
