<template>
  <div>
    <h1>Bookmarks</h1>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: 'Bookmarks',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters({ currentUser: "currentUser" })
  },
  beforeMount() {
    this.getBookmarks();
  },
  methods: {
    getBookmarks() {
      axios
        .get("https://open-devos-api.herokuapp.com/bookmarks", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          },
          params: {
            user_id: this.currentUser.id
          }
        })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log("error: ", error);
        });
    },
  }
}
</script>

<style scoped>

</style>