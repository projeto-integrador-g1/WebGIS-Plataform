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
    <v-snackbar v-model="showModal" color="error" :timeout="6000">
      Por favor, tente fazer o login novamente
      <v-btn color="white" text @click="showModal = false">
        FECHAR
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      senha: "",
      showModal: false
    };
  },
  methods: {
    login() {
      if (!this.email || !this.senha) {
        this.showModal = true;
        return;
      }
      this.$store
        .dispatch("authorizeUser", { email: this.email, senha: this.senha, idClient: 1})
        .then(() => 
          this.$router.push({ name: "Mapa" })
        )
        .catch(() => (this.showModal = true));
    }
  }
};
</script>
