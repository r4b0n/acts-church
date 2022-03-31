<template>
  <div class="modal container-fluid">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.modal {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 576px) {
    // RED (SM)
  }
  @media (min-width: 768px) {
    // GREEN (MD)
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
