<template>
  <div class="ingredient-content">
    <div class="header-content">
      <div>
        <h2>ໜ້າຈັດການວັດຖຸດິບ</h2>
        <small>Ingredients</small>
      </div>
    </div>
    <hr class="my-3" />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@/scss/colors";
* {
  padding: 0;
  margin: 0;
  text-decoration: none;
  list-style: none;
}
.ingredient-content {
  padding: 2rem 1.5rem;
  height: 100vh;
  overflow: auto;
  width: 100%;
  background-color: $gray;
  .header-content {
    display: flex;
    gap: 5rem;
    align-items: end;
  }
  h2 {
    font-weight: bold;
  }
}
</style>
