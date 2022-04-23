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
    <div class="filter container-fluid mb-4">
      <h2 style="line-height: 1rem; margin: 2px 5px 0 0">
        <i class="fa-solid fa-filter fa-xs"></i>
      </h2>
      <h2 style="line-height: 1rem; margin: 2px 10px 0 0">Filter</h2>
      <input
        class="form-control"
        type="tel"
        placeholder="Zipcode"
        maxlength="5"
        v-model="zipcode"
        @keyup.prevent="handleFilter"
      />
    </div>
    <ul v-if="requests">
      <li v-for="request in requests" :key="request.id">
        <div class="req">
          <p class="mb-2">{{ request.subject }}</p>
          <p>{{ request.request }}</p>
          <p style="font-weight: 700" class="mt-2">
            Zipcode: <span style="color: #45c3ff">{{ request.zipcode }}</span>
          </p>
        </div>
        <div class="help">
          <i
            class="fa-solid fa-heart-crack fa-2xl"
            @click="handleAssignment(request)"
          ></i>
          <ReportBtn @click="handleFlag(request)" />
        </div>
      </li>
    </ul>
    <div class="btns" v-if="requests && requests.length > 0">
      <button class="btn prev" @click="handlePaginate" :disabled="page === 0">
        <i class="fa-solid fa-arrow-left"></i> prev.
      </button>
      <button class="btn next" @click="handlePaginate">
        next <i class="fa-solid fa-arrow-right"></i>
      </button>
    </div>
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
          {{ action }}<br />a Request.
        </h2>
      </div>
      <div v-if="user && flag">
        <h2>Report as<br />Offensive.</h2>
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
//import getCollection from "@/composables/getCollection";
//import getCollectionLength from "@/composables/getCollectionLength";
import getUser from "@/composables/getUser";
import { useRouter } from "vue-router";

// firebase imports
import { db } from "../firebase/config";
import {
  collection,
  onSnapshot,
  query,
  where,
  limit,
  doc,
  updateDoc,
  orderBy,
  startAfter,
  startAt,
} from "firebase/firestore";

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
    const zipcode = ref(null);
    const requests = ref(null);
    const action = ref("");
    const page = ref(0);
    let prevDocs = [];
    let nextDoc = null;

    const handleAssignment = (request) => {
      curRequest.value = request;
      showModal.value = !showModal.value;
      action.value = "Fulfill";
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
      action.value = "";
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
      curRequest.value = request;
      showModal.value = !showModal.value;
      flag.value = true;
      action.value = "Report";
    };

    const handleFlagConfirm = () => {
      console.log("Report confirmed");
      handleModalClose();
    };

    const handleRequests = (zip, dir) => {
      // collection reference
      let colRef = collection(db, "requests");
      if (dir) {
        //console.log("Prev Doc: ", prevDocs);
        //console.log("Next Doc: ", nextDoc);
        switch (dir) {
          case "next":
            console.log("next");
            colRef = query(
              colRef,
              where("fulfilled", "==", false),
              where("assignee", "==", ""),
              orderBy("created", "desc"),
              startAfter(nextDoc),
              limit(3)
            );
            break;
          case "prev":
            console.log("prev");
            colRef = query(
              colRef,
              where("fulfilled", "==", false),
              where("assignee", "==", ""),
              orderBy("created", "desc"),
              startAt(prevDocs[page.value]),
              limit(3)
            );
            break;
        }
      }
      if (zip) {
        let zipArray = zip.split("");
        switch (zip.length) {
          case 1:
            colRef = query(
              colRef,
              where("fulfilled", "==", false),
              where("assignee", "==", ""),
              where("zip1", "==", zipArray[0])
            );
            break;
          case 2:
            colRef = query(
              colRef,
              where("fulfilled", "==", false),
              where("assignee", "==", ""),
              where("zip1", "==", zipArray[0]),
              where("zip2", "==", zipArray[1])
            );
            break;
          case 3:
            colRef = query(
              colRef,
              where("fulfilled", "==", false),
              where("assignee", "==", ""),
              where("zip1", "==", zipArray[0]),
              where("zip2", "==", zipArray[1]),
              where("zip3", "==", zipArray[2])
            );
            break;
          case 4:
            colRef = query(
              colRef,
              where("fulfilled", "==", false),
              where("assignee", "==", ""),
              where("zip1", "==", zipArray[0]),
              where("zip2", "==", zipArray[1]),
              where("zip3", "==", zipArray[2]),
              where("zip4", "==", zipArray[3])
            );
            break;
          case 5:
            colRef = query(
              colRef,
              where("fulfilled", "==", false),
              where("assignee", "==", ""),
              where("zip1", "==", zipArray[0]),
              where("zip2", "==", zipArray[1]),
              where("zip3", "==", zipArray[2]),
              where("zip4", "==", zipArray[3]),
              where("zip5", "==", zipArray[4])
            );
            break;
        }
        // let { docs } = getCollection(
        //   "requests",
        //   ["fulfilled", "==", false],
        //   ["assignee", "==", ""],
        //   ["zipcode", "==", parseInt(zip)]
        // );
      } else if (!zip && !dir) {
        // let { docs } = getCollection(
        //   "requests",
        //   ["fulfilled", "==", false],
        //   ["assignee", "==", ""]
        // );
        colRef = query(
          colRef,
          where("fulfilled", "==", false),
          where("assignee", "==", ""),
          orderBy("created", "desc"),
          limit(3)
        );
      }
      onSnapshot(colRef, (snapshot) => {
        let results = [];

        // needs to be snapshot.docs no relation to const docs ref above
        snapshot.docs.forEach((doc, index) => {
          //console.log("Doc: ", doc);
          //console.log("Index: ", index);
          if (index === 0) {
            prevDocs[page.value] = doc;
            console.log("Prev Docs: ", prevDocs);
          }
          nextDoc = doc;
          results.push({ ...doc.data(), id: doc.id });
        });

        // update values
        requests.value = results;
      });
    };

    const handleFilter = () => {
      if (zipcode.value === "") {
        handleRequests();
      } else {
        handleRequests(zipcode.value);
      }
    };

    const handlePaginate = (e) => {
      //console.log("Paginate: ", e.target.classList[1]);
      switch (e.target.classList[1]) {
        case "next":
          page.value++;
          handleRequests(null, "next");
          break;
        case "prev":
          page.value--;
          handleRequests(null, "prev");
          break;
      }
    };

    handleRequests();

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
      handleFilter,
      handlePaginate,
      zipcode,
      action,
      page,
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
.filter {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 750px;
  padding: 0 20px !important;
  @media (min-width: 576px) {
    // RED (SM)
  }
  @media (min-width: 768px) {
    // GREEN (MD)
    padding: 0 !important;
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
.modal {
  padding: 20px !important;
  & .content {
    background: #f7f7f7;
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
    width: 100%;
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
.btns {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 750px;
  padding: 0 20px !important;
  @media (min-width: 576px) {
    // RED (SM)
  }
  @media (min-width: 768px) {
    // GREEN (MD)
    padding: 0 !important;
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
  & .btn {
    width: 47%;
    margin-bottom: 20px;
    @media (min-width: 576px) {
      // RED (SM)
    }
    @media (min-width: 768px) {
      // GREEN (MD)
      width: 48.5%;
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
    &.prev {
      & i {
        margin-right: 10px;
      }
    }
    &.next {
      & i {
        margin-left: 10px;
      }
    }
    &:hover {
      color: white;
      background: #707070;
      @media (min-width: 576px) {
        // RED (SM)
        background: #45c3ff;
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
    }
  }
}
</style>
