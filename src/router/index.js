import Vue from "vue";
import Router from "vue-router";
import Homepage from "@/components/Homepage";
import SearchResults from "@/components/SearchResults";
import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import Account from "@/components/auth/Account";
import Categories from "@/components/categories/Categories";
import CategoryDetail from "@/components/categories/CategoryDetail";
import Popular from "@/components/Popular";
import Profile from "@/components/Profile";
import Publish from "@/components/publishing/Publish";
import PlanDetail from "@/components/plans/PlanDetail";
import DevoDetail from "@/components/devos/DevoDetail";
import DevoManager from "@/components/devos/DevoManager";
import Bookmarks from "@/components/Bookmarks";
import { mapGetters } from "vuex";
import store from "@/store";
import VueAnalytics from "vue-analytics";
import VueGtm from "vue-gtm";

Vue.use(Router);

const router = new Router({
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
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/account-settings",
      name: "Account",
      component: Account
    },
    {
      path: "/categories",
      name: "Categories",
      component: Categories
    },
    {
      path: "/category/:category_slug",
      name: "CategoryDetail",
      component: CategoryDetail
    },
    {
      path: "/plan/:slug",
      name: "PlanDetail",
      component: PlanDetail
    },
    {
      path: "/devo/:devo_slug",
      name: "DevoDetail",
      component: DevoDetail
    },
    {
      path: "/:plan_slug/devo-manager/:devo_slug",
      name: "DevoManager",
      component: DevoManager
    },
    {
      path: "/popular",
      name: "Popular",
      component: Popular
    },
    {
      path: "/profile/:user_slug",
      name: "Profile",
      component: Profile
    },
    {
      path: "/bookmarks",
      name: "Bookmarks",
      component: Bookmarks
    },
    {
      path: "/publish",
      name: "Publish",
      component: Publish,
      beforeEnter: (to, from, next) => {
        if (store.getters.currentUser) {
          next();
        } else {
          next({ name: "Login" });
        }
      }
    }
  ]
});

Vue.use(VueAnalytics, {
  id: "UA-120438011-1",
  router
});

Vue.use(VueGtm, {
  vueRouter: router
});

export default router;
