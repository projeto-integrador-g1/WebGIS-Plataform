import Vue from 'vue'
import Vuex from 'vuex'
import { apiService } from '@/services'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
    drawer: null,
    catalog: {}
  },
  mutations: {
    SET_BAR_IMAGE (state, payload) {
      state.barImage = payload
    },
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
    SET_CATALOG (state, payload) {
      state.catalog = payload
    },
  },
  actions: {
    async sendCoordinates({ commit }, payload) {
      const imagesCatalog = await apiService.sendCoordinates(payload);
      commit('SET_CATALOG', imagesCatalog);
    }
  },

  getters: {
    catalog: state => {
      return state.catalog
    }
  }
})
