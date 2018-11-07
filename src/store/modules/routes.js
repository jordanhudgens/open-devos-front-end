import axios from "axios";

const state = {
  routes: [
    { name: "Homepage", requiresAuthentication: false },
    { name: "SearchResults", requiresAuthentication: false },
    { name: "Login", requiresAuthentication: false },
    { name: "Register", requiresAuthentication: false },
    { name: "Categories", requiresAuthentication: false },
    { name: "CategoryDetail", requiresAuthentication: false },
    { name: "PlanDetail", requiresAuthentication: false },
    { name: "DevoDetail", requiresAuthentication: false },
    { name: "Popular", requiresAuthentication: false },
    { name: "Profile", requiresAuthentication: false },

    { name: "Account", requiresAuthentication: true },
    { name: "DevoManager", requiresAuthentication: true },
    { name: "Bookmarks", requiresAuthentication: true },
    { name: "Publish", requiresAuthentication: true }
  ]
};

const getters = {
  routesThatDoNotRequireAuth: state => {
    return state.routes
      .filter(route => !route.requiresAuthentication)
      .map(routeObj => routeObj.name);
  }
};

export default {
  state,
  getters
};
