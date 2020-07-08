<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md4>
        <v-card align-center>
          <v-card-text class="text-xs-center">
            <h6 class="card-title font-weight-light">Login</h6>
            <br />
            <br />

            <p class="card-description font-weight-light">
              <v-text-field
                v-model="email"
                type="email"
                label="Email"
              ></v-text-field>
            </p>
            <p class="card-description font-weight-light">
              <v-text-field
                v-model="senha"
                type="password"
                label="Senha"
              ></v-text-field>
            </p>
            <v-btn
              color="success"
              rounded
              class="font-weight-light"
              @click="login"
              >Login</v-btn
            >
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      senha: ""
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("authorizeUser", { email: this.email, senha: this.senha })
        .then(() =>
          this.$store.dispatch
            .dispatch("setLogin")
            .then(() => this.$router.push({ name: "Mapa" }))
        );
    }
  }
};
</script>
