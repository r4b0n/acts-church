<template>
  <HomeBtn />
  <LogoutBtn />
  <div class="user container-fluid">
    <h1>User</h1>
  </div>
</template>

<script>
import HomeBtn from "@/components/HomeBtn";
import LogoutBtn from "@/components/LogoutBtn";
export default {
  props: ["loaded"],
  components: { HomeBtn, LogoutBtn },
};
</script>

<style lang="scss" scoped>
.user {
  position: relative;
  margin-top: 70px;
}
.btn-home {
  top: 0;
}
.btn-logout {
  position: absolute;
  top: 7px;
  right: 12px;
}
</style>
