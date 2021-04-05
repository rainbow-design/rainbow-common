import { every, allSettled } from '../src/common/promise';

let p1 = new Promise((resolve) => resolve('result1'));
let p2 = new Promise((resolve, reject) => reject('P2 found some troubles'));
let p3 = new Promise((resolve) => resolve('result3'));
let p4 = new Promise((resolve, reject) => {
  try {
    throw new Error('some troubles');
    resolve('result4');
  } catch (error) {
    resolve('P4 found some troubles');
  }
});

let p5 = new Promise((resolve, reject) => {
  try {
    throw new Error('some troubles');
    resolve('result5');
  } catch (error) {
    reject('P5 found some troubles');
  }
});

let p6 = new Promise((resolve, reject) => {
  try {
    throw new Error('some troubles');
    resolve('result6');
  } catch (error) {
    reject('P6 found some troubles');
  }
});
const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'foo'));
const promises = [promise1, promise2];

test('"Promise every function return result.', () => {
  return every([p1, p3]).then((result) =>
    expect(result).toEqual(['result1', 'result3']),
  );
});

test('"Promise every function return result.', () => {
  return every([p2, p4]).then((result) =>
    expect(result).toEqual([
      { reason: 'P2 found some troubles' },
      'P4 found some troubles',
    ]),
  );
});

test('"Promise every function return result.', () => {
  return every([p5, p6]).catch((result) =>
    expect(result).toEqual([
      { reason: 'P5 found some troubles' },
      { reason: 'P6 found some troubles' },
    ]),
  );
});

test('"Promise every function return result.', () => {
  return every([p1, p2, p3, p4]).then((result) =>
    expect(result).toEqual([
      'result1',
      { reason: 'P2 found some troubles' },
      'result3',
      'P4 found some troubles',
    ]),
  );
});

test('"Promise allSettled function return result.', () => {
  return allSettled([p1, p2, p3, p4]).then((result) =>
    expect(result).toEqual([
      { status: "fulfilled", value: 'result1' },
      { status: "rejected", reason: 'P2 found some troubles' },
      { status: "fulfilled", value: 'result3' },
      { status: "fulfilled", value: 'P4 found some troubles' },
    ]),
  );
});

test('"Promise allSettled function return result.', () => {
  return allSettled(promises).then((result) =>
    expect(result).toEqual([
      { status: "fulfilled", value: 3 },
      { status: "rejected", reason: 'foo' },
    ]),
  );
});
