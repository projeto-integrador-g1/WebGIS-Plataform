import Vue from "vue";
import Vuex from "vuex";
import { apiService } from "@/services";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    barColor: "rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)",
    barImage:
      "https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg",
    drawer: null,
    catalog: {},
    isLogin: true,
    coordinatesShapefile: []
  },
  mutations: {
    SET_BAR_IMAGE(state, payload) {
      state.barImage = payload;
    },
    SET_DRAWER(state, payload) {
      state.drawer = payload;
    },
    SET_CATALOG(state, payload) {
      state.catalog = payload;
    },
    SET_LOGIN(state) {
      state.isLogin = false;
    },
    SET_COORDINATES_SHAPEFILE(state, payload) {
      state.coordinatesShapefile = payload;
    }
  },
  actions: {
    async sendCoordinates({ commit }, payload) {
      const imagesCatalog = await apiService.sendCoordinates(payload);
      commit("SET_CATALOG", imagesCatalog);
    },

    async sendImagesCatalog({ commit }, payload) {
      const data = await apiService.sendImagesCatalog(payload);
    },

    async authorizeUser({ commit }, payload) {
      await apiService.authorizeUser(payload);
    },
    setLogin({ commit }) {
      commit("SET_LOGIN");
    },

    async sendShapeFile({ commit }, payload) {
      const shapeCoordinates = await apiService.sendShapeFile(payload);
      commit("SET_COORDINATES_SHAPEFILE", shapeCoordinates);
    }
  },

  getters: {
    catalog: state => {
      return state.catalog;
    },
    hasLogin: state => {
      return localStorage.getItem("token") ? false : true;
    },
    coordinatesShapefile: state => {
      return state.coordinatesShapefile;
    }
  }
});
