<template>
  <div>
    <v-container>
      <v-card>
        <mapbox
          access-token="pk.eyJ1IjoibHVjaWFuby1zY3J1bSIsImEiOiJjazdkOGJ6YTQxY3Z4M2Vxcmd4NTBhNjBmIn0.vRDaTxND4t-C_b5XB4JLmA"
          :map-options="{
            style: 'mapbox://styles/mapbox/satellite-v9',
            center: [-96, 37.8],
            zoom: 3,
            minZoom: 3,
            maxZoom: 14
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
        <input type="file" ref="myFile" @change="loadTextFromFile">
      </v-card>

      <SceneParameters v-model="showSceneParameters" :coordinates="geo_coord"/>
      <LoadingShapeFile v-model="showLoadingShapeFile"/>
    </v-container>
  </div>
</template>

<script>
import Mapbox from "mapbox-gl-vue";
import SceneParameters from "../../components/modal/SceneParameters.vue";
import LoadingShapeFile from "../../components/modal/LoadingShapeFile.vue";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

export default {
  components: { Mapbox, SceneParameters, LoadingShapeFile},
  data() {
    return {
      geo_coord: [],
      showSceneParameters: false,
      showLoadingShapeFile: false,
      Draw: null,
    }
  },
  methods: {
    loadTextFromFile() {
      let vm = this;
      console.log('selected a file');
      console.log(this.$refs.myFile.files[0]);
      
      let file = this.$refs.myFile.files[0];

      if(file.name){
        const splitName = file.name.split('.');
        console.log('spliname', splitName);
        if(splitName[splitName.length - 1] === 'zip'){
          let formData = new FormData();
          formData.append('file', file);
          this.showLoadingShapeFile = true;
          this.sendShapeFileZip(formData);
          //let reader = new FileReader();
          //reader.readAsText(file, "UTF-8");
          // reader.onload =  evt => {
          //   this.text = evt.target.result;
          //   vm.file = this.text;
          //   vm.showLoadingShapeFile = true;
          //   console.log('shapefile', vm.file);
          //   //vm.sendShapeFile();

          // }
          // reader.onerror = evt => {
          //   console.error(evt);
          //   }
        } else{
          console.log('nao e arquivo shapefile');
          return;
        }
      } else{
        console.log('nao e arquivo shapefile');
        return;
      }
      //if(!file || file.type !== 'text/plain') return;
      
      // Credit: https://stackoverflow.com/a/754398/52160
    },

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

      var coordinatesGeocoder = function(query) {
        // match anything which looks like a decimal degrees coordinate pair
        var matches = query.match(/^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i);
        if (!matches) {
          return null;
        }
        var coord1 = Number(matches[1]);
        var coord2 = Number(matches[2]);
        var geocodes = [];
        
        if (coord1 < -90 || coord1 > 90) {
          // must be lng, lat
          geocodes.push(vm.coordinateFeature(coord1, coord2));
        }
        
        if (coord2 < -90 || coord2 > 90) {
          // must be lat, lng
          geocodes.push(vm.coordinateFeature(coord2, coord1));
        }
        
        if (geocodes.length === 0) {
          // else could be either lng, lat or lat, lng
          geocodes.push(vm.coordinateFeature(coord1, coord2));
          geocodes.push(vm.coordinateFeature(coord2, coord1));
        }
        
        return geocodes;
      }
      const geocoder = new MapboxGeocoder({
          accessToken: "pk.eyJ1IjoibHVjaWFuby1zY3J1bSIsImEiOiJjazdkOGJ6YTQxY3Z4M2Vxcmd4NTBhNjBmIn0.vRDaTxND4t-C_b5XB4JLmA",
          mapboxgl: Mapbox,
          countries: 'br',
          marker: false,
          localGeocoder: coordinatesGeocoder,
          placeholder: 'Procurar...'
      });

      map.addControl(geocoder, 'top-left');

      map.on("draw.create", function(e) {
        console.log("Novo Polígono");

        vm.geo_coord = [];

        vm.Draw.deleteAll();
        
        for (var i = 0; i < e.features[0].geometry.coordinates[0].length; i++) {
          // A ultima coordenada e igual a primeira.
          var coordenada = [];
          coordenada.push(e.features[0].geometry.coordinates[0][i][1]); // latitude
          coordenada.push(e.features[0].geometry.coordinates[0][i][0]); // longitude
          vm.geo_coord.push(coordenada.toString());
        }

        vm.showSceneParameters = true;
        //vm.enviarCoordenadas();
      });
    },

    coordinateFeature(lng, lat){
      return {
        center: [lng, lat],
        geometry: {
          type: 'Point',
          coordinates: [lng, lat]
        },
        place_name: 'Lat: ' + lat + ' Lng: ' + lng,
        place_type: ['coordinate'],
        properties: {},
        type: 'Feature'
      };
    },

    sendShapeFileZip(data){
      this.$store.dispatch("sendShapeFileZIP", data);
    }
  },

};
</script>

<style scoped>
#map {
  width: 100%;
  height: 600px;
}
</style>
