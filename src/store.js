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
    coordinatesShapefile: {},
    resulsTalhoes: {},
    user_email: null,
    user_talhoes: {}
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
    },
    SET_RESULTS_TALHOES(state, payload) {
      state.resulsTalhoes = payload;
    },
    SET_USER_EMAIL(state, payload) {
      state.user_email = payload;
    },
    SET_USER_TALHOES(state, payload) {
      state.user_talhoes = payload;
    }
  },
  actions: {
    async sendCoordinates({ commit }, payload) {
      const imagesCatalog = await apiService.sendCoordinates(payload);
      commit("SET_CATALOG", imagesCatalog);
    },

    async sendImagesCatalog({ commit }, payload) {
      const resulsTalhoes_ = await apiService.sendImagesCatalog(payload);
      console.log("Imagens dos talhoes", resulsTalhoes_);
      commit("SET_RESULTS_TALHOES", resulsTalhoes_);
    },

    async authorizeUser({ commit }, payload) {
      const email = { email: payload.email };
      commit("SET_USER_EMAIL", email);

      await apiService.authorizeUser(payload);
      await apiService.sendUserEmail(email);
      //const user_talhoes = await apiService.getUserTalhoes(email);
      //commit("SET_USER_TALHOES", user_talhoes);
    },

    setLogin({ commit }) {
      commit("SET_LOGIN");
    },

    async sendShapeFileZIP({ commit }, payload) {
      const shapeCoordinates = await apiService.sendShapeFileZIP(payload);
      commit("SET_COORDINATES_SHAPEFILE", shapeCoordinates);
    },

    async getTalhoes({ commit, state }) {
      const user_talhoes = await apiService.getUserTalhoes(state.user_email);
      commit("SET_USER_TALHOES", user_talhoes);
    }
  },

  getters: {
    catalog: state => {
      return state.catalog;
    },
    hasLogin: state => {
      return state.hasLogin;
    },
    coordinatesShapefile: state => {
      return state.coordinatesShapefile;
    },
    resulsTalhoes: state => {
      return state.resulsTalhoes;
    },
    userEmail: state => {
      return state.user_email;
    },
    userTalhoes: state => {
      return state.user_talhoes;
    }
  }
});
