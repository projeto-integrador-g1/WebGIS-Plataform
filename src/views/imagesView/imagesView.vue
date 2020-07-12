<template>
  <v-expansion-panels >
    <div v-if="!showResults" class="text-md-center ma-12" style="padding-top:200px;">
        <v-progress-circular  
        indeterminate
        color="primary"
        size="60" 
        ></v-progress-circular>
    </div>
    <v-expansion-panel v-else>
      <v-expansion-panel-header>Resultados</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-col cols="12" sm="6" offset-sm="3">
          <v-card>
            <v-container fluid>
              <v-row >
                <v-col  v-for="(image, index) in imgurLinks" :key="index" cols="12" sm="6" offset-sm="3">
                  <v-card>
                    <v-img
                      :src="image"
                      :lazy-src="image"
                      aspect-ratio="1"
                      class="grey lighten-2"
                    ></v-img>
                    <v-card-text class="text--primary">
                      <div> <a target="_blank" :href="image" >Download</a></div>
                    </v-card-text>
                  </v-card>
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
      imgurLinks: []
    };
  },

  created() {
    this.$store.dispatch("getTalhoes");
  },
  
  computed:{
    imagesUserTalhoes(){
      return this.$store.getters.userTalhoes
    },

    showResults(){
      if(Object.keys(this.imagesUserTalhoes).length > 0){
        this.splitImages();
        return true;
      } else{
        return false;
      }
    }
  },

  methods:{
    splitImages(){
      const splitLink = this.imagesUserTalhoes.user_imgs.split(';');
      splitLink.pop();
      this.imgurLinks = splitLink;

      console.log('links de resposta', this.imgurLinks);
    }
  }
};
</script>
<style lang="scss" scoped></style>
