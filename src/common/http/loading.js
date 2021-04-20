import Vue from 'vue';
import Toast from 'vant/lib/toast';
export const loading = (function () {
  if (!Vue.prototype.$toast) {
    Vue.prototype.$toast = function (options = {}) {
      options.message = options.message || options.text;
      Toast(options);
    };
  }
  return {
    show(message = '加载中...') {
      Toast.loading({
        duration: 0,
        forbidClick: true,
        message,
        loadingType: 'spinner',
      });
    },
    hide() {
      Toast.clear();
    },
  };
})();
