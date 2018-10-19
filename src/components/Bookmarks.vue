<template>
  <div>
    <h1>Bookmarks</h1>

    <ThumbCards :collection="bookmarks" routeName="PlanDetail" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import ThumbCards from '@/components/shared/ThumbCards';

export default {
  name: 'Bookmarks',
  data() {
    return {
      bookmarks: null
    }
  },
  computed: {
    ...mapGetters({ currentUser: "currentUser" })
  },
  components: {
    ThumbCards
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
          this.bookmarks = [];

          const plans = response.data.bookmarks.map(bookmark => bookmark.plan);

          this.bookmarks.push(...plans);
          console.log(response.data);
        })
        .catch(error => {
          console.log("error: ", error);
        });
    },
  }
}
</script>
