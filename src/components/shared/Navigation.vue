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
        <a href="#" class="link">Link 1</a>
        <a href="#" class="link">Link 2</a>
        <a href="#" class="link">Link 3</a>
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
    }
  }
}
</script>

<style scoped>
.navbar {
  background: #415068;
}

.navbar .toggle,
.navbar .brand {
  display: inline-block;
}

.navbar .link {
  display: block;
  text-align: center;
  padding: 1em;
  text-decoration: none;
  background: #223047;
  color: white;
}

.navbar .link:hover,
.navbar .link:active {
  color: #223047;
  background: white;
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
  color: black;
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