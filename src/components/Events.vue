<template>
  <div class="events container-fluid py-4">
    <div class="pattern"></div>
    <div class="content container-fluid">
      <h1>Community <span>Launch</span> Event</h1>
      <div class="event p-3">
        <img src="@/assets/img-event.png" class="venue-logo" />
        <div class="info">
          <h2>May 1st 2022</h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio
            veritatis deserunt hic suscipit ipsam obcaecati aperiam qui numquam,
            sed eos commodi ullam laborum quibusdam provident omnis ex
            necessitatibus unde? Quisquam deserunt omnis aspernatur quidem ab
            assumenda recusandae, nostrum quo, doloremque, expedita temporibus
            vero quae itaque hic eaque? Deleniti, cum perspiciatis!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.events {
  position: relative;
  color: #f7f7f7;
  background: #478dff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & .pattern {
    background: transparent url("../assets/img-pattern-events.png") 0 0 repeat;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0.15;
    mix-blend-mode: multiply;
  }
  & .content {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & .event {
      display: flex;
      flex-direction: column;
      @media (min-width: 576px) {
        // RED (SM)
      }
      @media (min-width: 768px) {
        // GREEN (MD)
        flex-direction: row;
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
      & .venue-logo {
        max-width: 300px;
      }
      & .info {
        text-align: center;
        margin: 40px 0 0 0;
        max-width: 375px;
        @media (min-width: 576px) {
          // RED (SM)
        }
        @media (min-width: 768px) {
          // GREEN (MD)
          margin: 0 0 0 40px;
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
        & h2 {
        }
        & p {
        }
      }
    }
  }
  & h1 {
    & span {
      color: black;
    }
  }
}
</style>
