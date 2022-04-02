<template>
  <div id="section-events" class="events container-fluid py-4">
    <div class="pattern"></div>
    <div class="content container-fluid">
      <h1>Church Events</h1>
      <div class="event p-3">
        <img src="@/assets/img-event.png" class="venue-logo" />
        <div class="info">
          <h2>
            <i
              class="fa-solid fa-calendar-days fa-xs"
              style="color: #352611"
            ></i>
            May 1st 2022
          </h2>
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
      <div class="rsvp my-3">
        <button class="btn btn-primary">
          <svg viewBox="0 0 100 100" width="100" height="100">
            <path
              fill="#FFFFFF"
              d="M9.3,90.4h81.4V32.5H9.3V90.4z M40.2,44.4c4.3,0,7.6,3.1,9.8,6.1c2.2-2.9,5.5-6.1,9.8-6.1
	c6,0,10.9,5.1,10.9,11.3c0,1.3-0.2,2.2-0.6,3.8C67.8,66.6,50,80.8,50,80.8S32.2,66.6,29.9,59.5c-0.4-1.6-0.6-2.4-0.6-3.8
	C29.3,49.5,34.2,44.4,40.2,44.4z M0,100h100V22.8H0V100z M6.2,29.2h87.7v64.4H6.2V29.2z M0,0v17.4h100V0H0z M9.6,14
	c-2.8,0-5.1-2.4-5.1-5.3s2.3-5.3,5.1-5.3s5.1,2.4,5.1,5.3C14.6,11.6,12.4,14,9.6,14z M90.4,14c-2.8,0-5.1-2.4-5.1-5.3
	s2.3-5.3,5.1-5.3c2.8,0,5.1,2.4,5.1,5.3S93.2,14,90.4,14z"
            />
          </svg>
          <span>RSVP</span>
        </button>
        <div class="attendees">
          <p>Attendees: <span>1</span></p>
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
  background: #8a6c43;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & .pattern {
    background: transparent url("../assets/img-pattern-events.png") 0 0 repeat;
    background-position: center;
    background-size: 200px 200px;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0.85;
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
      justify-content: center;
      align-items: center;
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
    & .rsvp {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
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
      & .attendees {
        height: 55px;
        margin: 0;
        padding: 18px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 1px dashed black;
        font-size: 1.7rem;
        font-weight: 500;
        margin: 40px 0 0 0;
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
        & p {
          color: #352611;
          margin: 0;
          padding: 0;
          text-transform: uppercase;
          & span {
            color: white;
          }
        }
      }
    }
  }
  & h1 {
    padding: 0 40px;
    & span {
      color: black;
    }
  }
  .btn {
    background: #574226;
    position: relative;

    & span {
      margin-left: 50px;
    }

    & svg {
      position: absolute;
      top: 0;
      left: 0;
      width: 55px;
      height: 55px;
      margin: 0;
      & path {
        fill: white;
      }
    }

    &:hover {
      background: #352611;
      & svg {
        animation: none;
      }
    }
  }
}
</style>
