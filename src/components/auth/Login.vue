<template>
  <div class="auth-page-wrapper">
    <div class="auth-form-elements">
      <h2>Login</h2>

      <div v-if="error">{{ error }}</div>

      <form class="auth-form" @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Email address" required autofocus>
        <label for="email">Email</label>

        <input v-model="password" type="password" placeholder="Password" required>
        <label for="password">Password</label>

        <div class="sm-bottom-spacer"></div>
        <button type="submit" class="btn">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Login',

  data() {
    return {
      email: '',
      password: '',
      error: false
    }
  },

  methods: {
    ...mapMutations([
      'SET_CURRENT_USER',
      'SET_LOGIN_STATUS'
    ]),

    login() {
      axios
        .post(
        'https://open-devos-api.herokuapp.com/sessions',
        {
          user: {
            email: this.email,
            password: this.password,
          },
        },
        { withCredentials: true },
      )
        .then(response => {
          console.log('res from login', response.data);
          if (response.data.status === "created") {
            this.SET_CURRENT_USER(response.data.user);
            this.SET_LOGIN_STATUS('LOGGED_IN');
            this.$router.push({ name: 'Homepage' });
          }
        })
        .catch(error => {
          this.$emit('loginError', error);
        });
    },
  },
}
</script>