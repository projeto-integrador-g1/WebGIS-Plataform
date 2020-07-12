<template>
    <div>
        <v-row justify="center">
        <v-dialog v-model="showImagesCatalog" @click:outside='closeImagesCatalog' scrollable max-width="800px">
          <v-card height="100%" >
            <h1 class="font-weight-bold text-center">Catálogo de Imagens</h1>
            <v-divider></v-divider>
            <v-row v-show="Object.keys(imagesCatalog).length == 0" justify="center" style="height: 600px;">
               <div class="text-md-center ma-12" style="padding-top:200px;">
                    <v-progress-circular  
                    indeterminate
                    color="primary"
                    size="60" 
                    ></v-progress-circular>
                </div>
            </v-row>
            <v-row v-show="Object.keys(imagesCatalog).length > 0">
              <v-col  v-for="(image, index) in imagesCatalog" :key="index" cols="6" sm="4">
                <v-card>
                  <v-img
                    :src="image.href"
                    :lazy-src="image.href"
                    aspect-ratio="1"
                    class="grey lighten-2"
                  ></v-img>
                  <v-card-text class="text--primary">
                    <div> <b>Satélite:</b> {{image.collection}}</div>
                    <div> <b>Cobertura de Nuvem:</b> {{image.cloud_cover}}</div>
                    <div> <b>Data:</b> {{image.datetime}}</div>
                    <div>
                      <v-checkbox justify='center' v-model="selectedImagesCatalog"  
                      :value="image.scene_id">
                      </v-checkbox>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn color="blue darken-1" text @click="closeImagesCatalog">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="validateImagesCatalog">Pesquisar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <TalhoesResults v-model="showResultsTalhoes"/>
    </div>
</template>

<script>
    import TalhoesResults from "../../components/modal/TalhoesResults.vue";

    export default {
        name: 'ImagesCatalog',
        components: { TalhoesResults},
        props: {
            value: {
                type: Boolean
            },
        },

        data(){
            return{
                selectedImagesCatalog: [],
                catalog: {
                  images: []
                },
                showResultsTalhoes: false,
            }
        },

        computed:{
            showImagesCatalog: {
                get(){
                    return this.value;
                },

                set(value){
                    this.$emit('input', value);
                }
            },

            imagesCatalog(){
                console.log('catalog images ', this.$store.getters.catalog);
                return this.$store.getters.catalog
            }
        },

        methods:{
            validateImagesCatalog(){
                if(!this.selectedImagesCatalog){
                    console.log('Nao Existe dado para catalogo de imagens');
                    console.log('Catalo de Imagens: ' + this.selectedImagesCatalog);
                    return 
                }

                console.log('Catalogo de imagens escolhido: ' + this.selectedImagesCatalog);
                this.catalog.images = [];
                this.catalog.images = this.selectedImagesCatalog;
                console.log(this.catalog.images, 'catalogo de images escolhido');
                this.sendImagesCatalog();
                this.showResultsTalhoes = true;
            },

            closeImagesCatalog(){
                if(this.imagesCatalog){
                  this.cleanImagesCatalog();
                  console.log('dados do catalog', this.imagesCatalog);
                } else {
                  console.log('Nao existe dados no images catalog');
                }

                this.showImagesCatalog = false;
            },
            
            cleanImagesCatalog(){
              this.$store.commit("SET_CATALOG", {});
              this.catalog.images = [];
            },

            sendImagesCatalog(){
              this.$store.dispatch("sendImagesCatalog", this.catalog);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>