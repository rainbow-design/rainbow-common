import '../src/common/feat';

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

test('"Promise.every return result.', () => {
  return Promise.every([p1, p3]).then((result) =>
    expect(result).toEqual(['result1', 'result3']),
  );
});

test('"Promise.every return result.', () => {
  return Promise.every([p2, p4]).then((result) =>
    expect(result).toEqual([
      'P2 found some troubles',
      'P4 found some troubles',
    ]),
  );
});

test('"Promise.every return result.', () => {
  return Promise.every([p5, p6]).catch((result) =>
    expect(result).toEqual([
      'P5 found some troubles',
      'P6 found some troubles',
    ]),
  );
});

test('"Promise.every return result.', () => {
  return Promise.every([p1, p2, p3, p4]).then((result) =>
    expect(result).toEqual([
      'result1',
      'P2 found some troubles',
      'result3',
      'P4 found some troubles',
    ]),
  );
});
