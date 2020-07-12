<template>
    <div>
        <v-row justify="center">
        <v-dialog v-model="showLoadingShapeFile" @click:outside='closeLoadingShapefile' scrollable max-width="800px">
          <v-card height="100%">
            <h1 class="font-weight-bold text-center">Carregando coordenadas do ShapeFile</h1>
            <v-divider></v-divider>
            <v-row   justify="center" style="height: 600px;">
               <div v-if="validateCoordinates" class="text-md-center ma-12" style="padding-top:200px;">
                    <v-progress-circular  
                    indeterminate
                    color="primary"
                    size="60" 
                    ></v-progress-circular>
                </div>
            </v-row>
          </v-card>
        </v-dialog>
      </v-row>

      <SceneParameters v-model="showSceneParameters" :coordinates="geo_coord"/>
    </div>
</template>


<script>
import SceneParameters from "../../components/modal/SceneParameters.vue";


export default {
  name: 'LoadingShapeFile',
  components: { SceneParameters},
  props: {
    value: {
        type: Boolean
    }
  },
  data() {
    return {
        showSceneParameters: false,
        geo_coord: [],
    }
  },

  computed:{
    showLoadingShapeFile: {
        get(){
            return this.value;
        },

        set(value){
            this.$emit('input', value);
        }
    },

    coordinatesShapefile(){
        return this.$store.getters.coordinatesShapefile;
    },

    validateCoordinates(){
      if(Object.keys(this.coordinatesShapefile).length > 0){
        this.geo_coord = [],
        this.validateShapeParameters();
        return true;
      } else {
        return false;
      }
    },
  },

  methods: {
      closeLoadingShapefile(){
          this.$store.commit("SET_COORDINATES_SHAPEFILE", {});
          this.geo_coord = [],
          this.showLoadingShapeFile = false;
      },

      validateShapeParameters(){
        if(Object.keys(this.coordinatesShapefile).length > 0){
          for(var i = 0; i < this.coordinatesShapefile.geo_coord.length; i+=2){
            let coordenada = [];
            let test;
            test = this.coordinatesShapefile.geo_coord[i+1] +  ',' + this.coordinatesShapefile.geo_coord[i];
            this.geo_coord.push(test.toString());
          }
          console.log(this.geo_coord);
          this.showLoadingShapeFile = false;
          this.showSceneParameters = true;
        }
      }
  }
}

</script>