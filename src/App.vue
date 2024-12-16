<template>
  <q-layout view="lHh Lpr lFf">
    <cq-header
      :leftDrawerOpen="leftDrawerOpen"
      @switchMenu="switchMenu"
    ></cq-header>
    <slide-menu :leftDrawerOpen="leftDrawerOpen"></slide-menu>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import SlideMenu from "./views/layout/SlideMenu.vue";
import CqHeader from "./views/layout/CqHeader.vue";
import { ref } from "vue";
import { RouterView } from "vue-router";

const leftDrawerOpen = ref(false);

const switchMenu = () => {
  console.log("menu");
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>
