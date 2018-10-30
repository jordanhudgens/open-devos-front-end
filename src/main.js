// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueSweetalert2 from "vue-sweetalert2";
import App from "./App";
import router from "./router";
import store from "./store/index.js";
import wysiwyg from "vue-wysiwyg";
Vue.use(wysiwyg, {});
Vue.use(VueSweetalert2);

import "../node_modules/vue-wysiwyg/dist/vueWysiwyg.css";

Vue.config.productionTip = false;

/* eslint-disable no-new */
store.dispatch("storeCheckLoginStatus"),
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
