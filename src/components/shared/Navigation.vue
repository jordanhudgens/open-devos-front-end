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
        <router-link v-for="navLink in loggedInNavLinks" :key="navLink.linkName" :to="{ name: navLink.linkName }" class="link">
          <i :class="navLink.linkIcon"></i> {{ navLink.linkName }}
        </router-link>

        <router-link v-if="!currentUser" :to="{ name: 'Login' }" class="link">
          <i class="navIcon fas fa-sign-in-alt"></i> Login
        </router-link>

        <router-link v-if="!currentUser" :to="{ name: 'Register' }" class="link">
          <i class="navIcon fas fa-user-plus"></i> Register
        </router-link>

        <router-link v-if="currentUser" :to="{ name: 'Profile' }" class="link">
          <i class="navIcon fas fa-user"></i> Profile
        </router-link>

        <router-link v-if="currentUser" :to="{ name: 'Publish' }" class="link">
          <i class="navIcon fas fa-plus-square"></i> Publish
        </router-link>

        <router-link v-if="currentUser" :to="{ name: 'Logout' }" class="link">
          <i class="navIcon fas fa-sign-out-alt"></i> Logout
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Navigation',
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  created() {
    console.log(this.currentUser);
  },
  watch: {
    '$route': function() {
      console.log('updated from nav');
    }
  },
  data() {
    return {
      query: null,
      searchPlaceholder: `\uf002 Search Devos`,
      showMobileNavBar: false,
      loggedInNavLinks: [
        { linkName: 'Categories', linkIcon: 'navIcon fas fa-map-signs' },
        { linkName: 'Popular', linkIcon: 'navIcon fas fa-chart-line' },
      ]
    }
  },
  methods: {
    submitQuery() {
      this.$router.push({
        name: "SearchResults",
        params: { query: this.query }
      });
      this.query = '';
    },
    toggleNav() {
      if (this.showMobileNavBar) {
        this.showMobileNavBar = !this.showMobileNavBar;
      } else {
        this.showMobileNavBar = !this.showMobileNavBar;
      }
    }
  }
}
</script>

<style scoped>
@import 'https://use.fontawesome.com/releases/v5.0.13/css/all.css';

.navbar {
  background: white;
  height: 90px;
  border-bottom: lightgray solid 1px;
}

.navbar .toggle,
.navbar .brand {
  display: flex;
  align-items: center;
}

.navIcon {
  margin-right: 10px;
}

.navbar .link {
  display: flex;
  align-items: center;
  text-align: center;
  padding: 2em;
  text-decoration: none;
  color: #239a87;
  background-color: white;
  font-size: 1.2rem;
  border-bottom: transparent solid 1px;
}

.navbar .link:hover,
.navbar .link:active {
  color: #156356;
  border-bottom: #156356 solid 1px;
}

.navbar .brand {
  width: 15em;
  text-align: center;
  padding: 1em;
  color: white;
}

.navbar a {
  text-decoration: none;
}

.navSearchBar {
  font-family: "Font Awesome\ 5 Free", Helvetica, sans-serif;
}

.navSearchBar input {
  width: 75%;
  padding-left: 21px;
}

.navbar .toggle {
  padding: 1em;
  color: #223047;
  vertical-align: middle;
}

.brand img {
  width: 100%;
}

.navSearchBar input[type="text"] {
  font-size: 1.3em;
  font-family: "Font Awesome\ 5 Free", Arial, Helvetica, sans-serif;
  color: #585858;
  border-top: 1px solid transparent;
  border-right: 1px solid transparent;
  border-left: 1px solid transparent;
  border-bottom: 1px solid transparent;
}

.navSearchBar input[type="text"]::placeholer {
  font-family: "Font Awesome\ 5 Free", Arial, Helvetica, sans-serif;
  color: #a4a4a4;
}

.navSearchBar input[type="text"]:focus {
  outline: none;
  border-bottom: 1px solid #239a87;
}

@media (min-width: 48em) {
  .navbar {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
  .navbar .navSearchBar,
  .navbar .right {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
  }
  .navbar .link {
    width: auto;
  }
  .navbar .right {
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end;
  }
  .navbar .toggle {
    display: none;
  }

  .navbar div {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
}

.navbar div {
  display: none;
}

@media (max-width: 48em) {
  .navbar {
    display: flex;
  }

  .navbar.active {
    width: 100vw;
  }

  .navbar.active div {
    display: grid;
    width: 100vw;
    position: absolute;
    top: 91px;
  }
}
</style>