<template>
  <div id="app">
    <Navigation />

    <div class="container">
      <div class="content-wrapper">
        <router-view :key="$route.path" />
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/shared/Navigation";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    Navigation
  },
  computed: {
    ...mapGetters({ currentUser: "currentUser" })
  }
};
</script>

<style lang="scss">
$teal: #156356;
$lightgray: #686868;

html {
  font-family: "Oxygen", sans-serif;
}

body {
  margin: 0px;
  width: 100vw;
}

.container {
  display: flex;
  justify-content: center;

  .content-wrapper {
    width: 900px;

    .card {
      padding: 42px;
      border-radius: 10px;
      -webkit-box-shadow: 6px 6px 40px 2px rgba(0, 0, 0, 0.2);
      -moz-box-shadow: 6px 6px 40px 2px rgba(0, 0, 0, 0.2);
      box-shadow: 6px 6px 40px 2px rgba(0, 0, 0, 0.2);

      a {
        text-decoration: none;
        .title {
          color: $teal;
          font-size: 1.3em;
        }
      }

      .plans-wrapper {
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 42px;

        .plan-metadata {
          margin-top: 15px;
          span {
            margin-right: 20px;
            color: $lightgray;
            font-size: 0.8em;
          }
        }

        .category-link {
          color: black;
          font-weight: 900;
        }
      }

      .split-columns {
        display: flex;
        justify-content: space-between;

        .left-column {
        }
      }
    }
  }
}

@media (max-width: 48em) {
  .container {
    width: calc(100vw - 30px);
    padding: 15px;

    .devo-detail-wrapper {
      padding-left: 0px;
      padding-right: 0px;
    }

    div,
    .returned-content {
      width: 100% !important;
    }
  }
}
</style>
