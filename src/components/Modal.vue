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
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &::before {
    content: "";
    background: #f7f7f7;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.8;
  }
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
