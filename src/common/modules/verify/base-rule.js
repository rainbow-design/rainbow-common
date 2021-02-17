import { trim, isNumber, isNaN } from 'lodash';

export const required = function (val) {
  return !!(val && trim(val));
};

export const text = function (val) {
  var { maxLength, minLength } = this;
  var len = val.toString().length;
  if (isNumber(minLength) && minLength > len) {
    return false;
  }

  if (isNumber(maxLength) && maxLength < len) {
    return false;
  }
  return true;
};

export const number = function (val) {
  val = +val;
  if (isNaN(val)) {
    return 'no_number';
  }

  var { max, min } = this;
  if (isNumber(min) && min > val) {
    return 'min';
  }

  if (isNumber(max) && max < val) {
    return 'max';
  }

  return true;
};

export const mobile = function (number = '') {
  if (number.length == 0) {
    return '手机号码不能为空';
  }
  if (!/^1[3456789]\d{9}$/.test(number)) {
    if (number.length != 11) {
      return '请输入11位手机号';
    }
    return '手机号码格式不符合规范，请重新填写';
  }
  if (/(123456789|987654321)$/.test(number)) {
    return '手机号码不能连续';
  }
};

export const captcha = function (number = '') {
  if (!number) {
    return '请您输入验证码';
  }
  if (!/^\d{6}$/.test(number)) {
    return '请输入验证码';
  }
  return true;
};

/**
 * checkEmail 邮箱判断
 * @param {str} emailStr 邮箱
 * @return {bool} 校验结果
 */
export function checkEmail(emailStr) {
  var patten = /^([a-zA-Z0-9]+[_|_|\-|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
  return patten.test(emailStr);
}

// 身份证格式
export function idCard(idcard) {
  var result = true;
  var area = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外',
  };

  var idcard, Y, JYM;
  var S, M;
  var ereg = /a/;
  var idcard_array = new Array();
  idcard = idcard.toUpperCase();
  idcard_array = idcard.split('');
  if (area[parseInt(idcard.substr(0, 2))] == null) result = true;
  switch (idcard.length) {
    case 15:
      if (
        (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 ||
        ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 &&
          (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0)
      ) {
        ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/; // 测试出生日期的合法性
      } else {
        ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/; // 测试出生日期的合法性
      }

      if (ereg.test(idcard)) {
        result = true;
      } else {
        result = false;
      }
      break;
    case 18:
      if (
        parseInt(idcard.substr(6, 4)) % 4 == 0 ||
        (parseInt(idcard.substr(6, 4)) % 100 == 0 &&
          parseInt(idcard.substr(6, 4)) % 4 == 0)
      ) {
        ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; // 闰年出生日期的合法性正则表达式
      } else {
        ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/i; // 平年出生日期的合法性正则表达式
      }
      if (ereg.test(idcard)) {
        S =
          (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 +
          (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 +
          (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 +
          (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 +
          (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 +
          (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 +
          (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 +
          parseInt(idcard_array[7]) * 1 +
          parseInt(idcard_array[8]) * 6 +
          parseInt(idcard_array[9]) * 3;
        Y = S % 11;
        M = 'F';
        JYM = '10X98765432';
        M = JYM.substr(Y, 1);
        if (M == idcard_array[17]) {
          result = true;
        } else {
          result = false;
        }
      } else {
        result = false;
      }
      break;
    default:
      result = false;
      break;
  }
  return result;
}
