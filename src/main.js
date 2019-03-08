import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import Paginate from 'vuejs-paginate';
import vSelect from 'vue-select';


Vue.config.productionTip = false;
Vue.component('paginate', Paginate);
Vue.component('v-select' , vSelect);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
