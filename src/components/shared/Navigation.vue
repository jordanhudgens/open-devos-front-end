<template>
  <div>
    <div class="navbar">
      <a href="#" class="toggle" id="navHamburger">
        <i class="fas fa-bars"></i>
      </a>
      <a href="#" class="brand">MyName</a>
      <div class="left">
        <input type="text" placeholder="Search">
      </div>
      <div class="right">
        <a v-for="navLink in loggedInNavLinks" :key="navLink.linkname" href="#" class="link">
          <i :class="navLink.linkIcon"></i> {{ navLink.linkName }}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  props: {
    navItems: {
      type: Array,
      default: [],
      required: true
    }
  },
  data() {
    return {
      loggedInNavLinks: [
        { linkName: 'Categories', linkIcon: 'navIcon fas fa-map-signs' },
        { linkName: 'Popular', linkIcon: 'navIcon fas fa-chart-line' },
        { linkName: 'Profile', linkIcon: 'navIcon fas fa-user' },
        { linkName: 'Publish', linkIcon: 'navIcon fas fa-plus-square' },
      ]
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
}

.navbar .link:hover,
.navbar .link:active {
  color: #156356;
  border-bottom: #156356 solid 1px;
}

.navbar .brand {
  width: 10em;
  text-align: center;
  padding: 1em;
  color: white;
}

.navbar a {
  text-decoration: none;
}

.navbar .toggle {
  padding: 1em;
  color: #223047;
  vertical-align: middle;
}

@media (min-width: 48em) {
  .navbar {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
  .navbar .left,
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
}

.navbar div {
  display: none;
}

@media (min-width: 48em) {
  .navbar div {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
}

@media (max-width: 48em) {
  .navbar.active .toggle {
    background: #223047;
    color: white;
  }
  .navbar .brand {
    text-align: left;
  }
  .navbar.active div {
    display: block;
  }
}
</style>