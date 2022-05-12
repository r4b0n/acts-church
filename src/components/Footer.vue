<template>
  <div class="footer container-fluid py-4">
    <img
      class="mb-4"
      src="https://firebasestorage.googleapis.com/v0/b/acts-church-42bf9.appspot.com/o/logo_copy.png?alt=media&token=ff5ed027-ab6c-457a-b3bc-ba2e160f7445"
    />
    <form action="https://www.paypal.com/donate" method="post" target="_top">
      <input type="hidden" name="hosted_button_id" value="XF5K2NW53657S" />
      <input
        class="donate"
        type="image"
        src="https://pics.paypal.com/00/s/NmI3Y2Y2NzctNTY1NC00M2E4LTlmZjQtNGI5Zjc0MDRlZTVm/file.PNG"
        border="0"
        name="submit"
        title="PayPal - The safer, easier way to pay online!"
        alt="Donate with PayPal button"
      />
      <img
        alt=""
        border="0"
        src="https://www.paypal.com/en_US/i/scr/pixel.gif"
        width="1"
        height="1"
      />
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.footer {
  color: #f7f7f7;
  background: transparent url("../assets/img-pattern.png") 0 0 repeat;
  background-position: center;
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
  & form {
    & .donate {
      width: 150px;
    }
  }
}
</style>
