import vue from 'vue';
import Notify from 'vant/lib/notify';
import 'vant/lib/notify/style';

Notify.install = function registryLoading(Vue) {
  //注册notify事件
  Vue.prototype.$notify = function (options) {
    try {
      let vm = Notify(options);
    } catch (err) {
      console.log(err);
    }
  };
  Vue.prototype.$notify.showTips = function (msg) {
    try {
      let vm = Notify({
        message: msg,
        duration: 2000,
        background: '#4fc08d' || 'FF6600',
      });
      vm.$nextTick(() => {
        vm.$el.setAttribute('id', 'Notify_text');
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export default Notify;
