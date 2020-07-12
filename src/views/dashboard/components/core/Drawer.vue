<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
    :expand-on-hover="expandOnHover"
    mobile-break-point="960"
    app
    width="260"
    v-bind="$attrs"
  >
    <template v-slot:img="props">
      <v-img :gradient="`to bottom, ${barColor}`" v-bind="props" />
    </template>

    <v-divider class="mb-1" />

    <v-list dense nav>
      <v-list-item>
        <v-list-item-avatar class="align-self-center" color="white" contain>
          <v-img src max-height="30" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="display-1" v-text="profile.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider class="mb-2" />

    <v-list expand nav>
      <div />

      <template v-for="(item, i) in itemsArray">
        <base-item v-if="!item.onlyAdmin" :key="`item-${i}`" :item="item" />
      </template>

      <div />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import { mapState } from "vuex";

export default {
  name: "DashboardCoreDrawer",

  props: {
    expandOnHover: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    items: [
      {
        icon: "mdi-home",
        title: "Usuarios",
        to: "/usuarios",
        onlyAdmin: true
      },
      {
        title: "Mapa",
        icon: "mdi-map-marker",
        to: "/mapa",
        onlyAdmin: false
      },
      {
        title: "Armazenamento",
        icon: "mdi-air-filter",
        to: "/armazenamento",
        onlyAdmin: false
      }
    ]
  }),

  computed: {
    ...mapState(["barColor", "barImage"]),
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(val) {
        this.$store.commit("SET_DRAWER", val);
      }
    },
    computedItems() {
      return this.items.map(this.mapItem);
    },
    profile() {
      return {
        avatar: false,
        title: "Web GIS"
      };
    },
    isAdmin() {
      if (localStorage.getItem("isAdmin") === true) return true;
      return false;
    },
    itemsArray() {
      return this.items.map(item => {
        return {
          ...item,
          onlyAdmin: this.isAdmin
        };
      });
    }
  },

  methods: {
    mapItem(item) {
      return {
        ...item,
        children: item.children ? item.children.map(this.mapItem) : undefined,
        title: this.$t(item.title)
      };
    }
  }
};
</script>

<style lang="sass"></style>
