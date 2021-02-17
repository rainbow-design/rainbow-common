import { isFunction } from './core';

export function isObject(arg) {
  return arg != null && typeof arg === 'object' && !Array.isArray(arg);
}

export function isEmptyObject(obj) {
  if (!obj) {
    return false;
  }
  for (const n in obj) {
    if (obj.hasOwnProperty(n) && obj[n]) {
      return false;
    }
  }
  return true;
}

export function isPromise(val) {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
}
/**
 * Object 在obj中是否有key
 * @param {*} obj
 * @param {*} key
 * @returns
 */
export const hasOwn = function (obj, key) {
  return obj != null && hasOwnProperty.call(obj, key);
};

export const shallowCopy = (obj) => {
  // 只拷贝对象
  if (typeof obj !== 'object') return;
  // 根据obj的类型判断是新建一个数组还是对象
  var newObj = obj instanceof Array ? [] : {};
  // 遍历obj，并且判断是obj的属性才拷贝
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};

export const deepCopy = (obj) => {
  if (typeof obj !== 'object') return;
  var newObj = obj instanceof Array ? [] : {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] =
        typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
    }
  }
  return newObj;
};

export const omit = (obj = {}, props = []) => {
  if (!Array.isArray(props)) {
    throw Error('props type error!');
  }
  const keys = Object.keys(obj);
  const res = {};
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = obj[key];
    if (!props || !props.includes(key)) {
      res[key] = value;
    }
  }
  return res;
};

export const only = (obj, keys) => {
  obj = obj || {};
  if ('string' !== typeof keys) {
    throw Error('keys type error！keys parmas eg: "id name"');
  }
  if ('string' == typeof keys) keys = keys.split(/ +/);
  return keys.reduce(function (ret, key) {
    if (null == obj[key]) return ret;
    ret[key] = obj[key];
    return ret;
  }, {});
};

export function mergeObject(obj1, obj2, newObject) {
  const wrap = newObject || obj1;
  const keys = new Set(Object.keys(obj1).concat(Object.keys(obj2)));
  keys.forEach((key) => {
    if (!(key in obj1)) {
      wrap[key] = obj2[key];
    } else if (!(key in obj2)) {
      wrap[key] = obj1[key];
    } else if (obj2[key] && obj2[key].constructor === Object) {
      wrap[key] = mergeObject(obj1[key], obj2[key]);
    } else {
      wrap[key] = obj2[key];
    }
  });

  return wrap;
}

/**
 *
 * @desc   参数对象序列化
 * @param  {Object} obj
 * @return {String}
 */
export function stringify(obj) {
  var pairs = [];
  for (var key in obj) {
    var value = obj[key];
    if (typeof value === 'function') {
      continue;
    }
    if (value instanceof Array) {
      let ids = [];
      for (var i = 0; i < value.length; ++i) {
        ids.push(value[i]);
      }
      pairs.push(key + '=' + ids);

      continue;
    }
    pairs.push(key + '=' + obj[key]);
  }
  return pairs.join('&');
}

export function parse(url) {
  var paramArr = decodeURI(url).split('&'),
    obj = {};
  for (var i = 0; i < paramArr.length; i++) {
    var item = paramArr[i];
    if (item.indexOf('=') != -1) {
      let temp = item.split('=');
      let key = temp[0];
      let val = unescape(temp[1]);
      // unicode 解码
      if (obj.hasOwnProperty(key)) {
        obj[key] = [obj[key], val];
      } else {
        obj[key] = val;
      }
    } else {
      obj[item] = true;
    }
  }
  return obj;
}

/**
 * form vue
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
export function looseEqual(a, b) {
  if (a === b) return true;
  const isObjectA = isObject(a);
  const isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      const isArrayA = Array.isArray(a);
      const isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return (
          a.length === b.length &&
          a.every((e, i) => {
            return looseEqual(e, b[i]);
          })
        );
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
      } else if (!isArrayA && !isArrayB) {
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);
        return (
          keysA.length === keysB.length &&
          keysA.every((key) => {
            return looseEqual(a[key], b[key]);
          })
        );
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}

// 对象类型深比较（递归遍历）
export function isEqual(obj, obj2, option = {}) {
  if (!obj || !obj2) {
    return obj === obj2;
  }
  if (Object.keys(obj).length !== Object.keys(obj2).length) return false;
  const ignores = option.ignores || [];
  const keys = [...new Set(Object.keys(obj).concat(Object.keys(obj2)))];

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    if (!ignores.includes(key)) {
      if (obj[key] && typeof obj[key] === 'object') {
        if (!isEqual(obj[key], obj2[key], option)) {
          return false;
        }
      } else if (obj[key] !== obj2[key]) {
        return false;
      }
    }
  }
  return true;
}
