<template>
  <div>
    <v-container>
      <v-card>
        <v-data-table :headers="headers" :items="items" class="elevation-1"></v-data-table>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { apiService } from "../../services";

export default {
  async mounted() {
    await this.getAllUsers();
  },
  data() {
    return {
      headers: [
        { text: "Id", value: "id" },
        { text: "Email", value: "email" },
        { text: "Admin", value: "isAdmin" }
      ],
      items: []
    };
  },
  methods: {
    async getAllUsers() {
      return await apiService.getUsers({ idClient: 1, onlyAdmin: false });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
