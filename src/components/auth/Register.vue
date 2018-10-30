<template>
  <div class="auth-page-wrapper">
    <div class="auth-form-elements">
      <h2>Register</h2>

      <div v-if="error">{{ error }}</div>

      <form class="auth-form" @submit.prevent="register">
        <input v-model="email" type="email" placeholder="Email address" required autofocus>
        <label for="email">Your email</label>

        <input v-model="fullName" type="text" placeholder="Full name" required>
        <label for="fullName">Your full name</label>

        <input v-model="password" type="password" placeholder="Password" required>
        <label for="password">Your password</label>

        <input v-model="passwordConfirmation" type="password" placeholder="Confirmn password" required>
        <label for="passwordConfirmation">Confirm your password</label>

        <div class="sm-bottom-spacer"></div>
        <button type="submit" class="btn">Register</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  name: 'Register',

  data() {
    return {
      email: '',
      fullName: '',
      password: '',
      passwordConfirmation: '',
      error: false,
    };
  },

  beforeMount() {
    this.routeGuard();
  },

  computed: {
    ...mapGetters([
      'getLoginStatus',
    ]),
  },

  methods: {
    routeGuard() {
      if (this.getLoginStatus === 'LOGGED_IN') {
        this.$router.push({ name: 'Homepage' });
      }
    },

    register() {
    },
  },
};
</script>