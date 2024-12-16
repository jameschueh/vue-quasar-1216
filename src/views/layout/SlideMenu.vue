<template>
  <div>
    <q-drawer v-if="leftDrawerOpen" show-if-above bordered class="bg-grey-2">
      <q-list>
        <q-item-label header>Essential Links</q-item-label>
        <q-item
          v-for="item in menuItems"
          :key="item.name"
          clickable
          tag="router-link"
          :to="{ name: item.name }"
        >
          <q-item-section avatar>
            <q-icon :name="item.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ item.label }}</q-item-label>
            <q-item-label caption>{{ item.caption }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
  </div>
</template>

<script setup>
import { ref, toRef, defineProps } from "vue";

const props = defineProps({
  leftDrawerOpen: Boolean,
});

const leftDrawerOpen = toRef(props, "leftDrawerOpen");

const menuItems = ref([
  { name: "home", icon: "home", label: "首頁", caption: "home page" },
  {
    name: "product-list",
    icon: "list",
    label: "產品列表",
    caption: "product-list",
  },
  {
    name: "create-product",
    icon: "inventory_2",
    label: "新增產品",
    caption: "createProduct",
  },
  {
    name: "user-info",
    icon: "account_circle",
    label: "使用者資訊",
    caption: "userInfo",
  },
  {
    name: "city-info",
    icon: "address",
    label: "查詢郵遞地址",
    caption: "select city code",
  },
  { name: "api-test", icon: "api", label: "Api", caption: "API TEST" },
]);
</script>
