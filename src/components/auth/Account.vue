<template>
  <div class="">

    <div class="heading">
      <h2>Account Settings</h2>

      <div v-if="error">{{ error }}</div>
    </div>

    <form class="auth-form account-page-wrapper" @submit.prevent="updateAccount">
      <div class="left-column"> <input id="email" v-model="user.email" type="email" placeholder="Email address" required>
        <label for="email">Your email</label>

        <input id="fullName" v-model="user.fullName" type="text" placeholder="Full Name" required>
        <label for="fullName">Your full name</label>
      </div>

      <div class="middle-column">
        <input id="password" v-model="user.password" type="password" placeholder="Password" required>
        <label for="password">Your password</label>

        <input id="passwordConfirmation" v-model="user.passwordConfirmation" type="password" placeholder="Confirm password" required>
        <label for="passwordConfirmation">Confirm your password</label>
      </div>

      <div class="right-column">
        <div v-if="user.avatar" class="account-profile-image-wrapper">
          <img :src="user.avatar">
        </div>

        <div>
          <file-select v-model="user.avatar"></file-select>
        </div>

        <div v-if="user.avatar">{{ user.avatar.name }}</div>
      </div>

      <div class="sm-bottom-spacer"></div>
      <button type="submit" class="btn">Update Account</button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import FileSelect from '@/components/shared/FileSelect';

export default {
  name: 'Account',

  data() {
    return {
      user: {
        email: null,
        fullName: null,
        password: null,
        passwordConfirmation: null,
        avatar: null,
      },
      userLoggedIn: null,
      error: false,
    };
  },

  components: {
    FileSelect,
  },

  mounted() {
    this.routeGuard();
    this.populateForm();
  },

  computed: {
    ...mapGetters([
      'getLoginStatus',
      'currentUser',
    ]),
  },

  methods: {
    populateForm() {
      console.log("current user avatar", this.currentUser.avatar);
      this.user = {
        email: this.currentUser.email,
        fullName: this.currentUser.full_name,
        avatar: this.currentUser.avatar,
      }
    },

    routeGuard() {
      if (this.getLoginStatus === 'NOT_LOGGED_IN') {
        this.$router.push({ name: 'Homepage' });
      }
    },

    buildForm() {
      let formData = new FormData();

      formData.append('user[email]', this.user.email);
      formData.append('user[full_name]', this.user.fullName);
      formData.append('user[password]', this.user.password);
      formData.append(
        'user[password_confirmation]',
        this.user.passwordConfirmation,
      );

      if (this.user.avatar) {
        formData.append('user[avatar]', this.user.avatar);
      }

      return formData;
    },

    updateAccount() {
      axios
        .patch(
        `https://open-devos-api.herokuapp.com/users/${this.currentUser.id}`,
        this.buildForm(),
        {
          withCredentials: true
        },
      )
        .then(response => {
          console.log('responsee from account', response);
          return response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
};
</script>