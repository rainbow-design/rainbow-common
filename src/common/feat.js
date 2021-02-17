// 所有的 promise 都错误才触发 reject
Promise.every = (promiseAry) => {
  return new Promise((resolve, reject) => {
    let resultAry = [],
      errorAry = [],
      index = 0,
      index__error = 0;
    for (let i = 0; i < promiseAry.length; i++) {
      Promise.resolve(promiseAry[i])
        .then((result) => {
          index++;
          resultAry[i] = result;
          if (
            index === promiseAry.length ||
            index + index__error === promiseAry.length
          ) {
            resolve(resultAry);
          }
        })
        .catch((reason) => {
          index__error++;
          errorAry[i] = reason;
          resultAry[i] = reason;
          // 都有都错误
          if (index__error === promiseAry.length) {
            reject(errorAry);
          }
          if (index + index__error === promiseAry.length) {
            resolve(resultAry);
          }
        });
    }
  });
};



Date.prototype.formate = function (format) {
  const o = {
    'M+': this.getMonth() + 1, // month
    'd+': this.getDate(), // day
    'h+': this.getHours(), // hour
    'm+': this.getMinutes(), // minute
    's+': this.getSeconds(), // second
    'q+': Math.floor((this.getMonth() + 3) / 3), // quarter
    S: this.getMilliseconds(),
    // millisecond
  };

  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      `${this.getFullYear()}`.substr(4 - RegExp.$1.length),
    );
  }

  for (const k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length),
      );
    }
  }
  return format;
};
