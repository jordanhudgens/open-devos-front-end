<template>
  <div>
    <h2>Register</h2>

    <div v-if="error">{{ error }}</div>

    <form @submit.prevent="register">
      <input v-model="email" type="email" placeholder="Email address" required autofocus>
      <input v-model="password" type="password" placeholder="Password" required>
      <input v-model="passwordConfirmation" type="password" placeholder="Confirmn password" required>

      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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
        name: "SearchResults"
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

<style scoped>

</style>