<template>
  <div>
    <q-header elevated class="glossy">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="callback"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title> Quasar App </q-toolbar-title>

        <div>Quasar {{ $q.version }}</div>
      </q-toolbar>
    </q-header>
  </div>
</template>

<script setup>
import { ref, defineProps, toRef, defineEmits } from "vue";
// const leftDrawerOpen = ref(false)

const props = defineProps({
  leftDrawerOpen: Boolean,
});

const leftDrawerOpen = toRef(props, "leftDrawerOpen");
const emit = defineEmits(["switchMenu"]);

const callback = () => {
  console.log("====");
  emit("switchMenu");
};
</script>
