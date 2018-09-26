<template>
  <div class="devo-form-wrapper">
      <div v-if="errorSubmittingDevo">
        <h2>{{ responseMessage }}</h2>
      </div>

    <form @submit.prevent="formTypeSelector" class="form-wrapper">

      <div class="left-column">
        <div v-if="!devo.title || !devo.content" class="spacer">
          <button type="submit" class="btn-disabled" disabled>Fill in required fields</button>
        </div>

        <div v-else class="spacer">
          <button type="submit" class="btn">Publish Devo</button>
        </div>

        <div>
          <input type="text" v-model="devo.title" placeholder="Title" class="full-width-element">
        </div>

        <div>
          <p>Featured Image:
            <file-select v-model="devo.featuredImage"></file-select>
          </p>
          <p v-if="devo.featuredImage">{{ devo.featuredImage.name}}</p>
        </div>

        <div>{{ devo.status }}</div>
        <input type="checkbox" id="checkbox" v-model="devo.status" :true-value="'published'" :false-value="'draft'">
        <label v-if="devo.status === 'published'" for="checkbox">Switch to draft?</label>
        <label v-else for="checkbox">Publish publicly?</label>
      </div>

      <div class="right-column">
        <wysiwyg v-model="devo.content" />
      </div>

    </form>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import axios from 'axios';
import FileSelect from '@/components/shared/FileSelect';

export default {
  name: 'DevoForm',
  data() {
    return {
      devo: {
        title: null,
        content: null,
        status: null,
        featuredImage: null,
      },
      devoSlug: null,
      responseMessage: null,
      devoSubmittedSuccessfully: false,
      errorSubmittingDevo: false,
    };
  },
  props: {
    planId: Number,
    devos: Array,
    devoToEdit: Object,
  },
  computed: {
    ...mapGetters({currentUser: 'currentUser'}),
  },
  components: {
    FileSelect,
  },
  created() {
    if (this.devoToEdit) {
      this.devo = this.devoToEdit;
    }
  },
  watch: {
    devoToEdit(newValue, oldValue) {
      this.devo = newValue;
    },
  },
  methods: {
    formTypeSelector() {
      if (this.devoToEdit) {
        this.editDevoForm();
      } else {
        this.submitDevoForm();
      }
    },
    buildForm() {
      let formData = new FormData();

      formData.append('devo[title]', this.devo.title);
      formData.append('devo[content]', this.devo.content);
      formData.append('devo[plan_id]', this.planId);

      if (this.devo.status) {
        formData.append('devo[status]', this.devo.status);
      }

      if (this.devo.featuredImage) {
        formData.append('devo[devo_image]', this.devo.featuredImage);
      }

      return formData;
    },
    editDevoForm() {
      axios
        .patch(
          `https://open-devos-api.herokuapp.com/devos/${this.devoToEdit.slug}`,
          this.buildForm(),
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          },
        )
        .then(response => {
          this.errorSubmittingDevo = false;
          this.devoSubmittedSuccessfully = true;
          this.responseMessage = 'Your devo has been updated!';
          this.$emit('update', response.data.devo);
          return response.data;
        })
        .catch(error => {
          console.log(error);
          this.responseMessage =
            'There was an error submitting the form, make sure you filled out all required fields.';
          this.errorSubmittingDevo = true;
        });
    },
    submitDevoForm() {
      axios
        .post('https://open-devos-api.herokuapp.com/devos', this.buildForm(), {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
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
          this.responseMessage =
            'There was an error submitting the form, make sure you filled out all required fields.';
          this.errorSubmittingDevo = true;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/forms.scss';
</style>
