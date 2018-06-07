<template>
  <div>
    <div v-if="devoSubmittedSuccessfully">
      <h2>{{ responseMessage }}</h2>
    </div>

    <div>
      <h2>Add a Devo to the Plan</h2>

      <div v-if="errorSubmittingDevo">
        <h2>{{ responseMessage }}</h2>
      </div>

      <form @submit.prevent="formTypeSelector" class="form-wrapper">

        <div>
          <input type="text" v-model="devoTitle" placeholder="Title">
        </div>

        <div>{{ devoStatus }}</div>
        <input type="checkbox" id="checkbox" v-model="devoStatus" :true-value="'published'" :false-value="'draft'">
        <label v-if="devoStatus === 'published'" for="checkbox">Switch to draft?</label>
        <label v-else for="checkbox">Publish publicly?</label>

        <wysiwyg v-model="devoContent" />

        <button type="submit" :disabled="!devoTitle || !devoContent">Publish Devo</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  name: 'DevoForm',
  data() {
    return {
      devoTitle: '',
      devoContent: '',
      devoStatus: null,
      devoSlug: null,
      responseMessage: null,
      devoSubmittedSuccessfully: false,
      errorSubmittingDevo: false,
    }
  },
  props: {
    planId: Number,
    devos: Array,
    devoToEdit: Object,
  },
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  created() {
    if (this.devoToEdit) {
      this.devoTitle = this.devoToEdit.title;
      this.devoContent = this.devoToEdit.content;
      this.devoStatus = this.devoToEdit.status;
    }
  },
  watch: {
    devoToEdit(newValue, oldValue) {
      this.devoTitle = newValue.title;
      this.devoContent = newValue.content;
      this.devoStatus = newValue.status;
    }
  },
  methods: {
    formTypeSelector() {
      if (this.devoToEdit) {
        this.editDevoForm()
      } else {
        this.submitDevoForm()
      }
    },
    editDevoForm() {
      axios
        .patch(`https://open-devos-api.herokuapp.com/devos/${this.devoToEdit.slug}`,
        {
          devo: {
            title: this.devoTitle,
            content: this.devoContent,
            position: 5,
            plan_id: this.planId,
            status: this.devoStatus,
          }
        },
        {
          headers: {
            "Authorization": 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then(response => {
          this.errorSubmittingDevo = false;
          this.devoSubmittedSuccessfully = true;
          this.responseMessage = 'Your devo has been published!';
          this.$emit('update', response.data.devo);
          return response.data;
        })
        .catch(error => {
          console.log(error);
          this.responseMessage = 'There was an error submitting the form, make sure you filled out all required fields.';
          this.errorSubmittingDevo = true;
        })
    },
    submitDevoForm() {
      axios
        .post("https://open-devos-api.herokuapp.com/devos",
        {
          devo: {
            title: this.devoTitle,
            content: this.devoContent,
            position: 5,
            plan_id: this.planId,
            status: this.devoStatus,
          }
        },
        {
          headers: {
            "Authorization": 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then(response => {
          this.errorSubmittingDevo = false;
          this.devoSubmittedSuccessfully = true;
          this.responseMessage = 'Your devo has been published!';
          this.$emit('new', response.data.devo);
          return response.data;
        })
        .catch(error => {
          console.log(error);
          this.responseMessage = 'There was an error submitting the form, make sure you filled out all required fields.';
          this.errorSubmittingDevo = true;
        })
    }
  }
}
</script>

<style lang="scss" scoped>
// .form-wrapper {
//   display: grid;
//   grid-template-columns: repeat(1fr);
//   grid-gap: 20px; // input {
//   //   background-color: transparent;
//   //   border-top: 1px transparent;
//   //   border-right: 1px transparent;
//   //   border-left: 1px transparent;
//   //   border-bottom: 1px #42b983 solid;
//   //   padding-bottom: 5px;
//   //   border-radius: 0px;
//   // }
//   button {
//     font-size: 1em;
//     background-color: #42b983;
//     border: #42b983 1px solid;
//     color: #29394b;
//     border-radius: 5px;
//     height: 42px;
//     font-weight: 900;
//   }
//   input[type="text"] {
//     font-size: 1.2em; // color: #eaeaea;
//   }
//   textarea {
//     // background-color: transparent;
//     font-size: 1.2em; // color: #eaeaea;
//     border: 1px solid #42b983;
//     padding: 10px;
//     border-radius: 0px;
//   }
// }
</style>