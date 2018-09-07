// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueSweetalert2 from "vue-sweetalert2";
import App from "./App";
import router from "./router";
import store from "@/store";
import wysiwyg from "vue-wysiwyg";
import axios from "axios";
Vue.use(wysiwyg, {});
Vue.use(VueSweetalert2);

import "../node_modules/vue-wysiwyg/dist/vueWysiwyg.css";

Vue.config.productionTip = false;

Vue.mixin({
  methods: {
    loggedIn() {
      axios
        .get("https://open-devos-api.herokuapp.com/logged_in", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(response => {
          if (response.data.logged_in === true) {
            return true;
          } else {
            return false;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  axios,
  store,
  components: { App },
  template: "<App/>"
});
