import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./config";

import SlideVerify from "vue-monoplasty-slide-verify";
import api from '@/api/api';

Vue.use(SlideVerify);
Vue.use(ElementUI);
Vue.prototype.$api = api;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
