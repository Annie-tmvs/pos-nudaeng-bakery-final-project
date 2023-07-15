<template>
  <div>
    <sidebar-view v-if="!$route.meta.hideNavbar" />
    <div id="app">
      <div class="home-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import SidebarView from "./components/layout/SidebarView.vue";
export default {
  components: { SidebarView },
};
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+Lao:wght@400;700&display=swap");
* {
  font-family: "Noto Sans Lao", sans-serif;
}
.home-content {
  position: absolute;
  top: 0;
  height: 100%;
  width: calc(100% - 240px);
  left: 240px;
}
</style>
