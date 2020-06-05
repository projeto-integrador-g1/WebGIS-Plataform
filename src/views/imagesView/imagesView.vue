<template>
  <v-expansion-panels>
    <v-expansion-panel v-for="(item, i) in 2" :key="i">
      <v-expansion-panel-header>Resultado</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-col cols="12" sm="6" offset-sm="3">
          <v-card>
            <v-container fluid>
              <v-row>
                <v-col>
                  <v-carousel>
                    <v-carousel-item
                      v-for="(item, i) in imgurLinks"
                      :key="i"
                      :src="item"
                      reverse-transition="fade-transition"
                      transition="fade-transition"
                    ></v-carousel-item>
                  </v-carousel>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
export default {
  data() {
    return {
      imgurLinks: [
        "https://i.imgur.com/KLoDw18.png",
        "https://i.imgur.com/rqT4Bmx.png",
        "https://i.imgur.com/qpkWowI.jpg",
        "https://i.imgur.com/Xq9UTpP.png"
      ]
    };
  }
};
</script>
<style lang="scss" scoped></style>
