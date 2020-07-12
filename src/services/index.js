import axios from "axios";

export const apiService = {
  async sendCoordinates(data) {
    const response = await axios({
      url: "http://127.0.0.1:4002/api/geo/",
      method: "POST",
      data: data
    });

    return response.data;
  },

  async sendImagesCatalog(data) {
    const response = await axios({
      url: "http://127.0.0.1:4002/api/geoAI/",
      method: "POST",
      data: data
    });
    console.log("Api IA ", response.data);
    return response.data;
  },

  async authorizeUser(data) {
    const response = await axios({
      url: "https://app-auth1.herokuapp.com/api/auth/authorize",
      method: "POST",
      data: data
    });

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("isAdmin", response.data.sessao.isAdmin);
  },

  async getUsers(data) {
    const { onlyAdmin, idClient } = data;
    debugger;
    const response = await axios({
      url: `http://localhost:3000/api/auth/client/${idClient}`,
      method: "GET",
      params: onlyAdmin
    });

    return response.data;
  },

  async createUser(data) {
    const response = await axios({
      url: "https://app-auth1.herokuapp.com/api/auth/login",
      method: "POST",
      data: data
    });

    return response.data;
  },

  async sendShapeFileZIP(data) {
    const response = await axios({
      url: "http://127.0.0.1:4002/api/sendFile/",
      method: "POST",
      data: data,
      headers: { "Content-Type": "multipart/form-data" }
    });

    return response.data;
  },

  async getUserTalhoes(data) {
    const url = "http://127.0.0.1:4002/api/users/results/";
    const response = await axios({
      url,
      method: "GET"
    });

    return response.data;
  },

  async sendUserEmail(data) {
    const url = "http://127.0.0.1:4002/api/users/results/";
    const response = await axios({
      url,
      method: "POST",
      data: data
    });

    console.log("Email", response);
    return response.data;
  }
};

axios.interceptors.request.use(
  async config => {
    const userToken = await localStorage.getItem("token");
    config.headers.Authorization = { userToken };

    return config;
  },
  error => {
    // I cand handle a request with errors here
    return Promise.reject(error);
  }
);
