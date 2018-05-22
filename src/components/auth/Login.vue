<template>
  <div>
    <h2>Login</h2>

    <div v-if="error">{{ error }}</div>

    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email address" required autofocus>
      <input v-model="password" type="password" placeholder="Password" required autofocus>

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
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
      this.$http.post('/auth', { user: this.email, password: this.password })
        .then(request => this.loginSuccessful(request))
        .catch(() => this.loginFailed())
    },
    loginSuccessful(req) {
      if (!req.data.token) {
        this.loginFailed()
        return
      }

      localStorage.token = req.data.token
      this.error = false

      this.$router.push({
        name: "SearchResults"
      });
    },
    loginFailed() {
      this.error = 'Login failed!'
      delete localStorage.token
    }
  }
}
</script>

<style scoped>

</style>