<template>
  <div class="email">{{ user.email }}</div>
  <HomeBtn />
  <LogoutBtn />
  <div class="user container-fluid">
    <h1>Your Requests</h1>
    <ul v-if="requests">
      <li v-for="request in requests" :key="request.id">
        <!-- <h3>{{ request.name }}</h3> -->
        <!-- <p>{{ request.email }}</p> -->
        <div class="req">
          <p class="mb-2">{{ request.subject }}</p>
          <p>{{ request.request }}</p>
        </div>
        <div class="trash">
          <i
            class="fa-solid fa-trash-can fa-2xl"
            @click="handleDelete(request)"
          ></i>
        </div>
      </li>
    </ul>
    <div class="container-fluid" v-if="requests && requests.length === 0">
      <h2>You have no requests.</h2>
    </div>
  </div>
</template>

<script>
import HomeBtn from "@/components/HomeBtn";
import LogoutBtn from "@/components/LogoutBtn";
import getCollection from "@/composables/getCollection";
import getUser from "@/composables/getUser";

// firebase imports
import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

export default {
  props: ["loaded"],
  components: { HomeBtn, LogoutBtn },
  setup() {
    const { user } = getUser();

    const { docs: requests } = getCollection("requests", [
      "userID",
      "==",
      user.value.uid,
    ]);

    const handleDelete = (request) => {
      const docRef = doc(db, "requests", request.id);
      deleteDoc(docRef);
    };

    // const colRef = collection(db, "requests");

    // getDocs(colRef).then((snapshot) => {
    //   let docs = [];
    //   snapshot.docs.forEach((doc) => {
    //     docs.push({ ...doc.data(), id: doc.id });
    //   });
    //   requests.value = docs;
    // });

    return { user, requests, handleDelete };
  },
};
</script>

<style lang="scss" scoped>
.email {
  color: #45c3ff;
  margin: 25px 0 0 0;
}
.user {
  position: relative;
  margin-top: 20px;
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
      & .trash {
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
          cursor: pointer;
          &:hover {
            color: #45c3ff;
          }
        }
      }
    }
  }
}
.btn-home {
  top: 0;
}
.btn-logout {
  position: absolute;
  top: 7px;
  right: 12px;
}
</style>
