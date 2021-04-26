import Vue from 'vue';
import Vuex from 'vuex';

import advisor from './modules/advisor';

/* loading Vuex */
Vue.use(Vuex);

/* creating store */
export default function() {
  return new Vuex.Store({
    modules: {
      advisor
    },

    /*
      enable strict mode (adds overhead!)
      for dev mode only
    */
    strict: process.env.DEBUGGING
  });
}
