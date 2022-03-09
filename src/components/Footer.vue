<template>
  <div class="footer container-fluid py-4">
    <h1>Footer</h1>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.footer {
  color: #f7f7f7;
  background: transparent url("../assets/img-pattern.png") 0 0 repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & p {
    max-width: 750px;
  }
}
</style>
