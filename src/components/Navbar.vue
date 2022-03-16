<template>
  <nav>
    <HomeBtn />
    <ul class="navigation">
      <li class="request" @click="handleBtnClick">
        <i class="fa-solid fa-circle-plus fa-xs"></i> Request
      </li>
      <li class="events" @click="handleBtnClick">
        <i class="fa-solid fa-calendar fa-xs"></i> Events
      </li>
      <li class="testimony" @click="handleBtnClick">
        <i class="fa-solid fa-cross fa-xs"></i> Testimonies
      </li>
      <li class="requests" @click="handleBtnClick">
        <i class="fa-solid fa-list fa-xs"></i> Requests
      </li>
    </ul>
    <!-- for logged in users -->
    <!-- <div>
      <router-link class="btn-login btns" to="/"
        ><svg viewBox="0 0 40 28" width="40" height="28">
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
        <p>Logout</p></router-link
      >
    </div> -->

    <!-- for logged out users -->
    <div class="out">
      <router-link class="btn-login btns" to="/login"
        ><svg viewBox="0 0 40 28" width="40" height="28">
          <path
            class="icon"
            fill="#707070"
            d="M37.4,5.2c-1.4,0-2.6,1.2-2.6,2.6c0,0.5,0.2,1,0.4,1.5l-8.6,4.5l-5.5-8.9c0.9-0.4,1.4-1.3,1.4-2.3
	C22.6,1.2,21.4,0,20,0s-2.6,1.2-2.6,2.6c0,1,0.6,1.9,1.4,2.3l-5.5,8.9L4.8,9.3c0.3-0.4,0.4-0.9,0.4-1.5c0-1.4-1.2-2.6-2.6-2.6
	C1.2,5.2,0,6.4,0,7.8c0,1.4,1.2,2.6,2.6,2.6c0.2,0,0.5,0,0.7-0.1l6,17.7h21.5l5.9-17.7c0.2,0.1,0.5,0.1,0.7,0.1
	c1.4,0,2.6-1.2,2.6-2.6C40,6.4,38.8,5.2,37.4,5.2z M25.6,18h-4.1v8.3h-3V18h-4.1v-3h4.1v-3.8h3v3.8h4.1V18z"
          />
        </svg>
        <p>Login</p></router-link
      >
      <router-link class="btn-signup btns" to="/signup"
        ><svg viewBox="0 0 40 28" width="40" height="28">
          <polygon
            class="icon"
            fill="#707070"
            points="26.5,14.4 20,0 13.5,14.4 2,7.8 9.5,28 30.5,28 38,7.8 "
          />
        </svg>
        <p>Signup</p></router-link
      >
    </div>
  </nav>
</template>

<script>
import HomeBtn from "@/components/HomeBtn";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useRouter } from "vue-router";
export default {
  components: { HomeBtn },
  data() {
    return {
      router: useRouter(),
    };
  },
  created() {
    gsap.registerPlugin(ScrollToPlugin);
  },
  methods: {
    handleBtnClick(e) {
      //console.log("btn home clicked", e.target.className);
      gsap.to("#app", { duration: 0.5, scrollTo: 0, ease: "power4.out" });
      switch (e.target.className) {
        case "request":
          gsap.to("#app", {
            duration: 0.5,
            scrollTo: document
              .querySelector("#section-request")
              .getBoundingClientRect().top,
            ease: "power4.out",
          });
          break;
        case "events":
          gsap.to("#app", {
            duration: 0.5,
            scrollTo: document
              .querySelector("#section-events")
              .getBoundingClientRect().top,
            ease: "power4.out",
          });
          break;
        case "testimony":
          this.router.push("/testimonies");
          break;
        case "requests":
          this.router.push("/requests");
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
nav {
  position: relative;
  width: 100%;
  height: 70px;
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
  @media (min-width: 576px) {
    // RED (SM)
  }
  @media (min-width: 768px) {
    // GREEN (MD)
    margin-top: 0px;
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

  & .navigation {
    position: absolute;
    top: -50px;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (min-width: 576px) {
      // RED (SM)
    }
    @media (min-width: 768px) {
      // GREEN (MD)
      top: 0px;
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
    & li {
      cursor: pointer;
      margin: 7px;
      font-size: 1rem;
      &:hover {
        color: #45c3ff;
      }
      @media (min-width: 576px) {
        // RED (SM)
      }
      @media (min-width: 768px) {
        // GREEN (MD)
        margin: 12px;
        font-size: 1.1rem;
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
  }

  & a {
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

  & .out {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  & .btns {
    &:hover {
      & .icon {
        fill: #45c3ff;
      }
      & p {
        color: #45c3ff;
      }
    }
  }

  & .btn-home {
    margin: 0;
    position: fixed;
  }

  & .out {
    position: absolute;
    right: 0;
  }

  & .btn-login,
  & .btn-signup {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & svg {
      margin-top: 5px;
    }
  }
}
</style>
