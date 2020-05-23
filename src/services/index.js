import axios from "axios";

const apiService = {
  async sendCoordinates(data) {
    const response = await axios({
      url: "",
      method: "POST",
      data: data
    });

    return response.data;
  }
};

export default apiService;
