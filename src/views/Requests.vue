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
        <div class="req">
          <p class="mb-2">{{ request.subject }}</p>
          <p>{{ request.request }}</p>
        </div>
        <div class="help">
          <i
            class="fa-solid fa-heart-crack fa-2xl"
            @click="handleAssignment(request)"
          ></i>
          <!-- <i
            class="fa-solid fa-triangle-exclamation fa-2xl"
            @click="handleFlag(request)"
          ></i> -->
          <ReportBtn @click="handleFlag(request)" />
        </div>
      </li>
    </ul>
    <div class="container-fluid" v-if="requests && requests.length === 0">
      <h2>There are no Requests.</h2>
    </div>
  </div>
  <Modal v-if="showModal">
    <div class="content container-fluid">
      <div v-if="user && !flag">
        <h2>You want to<br />Fulfill this Request.</h2>
        <div class="btns">
          <div class="btn" @click="handleConfirmation">
            Yes<i class="fa-solid fa-heart fa-md"></i>
          </div>
          <div class="btn" @click="handleModalClose">
            No<i class="fa-solid fa-xmark fa-xl"></i>
          </div>
        </div>
      </div>
      <div v-if="!user">
        <h2>
          You must <span class="link" @click="handleRedirect">signup</span>
          <br />or <span class="link" @click="handleRedirect">login</span> to
          Fulfill<br />a Request.
        </h2>
      </div>
      <div v-if="user && flag">
        <h2>Report as<br />Innapropriate.</h2>
        <div class="btns">
          <div class="btn" @click="handleFlagConfirm">
            Yes<i style="color: #00ff00" class="fa-solid fa-check fa-lg"></i>
          </div>
          <div class="btn" @click="handleModalClose">
            No<i class="fa-solid fa-xmark fa-xl"></i>
          </div>
        </div>
      </div>
      <i class="fa-solid fa-xmark fa-2xl" @click="handleModalClose"></i>
      <div class="err mt-3" v-if="showErr">
        You cannot Fulfill your own Request.
      </div>
    </div>
  </Modal>
</template>

<script>
import { ref } from "vue";
import Navbar from "@/components/Navbar";
import Modal from "@/components/Modal";
import ReportBtn from "@/components/ReportBtn";
import getCollection from "@/composables/getCollection";
import getUser from "@/composables/getUser";
import { useRouter } from "vue-router";

// firebase imports
import { db } from "../firebase/config";
import { doc, updateDoc } from "firebase/firestore";

export default {
  props: ["loaded"],
  components: { Navbar, Modal, ReportBtn },
  setup() {
    const showModal = ref(false);
    const showErr = ref(false);
    const flag = ref(false);
    const { user } = getUser();
    const router = useRouter();
    const curRequest = ref(null);

    const { docs: requests } = getCollection(
      "requests",
      ["fulfilled", "==", false],
      ["assignee", "==", ""]
      // ["zipcode", "==", 81101]
    );

    const handleAssignment = (request) => {
      curRequest.value = request;
      showModal.value = !showModal.value;
    };

    const handleConfirmation = () => {
      if (curRequest.value.email != user.value.email) {
        const docRef = doc(db, "requests", curRequest.value.id);
        updateDoc(docRef, {
          assignee: user.value.email,
        });
        router.push("/user");
      } else {
        showErr.value = true;
      }
    };

    const handleModalClose = () => {
      showModal.value = !showModal.value;
      showErr.value = false;
      flag.value = false;
    };

    const handleRedirect = (e) => {
      switch (e.target.innerHTML) {
        case "signup":
          router.push("/signup");
          break;
        case "login":
          router.push("/login");
          break;
      }
    };

    const handleFlag = (request) => {
      console.log("Flagged: ", request);
      curRequest.value = request;
      showModal.value = !showModal.value;
      flag.value = true;
    };

    const handleFlagConfirm = () => {
      console.log("Report confirmed");
      handleModalClose();
    };

    return {
      showModal,
      showErr,
      flag,
      user,
      requests,
      handleAssignment,
      handleConfirmation,
      handleModalClose,
      handleRedirect,
      handleFlag,
      handleFlagConfirm,
    };
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
  padding: 20px !important;
  & .content {
    background: white;
    position: relative;
    width: 100%;
    max-width: 750px;
    padding: 50px 50px !important;
    border: 1px dashed #707070;
    @media (min-width: 576px) {
      // RED (SM)
      width: auto;
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
    & .btns {
      display: flex;
      justify-content: space-evenly;
    }
    & h2 {
      line-height: 2.5rem;
      margin: 0;
      & .link {
        color: #45c3ff;
        cursor: pointer;
        text-transform: uppercase;
      }
    }
    & i {
      cursor: pointer;
      position: absolute;
      top: 7px;
      right: 9px;
      line-height: 1.5rem;
      &:hover {
        color: #45c3ff;
      }
    }
    & .btn {
      position: relative;
      width: auto;
      padding: 0 20px;
      margin-top: 20px;
      &:nth-child(2) {
        margin-left: 15px;
      }
      &:hover {
        color: white;
      }
      & i {
        position: relative;
        top: unset;
        right: unset;
        color: red;
        margin-left: 10px;
      }
    }
    & .err {
      color: red;
    }
  }
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
        flex-direction: row;
        justify-content: space-around;
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
          flex-direction: column;
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
          line-height: 1rem;
          margin-top: 0;
          @media (min-width: 576px) {
            // RED (SM)
          }
          @media (min-width: 768px) {
            // GREEN (MD)
            margin-top: 7px;
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
          &:hover {
            color: red;
          }
        }
      }
    }
  }
}
</style>
