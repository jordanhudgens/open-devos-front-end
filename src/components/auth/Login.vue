<template>
  <div>
    <h2>Login</h2>

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
      password: ''
    }
  },
  methods: {
    login() {
      console.log(this.email);
      console.log(this.password);
    }
  }
}
</script>

<style scoped>

</style>