<template>
  <Navbar />
  <div class="home container-fluid">
    <Logo :loaded="loaded" />
    <About />
    <CreateRequest />
    <Events />
  </div>
  <Footer />
</template>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import About from "@/components/About";
import Events from "@/components/Events";
import CreateRequest from "@/components/CreateRequest";

export default {
  name: "Home",
  props: ["loaded"],
  components: { Navbar, Footer, Logo, About, Events, CreateRequest },
  setup() {
    return {};
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
