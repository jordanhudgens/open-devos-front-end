import Vue from "vue";
import Router from "vue-router";
import Homepage from "@/components/Homepage";
import SearchResults from "@/components/SearchResults";
import Login from "@/components/auth/Login";
import Categories from "@/components/categories/Categories";
import CategoryDetail from "@/components/categories/CategoryDetail";
import Popular from "@/components/Popular";
import Profile from "@/components/Profile";
import Publish from "@/components/publishing/Publish";
import Logout from "@/components/auth/Logout";
import PlanDetail from "@/components/plans/PlanDetail";
import DevoDetail from "@/components/devos/DevoDetail";
import { mapGetters } from "vuex";
import store from "@/store";

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
      path: "/logout",
      name: "Logout",
      component: Logout
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
      path: "/plan/:plan_slug",
      name: "PlanDetail",
      component: PlanDetail
    },
    {
      path: "/devo/:devo_slug",
      name: "DevoDetail",
      component: DevoDetail
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

export default router;
