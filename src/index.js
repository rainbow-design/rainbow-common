/**
 * 判断数据类型
 *
 * @param {*} a
 * @returns Boolean String Array Object Function Number Undefined Null
 */
export const getType = (a) => {
  return Object.prototype.toString.call(a).slice(8, -1);
};
// 是否已定义
export const isDef = (val) => {
  return val !== undefined && val !== null;
};

export const isUndef = (v) => {
  return v === undefined || v === null;
};

/**
 * 对象扩展
 *
 * @param {*} target
 * arguments obj ...
 * @returns obj
 */
export const extend = (target) => {
  for (let i = 1, len = arguments.length; i < len; i++) {
    for (let prop in arguments[i]) {
      if (arguments[i].hasOwnProperty(prop)) {
        target[prop] = arguments[i][prop];
      }
    }
  }
};

/**
 * 四舍五入 格式化数字
 *
 * @param {*} number 8440.55
 * @param {*} fractionDigits 1 小数位数
 * @returns 8440.6
 */
export function toFixed(number, fractionDigits) {
  var times = Math.pow(10, fractionDigits);
  var roundNum = Math.round(number * times) / times;
  return roundNum.toFixed(fractionDigits);
}

// 验证规则
const VerificationRules = {
  empty: function (str) {
    return (
      str == null ||
      str == '' ||
      str == undefined ||
      typeof str == typeof undefined
    );
  },
  email: function (str) {
    return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
  },
  phone: function (str) {
    // 碰到 16* 开头的手机号 update
    return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
  },
  tel: function (str) {
    return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
  },
  number: function (str) {
    return /^[0-9]$/.test(str);
  },
  english: function (str) {
    return /^[a-zA-Z]+$/.test(str);
  },
  allChinese: function (str) {
    return /^[\u4E00-\u9FA5]+$/.test(str);
  },
  hasChinese: function (str) {
    return /^[\u4E00-\u9FA5]/.test(str);
  },
  pwd_normal: function (str) {
    // 同时含有数字和字母，且长度要在8-16位之间
    return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(str);
  },
  IDCard: function (str) {
    // (15位、18位数字)，最后一位是校验位，可能为数字或字符X
    return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
  },
};

/**
 * 按类型校验字符串
 *
 * @param {*} str
 * @param {*} type
 * @returns
 */
export function checkType(str, type) {
  let checkFn = VerificationRules[type];
  if (!checkFn) {
    throw new Error('请指定检测的类型，如：checkType("", "empty")');
  }
  return checkFn(str);
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

// 将一组类数组转换为数组
export function toArray(obj) {
  return Array.from ? Array.from(obj) : Array.prototype.slice.call(obj);
}

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
      for (var i = 0; i < value.length; ++i) {
        pairs.push(key + '[' + i + ']' + '=' + value[i]);
      }
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

export function throttle(fn, wait = 1500) {
  let _lastTime = null;
  return function () {
    let _nowTime = +new Date();
    if (_nowTime - _lastTime > wait || !_lastTime) {
      fn.apply(this, arguments);
      _lastTime = _nowTime;
    }
  };
}

/**
 * 防抖 一定时间内连续调用只允许执行一次
 *
 * @param {*} func
 * @param {*} wait 等待时间
 * @param {*} immediate 传 true，首次调用即立即执行
 * @returns
 */
export function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this;
    var args = arguments;
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      var canApply = !timeout;
      timeout = setTimeout(function () {
        timeout = null; // 在 wait 时间后防抖函数才可以再次被触发
      }, wait);
      if (canApply) func.apply(context, args); // 第一次 !undefined 执行
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    }
  };
}

export function once(fn) {
  let called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  };
}

export const Base64 = {
  //加密
  encode(str) {
    return escape(btoa(str));
  },
  //解密
  decode(str) {
    return atob(unescape(str));
  },
};
