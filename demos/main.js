import Vue from 'vue';
import App from './App.vue';
import Loading from '../src/components/loading';
import Toast from '../src/components/toast';
import Notify from '../src/components/notify';
import './app.css';
Vue.config.productionTip = false;

Vue.use(Loading);
Vue.use(Toast);
Vue.use(Notify);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
