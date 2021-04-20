import { isDef } from './core';
export function parseImage(html) {
  //匹配图片
  imageArray = html.match(/<img.*?(?:>|\/>)/gi);
  imageArray = imageArray
    .map((str) => {
      //匹配链接
      let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
      //匹配跳转链接
      let hrefReg = /href=[\'\"]?([^\'\"]*)[\'\"]?/i;
      let srcMatching = str.match(srcReg);
      if (srcMatching && srcMatching[1]) {
        let src = srcMatching[1];
        let link = '';
        let hrefMatching = str.match(hrefReg);
        if (hrefMatching && hrefMatching[1]) {
          link = hrefMatching[1];
        }
        return {
          src,
          link,
        };
      } else {
        return false;
      }
    })
    .filter((item) => {
      //过滤掉无资源链接图片
      return item;
    });
  return imageArray;
}

/**
 * getAgeByBirth 根据出生日期获取年龄
 * @param {str} birthday 出生日期 2018-02-08
 * @param {Int} offsetDay
 * @return {num} 年龄
 */
export function getAgeByBirth(birthday = '', offsetDay = 1) {
  var r = birthday.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
  if (r == null) {
    return false;
  }
  var birth = new Date(r[1], r[3] - 1, r[4]);
  if (
    birth.getFullYear() == r[1] &&
    birth.getMonth() + 1 == r[3] &&
    birth.getDate() == r[4]
  ) {
    var today = new Date();
    today.setDate(today.getDate() + offsetDay);
    var age = today.getFullYear() - r[1];
    if (today.getMonth() > birth.getMonth()) {
      return age;
    }
    if (today.getMonth() == birth.getMonth()) {
      if (today.getDate() >= birth.getDate()) {
        return age;
      } else {
        return age - 1;
      }
    }
    if (today.getMonth() < birth.getMonth()) {
      return age - 1;
    }
  }
  return age;
}

/**
 * 根据证件号获取生日和性别
 * @param {*} iIdNo
 * @returns { birth, sex, sexCode, age }
 */
export function getInfoByCid(iIdNo, offsetDay) {
  var rel = {};
  var tmpStr = '';
  var sexStr = '';
  iIdNo = iIdNo.trim();
  if (isDef(iIdNo)) {
    if (iIdNo.length == 18) {
      // * 基本都是 18 位
      tmpStr = iIdNo.substring(6, 14); // 出生日期
      tmpStr =
        tmpStr.substring(0, 4) +
        '-' +
        tmpStr.substring(4, 6) +
        '-' +
        tmpStr.substring(6);
      sexStr = parseInt(iIdNo.substring(17, 1), 10) % 2 ? '男' : '女'; // 第 17 位代表性别
    } else {
      throw new Error('身份证必须为 18 位数字！');
    }
  }
  rel.birth = tmpStr;
  rel.age = getAgeByBirth(rel.birth, offsetDay);
  rel.sex = sexStr;
  rel.sexCode = (sexStr == '男' && '1') || (sexStr == '女' && '2') || '';
  return rel;
}

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
