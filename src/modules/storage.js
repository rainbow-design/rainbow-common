class StorageFn {
  constructor() {
    this.ls = window.localStorage;
  }
  /*-----------------localStorage---------------------*/
  setItem(key, val, expires) {
    // 设置过期时间 https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/171
    if (typeof expires !== 'undefined') {
      var expiresDate = new Date(expires).valueOf();
      this.ls.setItem(key + '_expires', expiresDate);
    }
    this.ls.setItem(key, val);
  }

  getItem(key) {
    var expires = this.ls.getItem(key + '_expires');
    if (expires && new Date() > new Date(Number(expires))) {
      this.ls.removeItem(key);
      this.ls.removeItem(key + '_expires');
    }
    if (key) return this.ls.getItem(key);
    return null;
  }

  removeItem(key) {
    this.ls.removeItem(key);
  }

  clear() {
    this.ls.clear();
  }
}

export const Storage = new StorageFn();
// Storage.setItem('key', 'value', new Date(Date.now() + 10000)); // 10 秒钟后过期
// Storage.getItem('key');
