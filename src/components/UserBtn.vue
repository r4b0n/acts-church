<template>
  <router-link class="btn-user btns" to="/" @click="handleBtnClick">
    <svg viewBox="0 0 70 70" width="70" height="70">
      <path
        class="icon"
        fill="#707070"
        d="M43.4,25c0.4,1.1,0.7,2.2,0.7,3.4c0,5-4.1,9.1-9.1,9.1s-9.1-4.1-9.1-9.1c0-1.2,0.2-2.4,0.7-3.4H43.4z
	 M49.6,53.8c0,0-0.2-11.4-0.7-12.6c-0.5-1.3-5.5-4-7.2-4c-1.4,0.6-3,1.9-6.7,2c-3.7-0.1-5.3-1.3-6.7-2c-1.7,0-6.6,2.8-7.2,4
	c-0.5,1.3-0.7,12.6-0.7,12.6s5.7,3.7,14.6,3.7S49.6,53.8,49.6,53.8z M24.9,18.7c0.1,0,0.3,0,0.4,0l1.6,5h16.2l1.6-5
	c0.1,0,0.3,0,0.4,0c0.8,0,1.5-0.7,1.5-1.5c0-0.8-0.7-1.5-1.5-1.5s-1.5,0.7-1.5,1.5c0,0.3,0.1,0.6,0.3,0.8l-5,2.7l-3.2-5.2
	c0.5-0.2,0.8-0.7,0.8-1.4c0-0.8-0.7-1.5-1.5-1.5c-0.8,0-1.5,0.7-1.5,1.5c0,0.6,0.3,1.1,0.8,1.4l-3.1,5.2l-5-2.7
	c0.2-0.2,0.3-0.6,0.3-0.8c0-0.8-0.7-1.5-1.5-1.5c-0.8,0-1.5,0.7-1.5,1.5C23.3,18,24,18.7,24.9,18.7z"
      />
    </svg>
  </router-link>
</template>

<script>
export default {
  created() {},
  methods: {
    handleBtnClick() {
      console.log("User Btn Clicked");
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

.btn-user {
  margin: 0;
  z-index: 10;
}
</style>
