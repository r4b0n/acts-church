<template>
  <Loader v-if="showLoader" />
  <div class="container-fluid fadeIn">
    <router-view :loaded="loaded" />
  </div>
</template>

<script>
import { gsap } from "gsap";
import Loader from "./components/Loader";

export default {
  components: { Loader },
  data() {
    return {
      appReady: false,
      loaded: false,
      showLoader: true,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.appReady = true;
    });
    let el = this;
    gsap.from(".fadeIn", {
      duration: 1,
      delay: 1.3,
      autoAlpha: 0,
      ease: "power4.out",
      onStart: function () {
        el.showLoader = false;
      },
      onComplete: function () {
        el.loaded = true;
      },
    });
  },
};
</script>

<style lang="scss">
.container,
.container-fluid,
.container-xxl,
.container-xl,
.container-lg,
.container-md,
.container-sm {
  padding: 0 !important;
}
#app {
  background: #f7f7f7;
  font-family: "Jost", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #707070;
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  --scrollbarBG: #000;
  --thumbBG: #707070;
  scrollbar-width: thin;
  scrollbar-color: var(--thumbBG) var(--scrollbarBG);
  &::-webkit-scrollbar {
    width: 12px;
  }
  &::-webkit-scrollbar-track {
    background: var(--scrollbarBG);
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--thumbBG);
    border-radius: 5px;
    border: 3px solid var(--scrollbarBG);
  }

  & h1 {
    text-transform: uppercase;
    font-weight: 500;
  }

  & #loader {
    width: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
}
</style>
