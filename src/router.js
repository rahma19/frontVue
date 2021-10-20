import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/persons",
      name: "persons",
      component: () => import("./components/personsList")
    },
    {
      path: "/persons/:id",
      name: "tutorial-details",
      component: () => import("./components/person")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddPerson")
    }
  ]
});