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
import { useHead } from "@vueuse/head";

export default {
  name: "Home",
  props: ["loaded"],
  components: { Navbar, Footer, Logo, About, Events, CreateRequest },
  setup() {
    useHead({
      title: "Acts of the Church",
      meta: [
        {
          name: "description",
          content: "At your service.",
        },
        {
          name: "keywords",
          content:
            "jesus, acts, church, bible, prayer, ministry, testimony, prophecy, end times, two witnesses, sons of thunder, revelation",
        },
        // {
        //   name: "title",
        //   property: "og:title",
        //   content: "Acts of the Church",
        // },
        // {
        //   property: "og:type",
        //   content: "website",
        // },
        // {
        //   property: "og:url",
        //   content: "https://actsofthechurch.org",
        // },
        // {
        //   name: "image",
        //   property: "og:image",
        //   content: "https://actsofthechurch.org/aotc_metaimage_facebook.jpg",
        // },
        // {
        //   name: "description",
        //   property: "og:description",
        //   content: "At your service.",
        // },
      ],
    });
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
