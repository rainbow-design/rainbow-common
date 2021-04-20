export function isArray(arg) {
  return Array.isArray(arg);
}
/**
 *
 * @isArrayLike
 * @param {*} value
 * @returns Boolearn
 */
export function isArrayLike(value) {
  return (
    value != null && typeof value != 'function' && this.isLength(value.length)
  );
}

// compact([0, false, true, undefined, null, "", 12, 15]); // [true, 12, 15]
// 使用Boolean过滤数组中的所有假值
export const compact = (arr) => arr.filter(Boolean);

/**
 * isContains
 * @param {*} arr
 * @param {*} current
 * @returns
 */
export function isContains(arr, current) {
  if (Array.prototype.includes) {
    return arr.includes(current);
  }
  for (i = 0; i < arr.length && arr[i] != current; i++);
  return !(i == arr.length);
}

export function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}

/**
 * arrayIndex
 * @param {*} array
 * @param {*} element
 * @returns
 */
export function arrayIndex(array, element) {
  var index = array.indexOf(element);
  return index;
}

// 从数组中随机取出一个
export function randomOne(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 数组乱序
export function shuffle(a) {
  var j, x, i;
  for (i = a.length; i; i--) {
    j = Math.floor(Math.random() * i);
    x = a[i - 1];
    a[i - 1] = a[j];
    a[j] = x;
  }
  return a;
}

/**
 *
 * @param {*} arr
 * @param {*} props 数组子项排序的key
 * @param {*} type 默认正序，传 'desc`为倒序排列
 * @returns
 */
export function sortBy(arr, props, type) {
  return arr.sort(function (a, b) {
    if (type === 'desc') {
      return b[props] - a[props];
    }
    return a[props] - b[props];
  });
}

/**
 * 数组对象根据某一个相同的键去重
 *
 * @param {*} arr
 * @param {*} name 去除所有数组子项与此key值重复项
 * @returns
 */
export function uniqueArrayObj(arr, name) {
  var obj = {};
  return arr.filter((v) => {
    if (!obj[v[name]]) {
      obj[v[name]] = true;
      return v;
    }
  });
}

export const listChunk = (list = [], chunkSize = 1) => {
  const result = [];
  const tmp = [...list];
  if (!Array.isArray(list) || !Number.isInteger(chunkSize) || chunkSize <= 0) {
    return result;
  }
  while (tmp.length) {
    result.push(tmp.splice(0, chunkSize));
  }
  return result;
};

// 将二维数组转化为一维数组 （即：数组扁平化）
export const flat = (arr) =>
  arr.reduce((prev, cur, index, arr) => {
    if (Array.isArray(cur)) {
      return prev.concat(...flat(cur));
    }
    return prev.concat(cur);
  }, []);
