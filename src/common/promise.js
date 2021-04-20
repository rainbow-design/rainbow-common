export const race = (promises) => {
  if (!Array.isArray(promises)) {
    throw Error('argument must be a array');
  }
  return new Promise((resolve, reject) => {
    let n = 0;
    while (n < promises.length) {
      Promise.resolve(promises[i])
        .then((res) => {
          // * 出现第一个被 resolve 直接 resolve
          resolve(res);
        })
        .catch((err) => {
          // * 出现第一个被 reject 直接 reject
          reject(err);
        });
      i++;
    }
  });
};

// 所有的 promise 都错误才触发 reject
export const every = (promises) => {
  if (!Array.isArray(promises)) {
    throw Error('argument must be a array');
  }
  return new Promise((resolve, reject) => {
    let result = [],
      fulfilled__num = 0,
      rejected__num = 0;
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i])
        .then((res) => {
          fulfilled__num++;
          // ! 保证结果顺序
          result[i] = res;
          if (
            fulfilled__num === promises.length ||
            fulfilled__num + rejected__num === promises.length
          ) {
            resolve(result);
          }
        })
        .catch((error) => {
          rejected__num++;
          result[i] = { reason: error };
          // ! 都为错误才抛出
          if (rejected__num === promises.length) {
            reject(result);
          }
          if (fulfilled__num + rejected__num === promises.length) {
            resolve(result);
          }
        });
    }
  });
};

export const all = (promises) => {
  if (!Array.isArray(promises)) {
    throw Error('argument must be a array');
  }
  return new Promise((resolve, reject) => {
    let result = [],
      fulfilled__num = 0;
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i])
        .then((res) => {
          fulfilled__num++;
          // ! 保证结果顺序
          result[i] = res;
          if (fulfilled__num === promises.length) {
            resolve(result);
          }
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
};

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