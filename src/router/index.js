import Vue from "vue";
import Router from "vue-router";
import Homepage from "@/components/Homepage";
import SearchResults from "@/components/SearchResults";
import Login from "@/components/auth/Login";
import Categories from "@/components/Categories";
import Popular from "@/components/Popular";
import Profile from "@/components/Profile";
import Publish from "@/components/Publish";

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
    },
    {
      path: "/categories",
      name: "Categories",
      component: Categories
    },
    {
      path: "/popular",
      name: "Popular",
      component: Popular
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile
    },
    {
      path: "/publish",
      name: "Publish",
      component: Publish
    }
  ]
});
