import vue from 'vue';
import Loading from './loading.vue';

// 组件构造器，构造出一个 vue组件实例
const LoadingConstructor = vue.extend(Loading);
let loadingDom;

export function showLoading() {
  if (loadingDom) {
    loadingDom.isShow = true;
    return false;
  }
  loadingDom = new LoadingConstructor({
    el: document.createElement('div'),
    data() {
      return {
        isShow: true,
      };
    },
  });
  // 添加节点
  document.body.appendChild(loadingDom.$el);
}

export function hideLoading() {
  loadingDom && (loadingDom.isShow = false);
}

Loading.install = function registryLoading(Vue) {
  Vue.prototype.$showLoading = showLoading;
  Vue.prototype.$hideLoading = hideLoading;
};

export default Loading;
