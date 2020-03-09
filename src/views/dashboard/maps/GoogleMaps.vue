<template>
  <div id="app">
    <mapbox
      access-token="pk.eyJ1IjoibHVjaWFuby1zY3J1bSIsImEiOiJjazdkOGJ6YTQxY3Z4M2Vxcmd4NTBhNjBmIn0.vRDaTxND4t-C_b5XB4JLmA"
      :map-options="{
        style: 'mapbox://styles/mapbox/satellite-v9',
        center: [-96, 37.8],
        zoom: 3,
      }"
      :geolocate-control="{
        show: true,
        position: 'top-left',
      }"
      :scale-control="{
        show: true,
        position: 'top-left',
      }"
      :fullscreen-control="{
        show: true,
        position: 'top-left',
      }"
      @map-init="initialized"
    />
  </div>
</template>

<script>
import Mapbox from "mapbox-gl-vue";

export default {
  components: { Mapbox },
  methods: {
    initialized(map) {
      const Draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          trash: true
        }
      });
      map.addControl(Draw);
    }
  }
};
</script>

<style>
#map {
  width: 100%;
  height: 500px;
}
</style>
