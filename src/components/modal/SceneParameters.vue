<template>
    <div>
        <v-row justify="center">
        <v-dialog v-model="showSceneParameters" @click:outside='closeSceneParameters' scrollable max-width="800px">
          <v-card>
            <h1 class="font-weight-bold text-center">Parâmetros</h1>
            <v-divider></v-divider>
            <v-card-text style="height: 600px;">
              <h2>
                Satélite
              </h2>
              <v-radio-group v-model="satelite" row>
                <v-radio class="font-weight-black" label="Sentinel" value="sentinel"></v-radio>
                <v-radio class="font-weight-black" label="Landsat" value="landsat"></v-radio>
                <v-radio class="font-weight-black" label="Ambos" value="ambos"></v-radio>
              </v-radio-group>
              <v-divider></v-divider>

              <h2 class="mb-10">
                Nível de cobertura de nuvem
              </h2>
              <v-slider v-model="cloudCouverage" thumb-label="always"  prepend-icon="mdi-cloud"></v-slider>
              <v-divider></v-divider>

              <h2>
                Período de data das imagens
              </h2>
              <v-container fluid>
                <v-row>
                  <v-col cols="6" >
                    <v-date-picker v-model="date" range locale="pt-br" show-current></v-date-picker>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field v-model="dateRangeText" label="Período entre as datas" prepend-icon="mdi-event" readonly></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn color="blue darken-1" text @click="closeSceneParameters">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="validateSceneParameters">Pesquisar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <ImagesCatalog v-model="showImagesCatalog"/>
    </div>
</template>

<script>
    import ImagesCatalog from "../../components/modal/ImagesCatalog.vue";

    export default {
        name: 'SceneParameters',
        components: { ImagesCatalog},
        props: {
            value: {
                type: Boolean
            },
            coordinates:{
                type: Array
            }
        },

        data(){
            return {
                showImagesCatalog: false,
                parameters:{
                    date: [],
                    satelite: '',
                    cloudCouverage: null,
                    geo_coord: []
                },

                date: [],
                satelite: '',
                cloudCouverage: null,
            }
        },


        computed: {
            dateRangeText () {
                return this.date.join(' ~ ')
            },

            showSceneParameters: {
                get(){
                    return this.value;
                },

                set(value){
                    this.$emit('input', value);
                }
            }
        },

        methods:{
            validateSceneParameters(){
                if(!this.satelite || !this.date){
                    console.log('Nao Existe dado para satelite, data e nuvem');
                    console.log('Satelite: ' + this.satelite);
                    console.log('Data: ' + this.date);
                    console.log('Nuvem: ' + this.cloudCouverage);

                    return
                } else{
                    console.log('Existe dado para satelite, data e nuvem');
                    console.log('Satelite: ' + this.satelite);
                    console.log('Data: ' + this.date);
                    console.log('Nuvem: ' + this.cloudCouverage);

                    this.parameters.date = this.date;
                    this.parameters.satelite = this.satelite;
                    this.parameters.cloudCouverage = this.cloudCouverage;
                    this.parameters.geo_coord = this.coordinates;

                    // if(this.coordinates.length){
                    //   this.parameters.geo_coord = this.coordinates;
                    // }

                    console.log(this.parameters);
                    this.sendCoordinates();
                    this.showImagesCatalog = true;
                }
            },

            sendCoordinates() {
                this.$store.dispatch("sendCoordinates", this.parameters);
            },

            closeSceneParameters(){
                this.cleanSceneParameters();
                this.showSceneParameters = false;
            },

            cleanSceneParameters(){
                this.date = [];
                this.satelite = '';
                this.cloudCouverage = null;
                this.parameters.geo_coord = [];
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>