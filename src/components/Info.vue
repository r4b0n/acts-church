<template>
  <div class="info container-fluid">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.info {
  background: white;
  width: 47.5%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border: 1px dashed #707070;
  @media (min-width: 576px) {
    // RED (SM)
  }
  @media (min-width: 768px) {
    // GREEN (MD)
    flex-direction: row;
  }
  @media (min-width: 992px) {
    // BLUE (LG)
  }
  @media (min-width: 1200px) {
    // YELLOW (XL)
  }
  @media (min-width: 1400px) {
    // PURPLE (XXL)
  }
}
</style>
