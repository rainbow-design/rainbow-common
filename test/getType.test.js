import { getType } from '../src';

test('"I am string." is String type.', () => {
  expect(getType('I am string.')).toBe('String');
});

test('7 is Number type.', () => {
  expect(getType(7)).toBe('Number');
});

test('undefined is Undefined type.', () => {
  expect(getType(undefined)).toBe('Undefined');
});

test('[] is Array type.', () => {
  expect(getType([])).toBe('Array');
});

test('{} is Object type.', () => {
  expect(getType({})).toBe('Object');
});

test('null is Null type.', () => {
  expect(getType(null)).toBe('Null');
});

test('function(){} is Function type.', () => {
  expect(getType(function () {})).toBe('Function');
});

test('false is Boolean type.', () => {
  expect(getType(false)).toBe('Boolean');
});

test('NaN is Number type.', () => {
  expect(getType(NaN)).toBe('Number');
});
