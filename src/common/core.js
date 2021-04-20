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
export const isDef = (value) => {
  if (
    value == null ||
    value == '' ||
    value == 'undefined' ||
    value == undefined ||
    value == 'null' ||
    value == '(null)' ||
    value == 'NULL' ||
    typeof value == 'undefined'
  ) {
    return false;
  } else {
    value = value + '';
    value = value.replace(/\s/g, '');
    if (value == '') {
      return false;
    }
    return true;
  }
};

export const isUndef = (v) => {
  return v === undefined || v === null;
};

export function isFunction() {
  return (
    Object.prototype.toString.call(function () {
      return 1;
    }) === '[object Function]'
  );
}

export function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/**
 * 对象扩展
 *
 * @param {*} target
 * arguments obj ...
 * @returns obj
 */
export function extend(target) {
  for (var i = 1, len = arguments.length; i < len; i++) {
    for (var prop in arguments[i]) {
      if (arguments[i].hasOwnProperty(prop)) {
        target[prop] = arguments[i][prop];
      }
    }
  }
  return target;
}

// 验证规则
const VerificationRules = {
  empty: function (str) {
    return str === null || str === '' || str === undefined;
  },
  email: function (str) {
    return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
  },
  phone: function (str) {
    // 碰到 16* 开头的手机号 update
    return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
  },
  number: function (str) {
    return /^[0-9]+$/.test(str);
  },
  // 货币金额（支持负数、千分位分隔符）https://any86.github.io/any-rule/
  money: function (str) {
    return /^-?\d+(,\d{3})*(\.\d{1,2})?$/.test(str);
  },
  english: function (str) {
    return /^[a-zA-Z]+$/.test(str);
  },
  chinese: function (str) {
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



