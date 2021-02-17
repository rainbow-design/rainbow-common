import { debounce } from '../src/common';
var check = '';
var callback = function () {
  check = 'called';
};

var func = debounce(callback, 1000, true);
var func2 = debounce(callback, 1000, false);

test('debounce (immediate true).', () => {
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

test('debounce (immediate false).', () => {
  // should not be called
  func2();
  expect(check).toBe('');

  // should not be called
  setTimeout(() => {
    func2();
    expect(check).toBe('');
  }, 500);

  //  should be called
  setTimeout(() => {
    func2();
    expect(check).toBe('called');
    check = '';
  }, 1000);

  // should not be called
  setTimeout(() => {
    func2();
    expect(check).toBe('');
  }, 1500);

  // should not be called
  setTimeout(() => {
    func2();
    expect(check).toBe('');
  }, 1900);

  // should  be called
  setTimeout(() => {
    func2();
    expect(check).toBe('called');
  }, 2000);
});
