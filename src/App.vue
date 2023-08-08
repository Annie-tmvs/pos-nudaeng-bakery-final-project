<template>
  <div>
    <div v-show="showNavBar">
      <sidebar-view />
    </div>
    <div id="app">
      <div class="index-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import SidebarView from "./components/layout/SidebarView.vue";
export default {
  components: { SidebarView },
  computed: {
    showNavBar() {
      // Show the sidebar only if the current route is "/", "/history", or "/order"
      return (
        this.$route.path === "/" ||
        this.$route.path === "/history" ||
        this.$route.path === "/order"
      );
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+Lao:wght@400;700&display=swap");
* {
  font-family: "Noto Sans Lao", sans-serif;
}
.index-content {
  position: absolute;
  top: 0;
  height: 100%;
  width: calc(100% - 240px);
  left: 240px;
}
</style>
