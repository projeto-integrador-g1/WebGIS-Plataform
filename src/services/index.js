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
      url: "https://app-auth1.herokuapp.com/api/auth/login",
      method: "POST",
      data: data
    });

    localStorage.setItem("token", response.data);
  },

  async sendShapeFile(data){
    const response = await axios({
      url: "http://127.0.0.1:4002/api/",
      method: "POST",
      data: data
    });
    console.log('Envio de ShapeFile ',response.data);
    return response.data;
  },
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
