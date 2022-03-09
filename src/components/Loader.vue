<template>
  <div class="loader"></div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50px;
  height: 50px;
  border: 5px solid #45c3ff;
  margin: -25px 0 0 -25px;
  transform-origin: center;
  overflow: hidden;
  animation: rot 500ms 1 ease-out;
  @keyframes rot {
    from {
      transform: rotate(-180deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
  &::after {
    content: "";
    position: absolute;
    background: #45c3ff;
    width: 50px;
    height: 0;
    bottom: 0;
    left: 0;
    animation: fill 500ms 1 500ms forwards linear;
    @keyframes fill {
      from {
        height: 0;
      }
      to {
        height: 100%;
      }
    }
  }
}
</style>
