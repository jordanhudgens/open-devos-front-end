<template>
  <div class="auth-page-wrapper">
    <div class="auth-form-elements">
      <h2>Login</h2>

      <div v-if="error">{{ error }}</div>

      <form class="auth-form" @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Email address" required autofocus>
        <input v-model="password" type="password" placeholder="Password" required autofocus>

        <button type="submit">Login</button>
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

<style scoped lang="scss">
.auth-page-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-form {
  display: flex;
  flex-direction: column;
  width: 400px;

  input {
    margin-top: 15px;
    margin-bottom: 15px;
  }
}
</style>