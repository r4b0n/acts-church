<template>
  <router-link class="btn-home btns" to="/" @click="handleBtnClick">
    <svg viewBox="0 0 70 70" width="70" height="70">
      <path
        class="icon"
        fill="#707070"
        d="M35,13.1L10,36.7h8.9v20.2h32.3V36.7H60L35,13.1z M44.4,37.5H37v13.9H33V37.5h-7.4v-3.9H33v-7H37v7h7.4V37.5z"
      />
    </svg>
  </router-link>
</template>

<script>
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
export default {
  created() {
    gsap.registerPlugin(ScrollToPlugin);
  },
  methods: {
    handleBtnClick() {
      gsap.to("#app", { duration: 0.5, scrollTo: 0, ease: "power4.out" });
    },
  },
};
</script>

<style lang="scss" scoped>
a {
  color: #707070;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 500;
  margin: 0 10px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  & p {
    margin: 0;
  }
}

.btns {
  & .icon {
    fill: #45c3ff;
    @media (min-width: 576px) {
      // RED (SM)
      fill: #707070;
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
  &:hover {
    & .icon {
      fill: #45c3ff;
    }
    & p {
      color: #45c3ff;
    }
  }
}

.btn-home {
  margin: 0;
  position: fixed;
  left: 0;
  z-index: 10;
}
</style>
