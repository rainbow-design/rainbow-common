// 所有的 promise 都错误才触发 reject
export const every = (promises) => {
  return new Promise((resolve, reject) => {
    let resultAry = [],
      errorAry = [],
      index = 0,
      index__error = 0;
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i])
        .then((result) => {
          index++;
          resultAry[i] = result;
          if (
            index === promises.length ||
            index + index__error === promises.length
          ) {
            resolve(resultAry);
          }
        })
        .catch((err) => {
          index__error++;
          errorAry[i] = resultAry[i] = { reason: err };
          // 都有都错误
          if (index__error === promises.length) {
            reject(errorAry);
          }
          if (index + index__error === promises.length) {
            resolve(resultAry);
          }
        });
    }
  })
}

export const allSettled = (promises) => {
  return new Promise((resolve, reject) => {
    const result = []
    promises.forEach((p, i) => {
      Promise.resolve(p).then(res => {
        result[i] = { status: 'fulfilled', value: res }
        if (result.length === promises.length) {
          resolve(result)
        }
      }).catch(err => {
        result[i] = { status: 'rejected', reason: err }
        if (result.length === promises.length) {
          resolve(result)
        }
      })
    })
  })
}