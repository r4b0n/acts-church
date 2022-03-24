<template>
  <router-link class="btn-logout btns" to="/" @click="handleBtnClick">
    <svg viewBox="0 0 40 28" width="40" height="28">
      <path
        class="icon"
        fill="#707070"
        d="M24.4,19.9c0,2.4-2,4.4-4.4,4.4s-4.4-2-4.4-4.4s2-4.4,4.4-4.4S24.4,17.5,24.4,19.9z M40,7.8
	c0,1.4-1.2,2.6-2.6,2.6c-0.2,0-0.5,0-0.7-0.1L30.8,28H9.3l-6-17.7c-0.2,0.1-0.5,0.1-0.7,0.1C1.2,10.4,0,9.2,0,7.8
	c0-1.4,1.2-2.6,2.6-2.6c1.4,0,2.6,1.2,2.6,2.6c0,0.6-0.1,1.1-0.4,1.5l8.5,4.5l5.5-8.9c-0.8-0.4-1.4-1.3-1.4-2.3
	C17.4,1.2,18.6,0,20,0s2.6,1.2,2.5,2.6c0,1-0.5,1.9-1.4,2.3l5.5,8.9l8.6-4.5c-0.2-0.5-0.4-1-0.4-1.5c0-1.4,1.2-2.6,2.6-2.6
	C38.8,5.2,40,6.4,40,7.8z M26.4,19.9c0-3.5-2.9-6.4-6.4-6.4s-6.4,2.9-6.4,6.4s2.9,6.4,6.4,6.4S26.4,23.4,26.4,19.9z"
      />
    </svg>
    <p>Logout</p>
  </router-link>
</template>

<script>
// firebase imports
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
export default {
  created() {},
  methods: {
    handleBtnClick() {
      signOut(auth);
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
  &:hover {
    & .icon {
      fill: #45c3ff;
    }
    & p {
      color: #45c3ff;
    }
  }
}

.btn-logout {
  margin: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & svg {
    margin-top: 5px;
  }
}
</style>
