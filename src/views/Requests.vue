<template>
  <Navbar />
  <div class="requests-all container-fluid">
    <h1>Requests</h1>
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
            class="fa-solid fa-handshake-angle fa-2xl"
            @click="handleAssignment(request)"
          ></i>
        </div>
      </li>
    </ul>
    <div class="container-fluid" v-if="requests.length === 0">
      <h2>There are no requests.</h2>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import getCollection from "@/composables/getCollection";
import getUser from "@/composables/getUser";

export default {
  props: ["loaded"],
  components: { Navbar },
  setup() {
    const { user } = getUser();

    const { docs: requests } = getCollection(
      "requests",
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
.requests-all {
  position: relative;
  & h2 {
    color: #45c3ff;
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
        padding: 10px 80px 10px 10px;
      }
      & .help {
        display: flex;
        justify-content: center;
        align-items: center;
        border-left: 1px dashed #707070;
        position: absolute;
        right: 0;
        width: 70px;
        height: 100%;
        & i {
          cursor: pointer;
          &:hover {
            color: #45c3ff;
          }
        }
      }
    }
  }
}
</style>
