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

        <router-link v-if="getLoginStatus !== 'LOGGED_IN'" :to="{ name: 'Login' }" class="link">
          <span @click="toggleNav">
            <i class="navIcon fas fa-sign-in-alt"></i> Login
          </span>
        </router-link>

        <router-link v-if="getLoginStatus !== 'LOGGED_IN'" :to="{ name: 'Register' }" class="link">
          <span @click="toggleNav">
            <i class="navIcon fas fa-user-plus"></i> Register
          </span>
        </router-link>

        <router-link v-if="getLoginStatus === 'LOGGED_IN'" :to="`/profile/${currentUser.profile_slug}`" class="link">
          <span @click="toggleNav">
            <i class="navIcon fas fa-user"></i> Profile
          </span>
        </router-link>

        <router-link v-if="getLoginStatus === 'LOGGED_IN'" :to="{ name: 'Bookmarks' }" class="link">
          <span @click="toggleNav">
            <i class="navIcon fas fa-bookmark"></i> Bookmarks
          </span>
        </router-link>

        <router-link v-if="getLoginStatus === 'LOGGED_IN'" :to="{ name: 'Publish' }" class="link">
          <span @click="toggleNav">
            <i class="navIcon fas fa-plus-square"></i> Publish
          </span>
        </router-link>

        <router-link v-if="getLoginStatus === 'LOGGED_IN'" :to="{ name: 'Account' }" class="link">
          <span @click="toggleNav">
            <i class="navIcon fas fa-cog"></i> Account
          </span>
        </router-link>

        <a v-if="getLoginStatus === 'LOGGED_IN'" @click.prevent="logout" class="link">
          <span @click="toggleNav">
            <i class="navIcon fas fa-sign-out-alt"></i> Logout
          </span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Navigation',

  data() {
    return {
      query: null,
      searchPlaceholder: `\uf002 Search Devos`,
      showMobileNavBar: false,
      navLinks: [
        { linkName: 'Categories', linkIcon: 'navIcon fas fa-map-signs' },
        { linkName: 'Popular', linkIcon: 'navIcon fas fa-chart-line' },
      ],
    };
  },

  // TODO
  // Utilize currentUser for navigation links such as profile/account, etc
  computed: {
    ...mapGetters([
      "currentUser",
      'getLoginStatus',
    ]),
  },

  methods: {
    ...mapMutations([
      'SET_LOGIN_STATUS'
    ]),

    logout() {
      axios
        .delete(`https://open-devos-api.herokuapp.com/logout`, {
          withCredentials: true,
        })
        .then(response => {
          // this.RETURN_TO_BASE_STATE();
          console.log("LOGOUT", response);
          this.SET_LOGIN_STATUS('NOT_LOGGED_IN');
          this.$router.push({
            name: 'Homepage',
          });
        })
        .catch(error => {
          console.log(error);
        });
    },

    submitQuery() {
      this.$router.push({
        name: 'SearchResults',
        params: { query: this.query },
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
  },
};
</script>

<style scoped>
@import 'https://use.fontawesome.com/releases/v5.0.13/css/all.css';
@import './../../styles/navigation.css';
</style>
