import Vue from "vue";
import Router from "vue-router";
import Homepage from "@/components/Homepage";
import SearchResults from "@/components/SearchResults";
import Login from "@/components/auth/Login";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Homepage",
      component: Homepage
    },
    {
      path: "/search-results",
      name: "SearchResults",
      component: SearchResults
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    }
  ]
});
