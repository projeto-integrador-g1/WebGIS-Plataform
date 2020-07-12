<template>
    <div>
        <v-row justify="center">
        <v-dialog v-model="showResultsTalhoes" @click:outside='closeResultsTalhoes' scrollable max-width="800px">
          <v-card height="100%" >
            <h1 class="font-weight-bold text-center">Resultados</h1>
            <v-divider></v-divider>
            <v-row v-if="Object.keys(imagesResultsTalhoes).length == 0" justify="center" style="height: 600px;">
               <div class="text-md-center ma-12" style="padding-top:200px;">
                    <v-progress-circular  
                    indeterminate
                    color="primary"
                    size="60" 
                    ></v-progress-circular>
                </div>
            </v-row>
            <v-row v-show="Object.keys(imagesResultsTalhoes).length > 0">
              <v-col  v-for="(image, index) in imagesResultsTalhoes.links" :key="index" cols="12" sm="6" offset-sm="3">
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
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn color="blue darken-1" text @click="closeResultsTalhoes">Cancelar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
</template>

<script>
    export default {
        name: 'TalhoesResults',
        props: {
            value: {
                type: Boolean
            },
        },

        computed:{
            showResultsTalhoes: {
                get(){
                    return this.value;
                },

                set(value){
                    this.$emit('input', value);
                }
            },

            imagesResultsTalhoes(){
                return this.$store.getters.resulsTalhoes;
            }
        },

        methods:{
            closeResultsTalhoes(){
                this.cleanResultsTalhoes();
                this.showResultsTalhoes = false;
            },
            
            cleanResultsTalhoes(){
              this.$store.commit("SET_RESULTS_TALHOES", {});
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>