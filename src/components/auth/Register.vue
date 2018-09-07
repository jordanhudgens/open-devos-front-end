<template>
  <div class="auth-page-wrapper">
    <div class="auth-form-elements">
      <h2>Register</h2>

      <div v-if="error">{{ error }}</div>

      <form class="auth-form" @submit.prevent="register">
        <input v-model="email" type="email" placeholder="Email address" required autofocus>
        <label for="email">Your email</label>

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
import { mapGetters } from 'vuex'
import axios from "@/data/vue-axios";

export default {
  name: 'Register',
  data() {
    return {
      email: '',
      password: '',
      passwordConfirmation: '',
      error: false
    }
  },
  methods: {
    register() {
      this.$http.post('/register', { user: this.email, password: this.password, password_confirmation: this.passwordConfirmation })
        .then(request => this.loginSuccessful(request))
        .catch(() => this.loginFailed())
    },
    loginSuccessful(req) {
      if (!req.data.token) {
        this.loginFailed()
        return
      }

      localStorage.token = req.data.token
      this.$store.dispatch('login')
      this.error = false

      this.$router.push({
        name: "Homepage"
      });
    },
    loginFailed() {
      this.error = 'Registration failed!'
      this.$store.dispatch('logout')
      delete localStorage.token
    }
  },
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  }
}
</script>

<style lang="scss">
@import '../../styles/auth.scss';
</style>