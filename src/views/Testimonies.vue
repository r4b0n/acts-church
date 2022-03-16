<template>
  <Navbar />
  <div class="testimonies container-fluid">
    <h1>Testimonies</h1>
    <p class="verse px-3">
      "And they overcame him by the blood of the Lamb, and by the word of their
      <span style="color: #45c3ff">testimony</span>; and they loved not their
      lives unto the death." Revelation 12:11
    </p>
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
    let testimony = document.querySelector(".testimony");
    testimony.style.color = "#45c3ff";
    testimony.style.cursor = "default";
  },
};
</script>

<style lang="scss" scoped>
.testimonies {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & .verse {
    max-width: 550px;
  }
}
</style>
