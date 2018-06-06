import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import routers from '@/router';

Vue.use(VueAnalytics, {
  id: 'UA-120438011-1',
  router
})