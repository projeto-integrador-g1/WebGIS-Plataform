import axios from "axios";

export const apiService = {
  async sendCoordinates(data) {
    const response = await axios({
      url: "http://127.0.0.1:4002/api/geo/",
      method: "POST",
      data: data
    });
    console.log(response.data);
    return response.data;
  },

  async sendImagesCatalog(data){
    const response = await axios({
      url: "http://127.0.0.1:4002/api/geoAI/",
      method: "POST",
      data: data
    });
    console.log('Api IA ',response.data);
    return response.data;
  }
};

