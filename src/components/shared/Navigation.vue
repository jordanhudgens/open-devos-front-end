<template>
  <div>
    <div class="navbar" :class="{ active: showMobileNavBar }">
      <a href="#" class="toggle" id="navHamburger" @click.prevent="toggleNav">
        <i class="fas fa-bars"></i>
      </a>

      <router-link class="brand" :to="{ name: 'Homepage' }">
        <img src="@/assets/logo.png" alt="">
      </router-link>

      <div class="navSearchBar">
        <input type="text" class="fa fa-input" v-model="query" :placeholder="searchPlaceholder" @keyup.enter="submitQuery">
      </div>
      <div class="right">
        <router-link v-for="navLink in navLinks" :key="navLink.linkName" :to="{ name: navLink.linkName }" class="link">
          <span @click="toggleNav">
            <i :class="navLink.linkIcon"></i> {{ navLink.linkName }}
          </span>
        </router-link>

        <router-link v-if="!userLoggedIn" :to="{ name: 'Login' }" class="link">
          <span @click="toggleNav">
            <i class="navIcon fas fa-sign-in-alt"></i> Login
          </span>
        </router-link>

        <router-link v-if="!userLoggedIn" :to="{ name: 'Register' }" class="link">
          <span @click="toggleNav">
            <i class="navIcon fas fa-user-plus"></i> Register
          </span>
        </router-link>

        <router-link v-if="userLoggedIn" :to="`/profile/${currentUser.profile_slug}`" class="link">
          <span @click="toggleNav">
            <i class="navIcon fas fa-user"></i> Profile
          </span>
        </router-link>

        <router-link v-if="userLoggedIn" :to="{ name: 'Bookmarks' }" class="link">
          <span @click="toggleNav">
            <i class="navIcon fas fa-bookmark"></i> Bookmarks
          </span>
        </router-link>

        <router-link v-if="userLoggedIn" :to="{ name: 'Publish' }" class="link">
          <span @click="toggleNav">
            <i class="navIcon fas fa-plus-square"></i> Publish
          </span>
        </router-link>

        <router-link v-if="userLoggedIn" :to="{ name: 'Logout' }" class="link">
          <span @click="toggleNav">
            <i class="navIcon fas fa-sign-out-alt"></i> Logout
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import axios from 'axios';

export default {
  name: 'Navigation',
  computed: {
    ...mapGetters({currentUser: 'currentUser'}),
  },
  mounted() {
    this.loggedIn();
  },
  watch: {
    $route(to, from) {
      this.loggedIn();
    },
  },
  data() {
    return {
      query: null,
      searchPlaceholder: `\uf002 Search Devos`,
      showMobileNavBar: false,
      userLoggedIn: null,
      navLinks: [
        {linkName: 'Categories', linkIcon: 'navIcon fas fa-map-signs'},
        {linkName: 'Popular', linkIcon: 'navIcon fas fa-chart-line'},
      ],
    };
  },
  methods: {
    submitQuery() {
      this.$router.push({
        name: 'SearchResults',
        params: {query: this.query},
      });
      this.query = '';
    },
    toggleNav() {
      if (this.showMobileNavBar) {
        this.showMobileNavBar = !this.showMobileNavBar;
      } else {
        this.showMobileNavBar = !this.showMobileNavBar;
      }
    },
    loggedIn() {
      if (localStorage.getItem('token')) {
        axios
          .get('https://open-devos-api.herokuapp.com/logged_in', {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          })
          .then(response => {
            if (response.data.logged_in === true) {
              console.log(response.data);
              this.userLoggedIn = true;
              return true;
            } else {
              this.userLoggedIn = false;
              return false;
            }
          })
          .catch(error => {
            this.userLoggedIn = false;
            return false;
          });
      } else {
        this.userLoggedIn = false;
        return false;
      }
    },
  },
};
</script>

<style scoped>
@import 'https://use.fontawesome.com/releases/v5.0.13/css/all.css';
@import './../../styles/navigation.css';
</style>
