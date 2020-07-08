<template>
    <div>
        <v-row justify="center">
        <v-dialog v-model="showLoadingShapeFile" @click:outside='closeLoadingShapefile' scrollable max-width="800px">
          <v-card v-show="coordinatesShapefile.length === 0">
            <v-card-text style="height: 600px;">
                <h1 class="font-weight-bold text-center">Carregando coordenadas do ShapeFile</h1>
            <v-divider></v-divider>
            <v-row  justify="center" style="height: 600px;">
               <div class="text-md-center ma-12" style="padding-top:200px;">
                    <v-progress-circular  
                    indeterminate
                    color="primary"
                    size="60" 
                    ></v-progress-circular>
                </div>
            </v-row>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-row>

      <SceneParameters v-model="showSceneParameters" :coordinates="coordinatesShapefile"/>
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

    hasCoordinates(){
        if(this.coordinatesShapefile){
            this.showSceneParameters = true;
        }
    }
  },

  methods: {
      closeLoadingShapefile(){
          console.log('fechou loading shapefile');
      }
  }
}

</script>