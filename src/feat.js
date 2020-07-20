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
          if (index === promiseAry.length) {
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


