import { idCard } from './base-rule';
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
    return idCard(str);
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
