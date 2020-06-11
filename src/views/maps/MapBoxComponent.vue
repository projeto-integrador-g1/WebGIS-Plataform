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
      <v-row>
        <v-col>
          <v-card shaped>
            <v-card-title>
              <v-subheader>
                Nivel de cobertura de nuvens
              </v-subheader>
              <v-slider v-model="slider" thumb-label="always"></v-slider>
            </v-card-title>
            <v-card-text>
              <v-date-picker
                :height="100"
                :locale="locale"
                v-model="date"
                show-current
              >
              </v-date-picker>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary"> Realizar pesquisa</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Mapbox from "mapbox-gl-vue";

export default {
  components: { Mapbox },
  data() {
    return {
      coordinates: {
        user_id: "5ecf7abcd91aa079f8b551f4",
        geo_coord: []
      },
      locale: "pt-br",
      date: null,
      files: [],
      slider: null
    };
  },
  methods: {
    initialized(map) {
      let vm = this;

      const Draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          trash: true
        }
      });
      map.addControl(Draw);

      map.on("draw.create", function(e) {
        //console.log(e.features);
        console.log("Novo Polígono");

        for (var i = 0; i < e.features[0].geometry.coordinates[0].length; i++) {
          // A ultima coordenada e igual a primeira.
          var coordenada = [];
          coordenada.push(e.features[0].geometry.coordinates[0][i][1]); // latitude
          coordenada.push(e.features[0].geometry.coordinates[0][i][0]); // longitude
          vm.coordinates.geo_coord.push(coordenada.toString());
        }
        vm.enviarCoordenadas();
      });
    },

    enviarCoordenadas() {
      this.coordinates.geo_coord = this.coordinates.geo_coord.toString();
      this.$store.dispatch("sendCoordinates", this.coordinates);
    }
  }
};
</script>

<style>
#map {
  width: 100%;
  height: 400px;
}
</style>
