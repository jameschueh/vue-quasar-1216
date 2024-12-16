import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomePage from "../views/HomePage.vue";
import ProductList from "../views/ProductList.vue";
import CreateProduct from "../views/CreateProduct.vue";
import UserInfo from "../views/UserInfo.vue";
import ApiFetchTest from "../views/ApiFetchTest.vue";
import CityInfo from "../views/CityInfo.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/productList",
    name: "product-list",
    component: ProductList,
  },
  {
    path: "/createProduct",
    name: "create-product",
    component: CreateProduct,
  },
  {
    path: "/userInfo",
    name: "user-info",
    component: UserInfo,
  },
  {
    path: "/Api-test",
    name: "api-test",
    component: ApiFetchTest,
  },
  {
    path: "/cityInfo",
    name: "city-info",
    component: CityInfo,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
