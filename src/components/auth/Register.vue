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
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Register',

  data() {
    return {
      email: '',
      fullName: '',
      password: '',
      passwordConfirmation: '',
      error: false,
      registrationUrl: "https://open-devos-api.herokuapp.com/registrations"
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
    ...mapMutations([
      'SET_CURRENT_USER',
      'SET_LOGIN_STATUS'
    ]),

    routeGuard() {
      if (this.getLoginStatus === 'LOGGED_IN') {
        this.$router.push({ name: 'Homepage' });
      }
    },

    register() {
      axios
        .post(
        this.registrationUrl,
        {
          user: {
            email: this.email,
            full_name: this.fullName,
            password: this.password,
            password_confirmation: this.password,
          },
        },
        { withCredentials: true },
      )
        .then(response => {
          if (response.data.status === "created") {
            this.SET_CURRENT_USER(response.data.user);
            this.SET_LOGIN_STATUS('LOGGED_IN');
            this.$router.push({ name: 'Homepage' });
          }
        })
        .catch(error => {
          console.log("error occurred with registration", error);
        });
    },
  },
};
</script>