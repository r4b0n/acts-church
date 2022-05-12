<template>
  <div class="email">{{ user.email }}</div>
  <HomeBtn />
  <LogoutBtn />
  <div class="user container-fluid">
    <h1>Your Requests</h1>
    <ul class="req" v-if="requests">
      <li v-for="request in requests" :key="request.id">
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
      <h2>You have no Requests.</h2>
    </div>
    <h1 style="color: red">Assignments</h1>
    <ul class="ass" v-if="assignments">
      <li v-for="assignment in assignments" :key="assignment.id">
        <div class="req">
          <p class="mb-2">{{ assignment.subject }}</p>
          <p>{{ assignment.request }}</p>
          <p class="name mt-2">
            Name: <span>{{ assignment.name }}</span>
          </p>
          <p class="name mt-2">
            Zipcode: <span>{{ assignment.zipcode }}</span>
          </p>
        </div>
        <div class="trash">
          <i
            class="fa-solid fa-trash-can fa-2xl"
            @click="handleReassignment(assignment, 'trash')"
          ></i>
          <i class="fa-solid fa-message-pen fa-2xl"></i>
          <i
            class="fa-solid fa-heart-circle-check fa-2xl"
            @click="handleReassignment(assignment, 'heart')"
          ></i>
        </div>
      </li>
    </ul>
    <div class="container-fluid" v-if="assignments && assignments.length === 0">
      <h2>You have no Assignments.</h2>
    </div>
  </div>
</template>

<script>
import HomeBtn from "@/components/HomeBtn";
import LogoutBtn from "@/components/LogoutBtn";
import getCollection from "@/composables/getCollection";
import getUser from "@/composables/getUser";
import { useRouter } from "vue-router";

// firebase imports
import { db } from "../firebase/config";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

export default {
  props: ["loaded"],
  components: { HomeBtn, LogoutBtn },
  setup() {
    const { user } = getUser();
    const router = useRouter();

    const { docs: requests } = getCollection("requests", [
      "userID",
      "==",
      user.value.uid,
    ]);

    const { docs: assignments } = getCollection("requests", [
      "assignee",
      "==",
      user.value.email,
    ]);

    const handleDelete = (request) => {
      const docRef = doc(db, "requests", request.id);
      deleteDoc(docRef);
    };

    const handleReassignment = (assignment, action) => {
      if (action === "trash") {
        const docRef = doc(db, "requests", assignment.id);
        updateDoc(docRef, {
          assignee: "",
        });
      } else if (action === "heart") {
        console.log("Fullfill Assignment");
        router.push({
          name: "Fulfill",
          params: { id: assignment.id },
        });
      }
    };

    // const colRef = collection(db, "requests");

    // getDocs(colRef).then((snapshot) => {
    //   let docs = [];
    //   snapshot.docs.forEach((doc) => {
    //     docs.push({ ...doc.data(), id: doc.id });
    //   });
    //   requests.value = docs;
    // });

    return { user, requests, assignments, handleDelete, handleReassignment };
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
  & .ass {
    & li {
      border: 1px dashed red;
      & .name {
        font-weight: 700;
        & span {
          color: #45c3ff;
        }
      }
    }
    & .trash {
      border-top: 1px dashed red;
      @media (min-width: 576px) {
        // RED (SM)
      }
      @media (min-width: 768px) {
        // GREEN (MD)
        border-top: unset;
        border-left: 1px dashed red;
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
          cursor: pointer;
          &:hover {
            color: #45c3ff;
          }
        }
        & i:nth-child(3) {
          color: red;
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
