<template>
  <div>
    <h1>404 - Page Not Found</h1>
    <p>The requested page could not be found.</p>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>
<style lang="scss" scoped>
div {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: calc(100% - 240px);
  justify-content: center;
  align-items: center;
}
</style>
