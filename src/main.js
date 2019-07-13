import Vue from "vue";
import BootstrapVue from 'bootstrap-vue'
import App from "./App";
import router from "./router/index";

import PaperDashboard from "./plugins/paperDashboard";

Vue.use(PaperDashboard);
Vue.use(BootstrapVue);
/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
