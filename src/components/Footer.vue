<template>
  <div class="footer container-fluid py-4">
    <img
      src="https://firebasestorage.googleapis.com/v0/b/acts-church-42bf9.appspot.com/o/logo_copy_footer.png?alt=media&token=9d18e7e4-cf82-4e0d-b456-6d99d6e9271c"
    />
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
  & img {
    width: 150px;
  }
}
</style>
