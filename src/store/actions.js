// https://vuex.vuejs.org/en/actions.html
import { apiService } from "@/services";

export default {
  async sendCoordinates({ commit }, payload) {
    return await apiService.sendCoordinates(payload);
  }
};
