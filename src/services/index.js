import axios from "axios";

export const apiService = {
  async sendCoordinates(data) {
    const response = await axios({
      url: "http://127.0.0.1:5000/api/geo/",
      method: "POST",
      data: data
    });
    console.log(response.data);
    return response.data;
  }
};

