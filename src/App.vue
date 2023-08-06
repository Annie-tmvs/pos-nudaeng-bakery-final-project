<template>
  <div>
    <sidebar-view v-if="showNavBar" />
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
      // check if the current route is not the login route
      return this.$route.path !== "/login";
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
