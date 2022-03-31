<template>
  <Navbar />
  <div class="requests-all container-fluid">
    <h1>Requests</h1>
    <p class="info px-3">
      Lorem ipsum dolor sit amet
      <i style="color: #45c3ff" class="fa-solid fa-heart-crack fa-sm"></i>
      consectetur adipisicing elit. Quasi autem consectetur laborum blanditiis
      laudantium nostrum suscipit ut harum illo, tenetur, ipsam magni officia
      maxime?
    </p>
    <ul v-if="requests">
      <li v-for="request in requests" :key="request.id">
        <!-- <h3>{{ request.name }}</h3> -->
        <!-- <p>{{ request.email }}</p> -->
        <div class="req">
          <p class="mb-2">{{ request.subject }}</p>
          <p>{{ request.request }}</p>
        </div>
        <div class="help">
          <i
            class="fa-solid fa-heart-crack fa-2xl"
            @click="handleAssignment(request)"
          ></i>
        </div>
      </li>
    </ul>
    <div class="container-fluid" v-if="requests && requests.length === 0">
      <h2>There are no requests.</h2>
    </div>
  </div>
  <Modal><h1>Modal</h1></Modal>
</template>

<script>
import Navbar from "@/components/Navbar";
import Modal from "@/components/Modal";
import getCollection from "@/composables/getCollection";
import getUser from "@/composables/getUser";

export default {
  props: ["loaded"],
  components: { Navbar, Modal },
  setup() {
    const { user } = getUser();

    const { docs: requests } = getCollection(
      "requests",
      ["fulfilled", "==", false],
      ["assignee", "==", ""],
      ["zipcode", "==", "81101"]
    );

    const handleAssignment = (request) => {
      console.log("Assignment action", request);
    };

    return { user, requests, handleAssignment };
  },
  mounted() {
    let request = document.querySelector(".request");
    request.style.display = "none";
    let events = document.querySelector(".events");
    events.style.display = "none";
    let requests = document.querySelector(".requests");
    requests.style.color = "#45c3ff";
    requests.style.cursor = "default";
    let testimony = document.querySelector(".testimony");
    testimony.style.color = "#707070";
  },
};
</script>

<style lang="scss" scoped>
.modal {
  display: none;
}
.requests-all {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & h2 {
    color: #45c3ff;
  }
  & .info {
    max-width: 750px;
  }
  & ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0 20px;
    & li {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      max-width: 750px;
      border: 1px dashed #707070;
      margin: 0 0 20px;
      @media (min-width: 576px) {
        // RED (SM)
      }
      @media (min-width: 768px) {
        // GREEN (MD)
        width: 750px;
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
        margin: 0;
        &:nth-child(1) {
          color: #45c3ff;
          font-size: 1.2rem;
          font-weight: 700;
          line-height: 1.2rem;
        }
      }
      & .req {
        padding: 10px 10px 60px 10px;
        @media (min-width: 576px) {
          // RED (SM)
        }
        @media (min-width: 768px) {
          // GREEN (MD)
          padding: 10px 60px 10px 10px;
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
      & .help {
        display: flex;
        justify-content: center;
        align-items: center;
        border-top: 1px dashed #707070;
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 50px;
        @media (min-width: 576px) {
          // RED (SM)
        }
        @media (min-width: 768px) {
          // GREEN (MD)
          border-top: unset;
          border-left: 1px dashed #707070;
          right: 0;
          width: 50px;
          height: 100%;
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
        & i {
          color: #45c3ff;
          cursor: pointer;
          &:hover {
            color: red;
          }
        }
      }
    }
  }
}
</style>
