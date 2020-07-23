class EventEmitter {
  constructor() {
    this._cache = {};
    this._cache__reverse = {};
  }
  // 先订阅
  $on(type, callback) {
    (this._cache[type] || (this._cache[type] = [])).push(callback);
    return this;
  }

  $emit(type, data) {
    const fns = this._cache[type];
    if (Array.isArray(fns)) {
      fns.forEach((fn) => {
        fn(data);
      });
    }
    return this;
  }

  $off(type, callback) {
    if (!arguments.length) {
      this._cache = Object.create(null);
      return this;
    }
    if (!callback) {
      const fns = this._cache[type];
      if (Array.isArray(fns)) {
        this._cache[type] = null;
      }
      return this;
    }
    const fns = this._cache[type];
    if (Array.isArray(fns)) {
      this._cache[type] = fns.filter((event) => {
        return event !== callback;
      });
    }

    return this;
  }

  $once(type, callback) {
    const that = this;
    function func() {
      const args = Array.prototype.slice.call(arguments, 0);
      that.$off(type, func);
      callback.apply(that, args);
    }
    this.$on(type, func);
  }
  // 先发布
  $pub(type, data) {
    if (this._cache__reverse[type]) {
      this._cache__reverse[type].push(data);
    } else {
      this._cache__reverse[type] = [data];
    }
  }

  $sub(type, callback) {
    const params = this._cache__reverse[type];
    if (Array.isArray(params)) {
      params.forEach((param) => {
        callback(param);
      });
    }
    return this;
  }

  $remove(type) {
    const fns_r = this._cache__reverse[type];
    if (Array.isArray(fns_r)) {
      this._cache__reverse[type] = null;
    }
    return this;
  }
}
export const Event = new EventEmitter();
