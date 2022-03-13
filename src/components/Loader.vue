<template>
  <div class="loader">
    <div class="rec"></div>
    <div class="rec"></div>
  </div>
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
  display: flex;
  justify-content: center;
  @keyframes rot {
    from {
      transform: rotate(-180deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
  & .rec {
    position: absolute;
    background: #f7f7f7;
    width: 5px;
    height: 40px;
    &:nth-child(2) {
      width: 25px;
      height: 5px;
      top: 10px;
    }
  }
  &::before {
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
