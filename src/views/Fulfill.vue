<template>
  <div class="container-fluid">
    <HomeBtn />
    <h1>Fulfill</h1>
  </div>
</template>

<script>
import HomeBtn from "@/components/HomeBtn";
import { useRoute } from "vue-router";

export default {
  components: { HomeBtn },
  data() {
    return {};
  },
  setup() {
    const route = useRoute();
    console.log(route.params.id);
    return {};
  },
};
</script>

<style lang="scss" scoped>
.alert {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

form {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  font-size: 1.5rem;

  & h1 {
    margin: 0 0 10px 0;
  }

  & .err {
    color: red;
    font-size: 1rem;
    & p {
      margin: 0;
    }
  }
}

.form-group {
  width: 100%;
  max-width: 400px;
  padding: 0 20px;
}
</style>
