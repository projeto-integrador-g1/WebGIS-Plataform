<template>
  <div>
    <v-container>
      <v-card>
        <mapbox
          access-token="pk.eyJ1IjoibHVjaWFuby1zY3J1bSIsImEiOiJjazdkOGJ6YTQxY3Z4M2Vxcmd4NTBhNjBmIn0.vRDaTxND4t-C_b5XB4JLmA"
          :map-options="{
            style: 'mapbox://styles/mapbox/satellite-v9',
            center: [-96, 37.8],
            zoom: 12,
            minZoom: 12,
            maxZoom: 14
          }"
          :geolocate-control="{
            show: true,
            position: 'top-left'
          }"
          :scale-control="{
            show: true,
            position: 'top-left'
          }"
          :fullscreen-control="{
            show: true,
            position: 'top-left'
          }"
          @map-init="initialized"
        />
      </v-card>

      <SceneParameters v-model="showSceneParameters" :coordinates="geo_coord"/>
    </v-container>
  </div>
</template>

<script>
import Mapbox from "mapbox-gl-vue";
import SceneParameters from "../../components/modal/SceneParameters.vue";

export default {
  components: { Mapbox, SceneParameters},
  data() {
    return {
      geo_coord: [],
      files: [],
      showSceneParameters: false,
      Draw: null,
    }
  },
  methods: {
    initialized(map) {
      let vm = this;

      this.Draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          trash: true
        }
      });
      map.addControl(this.Draw);

      map.on("draw.create", function(e) {
        console.log("Novo Polígono");

        vm.Draw.deleteAll();
        
        for (var i = 0; i < e.features[0].geometry.coordinates[0].length; i++) {
          // A ultima coordenada e igual a primeira.
          var coordenada = [];
          coordenada.push(e.features[0].geometry.coordinates[0][i][1]); // latitude
          coordenada.push(e.features[0].geometry.coordinates[0][i][0]); // longitude
          vm.geo_coord.push(coordenada.toString());
        }

        vm.showSceneParameters = true;
        // vm.enviarCoordenadas();
      });
    },
  },

};
</script>

<style scoped>
#map {
  width: 100%;
  height: 600px;
}
</style>
