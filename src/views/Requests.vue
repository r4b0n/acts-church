<template>
  <Navbar />
  <div class="requests-all container-fluid">
    <h1>Requests</h1>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  components: { Navbar },
  mounted() {
    let request = document.querySelector(".request");
    request.style.display = "none";
    let events = document.querySelector(".events");
    events.style.display = "none";
    let requests = document.querySelector(".requests");
    requests.style.color = "#45c3ff";
    requests.style.cursor = "default";
  },
};
</script>

<style lang="scss" scoped>
.requests-all {
  position: relative;
}
</style>
