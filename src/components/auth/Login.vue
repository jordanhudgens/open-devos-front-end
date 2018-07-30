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
import { mapGetters } from 'vuex'

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
    login() {
      this.$http.post('/login', { user: this.email, password: this.password })
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
      this.error = 'Login failed!'
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