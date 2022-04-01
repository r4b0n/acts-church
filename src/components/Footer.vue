<template>
  <div class="footer container-fluid py-4">
    <img
      src="https://firebasestorage.googleapis.com/v0/b/acts-church-42bf9.appspot.com/o/logo_copy.png?alt=media&token=ff5ed027-ab6c-457a-b3bc-ba2e160f7445"
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
