import Vue from 'vue';
import App from './App.vue';
import Loading from '../src/components/loading';
import Toast from '../src/components/toast';

Vue.config.productionTip = false;

Vue.use(Loading);
Vue.use(Toast);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
