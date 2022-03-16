<template>
  <Navbar />
  <div class="home container-fluid">
    <!-- <ul>
      <li v-for="request in requests" :key="request.id">
        <div class="details">
          <h3>{{ request.name }}</h3>
          <p>{{ request.email }}</p>
          <p>{{ request.request }}</p>
        </div>
      </li>
    </ul> -->
    <Logo :loaded="loaded" />
    <About />
    <CreateBookForm />
    <Events />
  </div>
  <Footer />
</template>

<script>
//import { ref } from "vue";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import About from "@/components/About";
import Events from "@/components/Events";
import CreateBookForm from "@/components/CreateBookForm";
import getCollection from "@/composables/getCollection";

// firebase imports
//import { db } from "../firebase/config";
//import { collection, getDocs } from "firebase/firestore";

export default {
  name: "Home",
  props: ["loaded"],
  components: { Navbar, Footer, Logo, About, Events, CreateBookForm },
  setup() {
    const { docs: requests } = getCollection("requests");
    // const colRef = collection(db, "requests");

    // getDocs(colRef).then((snapshot) => {
    //   let docs = [];
    //   snapshot.docs.forEach((doc) => {
    //     docs.push({ ...doc.data(), id: doc.id });
    //   });
    //   requests.value = docs;
    // });

    return { requests };
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
