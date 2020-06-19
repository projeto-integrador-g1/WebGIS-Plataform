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

      <v-row justify="center">
        <v-dialog v-model="showCataloImages" scrollable max-width="800px">
          <v-card height="100%">
            <h1 class="font-weight-bold text-center">Catálogo de Imagens</h1>
            <v-divider></v-divider>
            <v-row>
              <v-col v-for="(links, index) in catalogoLinks" :key="index" cols="6" sm="4">
                <v-card>
                  <v-img
                    :src="links.href"
                    :lazy-src="links.href"
                    aspect-ratio="1"
                    class="grey lighten-2"
                  ></v-img>
                  <v-card-text class="text--primary">
                    <div> <b>Satélite:</b> {{links.collection}}</div>
                    <div> <b>Cobertura de Nuvem:</b> {{links.cloud_cover}}</div>
                    <div> <b>Data:</b> {{links.datetime}}</div>
                    <div>
                      <v-checkbox justify='center' v-model="imagemCatalogo"  
                      :value="links.scene_id">
                      </v-checkbox>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn color="blue darken-1" text @click="closeCatalogoImages">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="validadeCatalogoImages">Pesquisar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
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
      showCataloImages: false,
      imagemCatalogo: [],
      catalogoLinks: {
      "1": {
        "collection": "landsat-8-l1",
        "datetime": "2015-01-02T15:11:12.155190+00:00",
        "cloud_cover": 7,
        "eo:column": "010",
        "eo:row": "022",
        "href": "https://s3-us-west-2.amazonaws.com/landsat-pds/L8/010/022/LC80100222015002LGN00/LC80100222015002LGN00_thumb_large.jpg",
        "scene_id": "LC80100222015002LGN00"
      },
      "2": {
        "collection": "landsat-8-l1",
        "datetime": "2015-02-19T15:10:59.052605+00:00",
        "cloud_cover": 0,
        "eo:column": "010",
        "eo:row": "022",
        "href": "https://s3-us-west-2.amazonaws.com/landsat-pds/L8/010/022/LC80100222015050LGN00/LC80100222015050LGN00_thumb_large.jpg",
        "scene_id": "LC80100222015050LGN00"
      },
      "3": {
        "collection": "landsat-8-l1",
        "datetime": "2015-03-07T15:10:51.827001+00:00",
        "cloud_cover": 15,
        "eo:column": "010",
        "eo:row": "022",
        "href": "https://s3-us-west-2.amazonaws.com/landsat-pds/L8/010/022/LC80100222015066LGN00/LC80100222015066LGN00_thumb_large.jpg",
        "scene_id": "LC80100222015066LGN00"
      },
      "4": {
      "cloud_cover": 0,
      "collection": "landsat-8-l1",
      "column": "010",
      "datetime": "2014-12-17T15:11:17.451083+00:00",
      "href": "https://s3-us-west-2.amazonaws.com/landsat-pds/L8/010/022/LC80100222014351LGN00/LC80100222014351LGN00_thumb_large.jpg",
      "row": "022",
      "scene_id": "LC80100222014351LGN00"
    },
    "5": {
      "cloud_cover": 6,
      "collection": "landsat-8-l1",
      "column": "010",
      "datetime": "2014-12-01T15:11:21.658082+00:00",
      "href": "https://s3-us-west-2.amazonaws.com/landsat-pds/L8/010/022/LC80100222014335LGN00/LC80100222014335LGN00_thumb_large.jpg",
      "row": "022",
      "scene_id": "LC80100222014335LGN00"
    },
    "6": {
      "cloud_cover": 7,
      "collection": "landsat-8-l1",
      "column": "010",
      "datetime": "2014-08-11T15:11:13.106201+00:00",
      "href": "https://s3-us-west-2.amazonaws.com/landsat-pds/L8/010/022/LC80100222014223LGN00/LC80100222014223LGN00_thumb_large.jpg",
      "row": "022",
      "scene_id": "LC80100222014223LGN00"
    },
  "7": {
    "cloud_cover": 9,
    "collection": "landsat-8-l1",
    "column": "010",
    "datetime": "2014-06-08T15:10:50.604282+00:00",
    "href": "https://s3-us-west-2.amazonaws.com/landsat-pds/L8/010/022/LC80100222014159LGN00/LC80100222014159LGN00_thumb_large.jpg",
    "row": "022",
    "scene_id": "LC80100222014159LGN00"
  },
  "8": {
    "cloud_cover": 1,
    "collection": "landsat-8-l1",
    "column": "010",
    "datetime": "2013-08-24T15:13:12.820512+00:00",
    "href": "https://s3-us-west-2.amazonaws.com/landsat-pds/L8/010/022/LC80100222013236LGN00/LC80100222013236LGN00_thumb_large.jpg",
    "row": "022",
    "scene_id": "LC80100222013236LGN00"
  },
  "9": {
    "cloud_cover": 9,
    "collection": "landsat-8-l1",
    "column": "010",
    "datetime": "2015-12-20T15:11:18.775128+00:00",
    "href": "https://s3-us-west-2.amazonaws.com/landsat-pds/L8/010/022/LC80100222015354LGN00/LC80100222015354LGN00_thumb_large.jpg",
    "row": "022",
    "scene_id": "LC80100222015354LGN00"
  },
  "10": {
    "cloud_cover": 6,
    "collection": "landsat-8-l1",
    "column": "010",
    "datetime": "2016-02-22T15:11:03.852525+00:00",
    "href": "https://s3-us-west-2.amazonaws.com/landsat-pds/L8/010/022/LC80100222016053LGN00/LC80100222016053LGN00_thumb_large.jpg",
    "row": "022",
    "scene_id": "LC80100222016053LGN00"
  },
  "11": {
    "cloud_cover": 14,
    "collection": "landsat-8-l1",
    "column": "010",
    "datetime": "2016-03-25T15:10:53.923294+00:00",
    "href": "https://s3-us-west-2.amazonaws.com/landsat-pds/L8/010/022/LC80100222016085LGN00/LC80100222016085LGN00_thumb_large.jpg",
    "row": "022",
    "scene_id": "LC80100222016085LGN00"
  },}
    };
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


    validadeCatalogoImages(){
      if(!this.imagemCatalogo){
        console.log('Nao Existe dado para catalogo de imagens');
        console.log('Catalo de Imagens: ' + this.imagemCatalogo);
        return 
      }

      console.log('Catalogo de imagens escolhido: ' + this.imagemCatalogo);
    },


    closeCatalogoImages(){
      this.showCataloImages = false;
      this.showDialog = true;
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
