<template>
  <div class="container-fluid">
    <HomeBtn />
    <!-- SUCCESSFUL_SUBMISSION_MESSAGE -->
    <div class="container-fluid" v-if="submission">
      <div class="alert alert-success" role="alert">
        <h1>Thank you!</h1>
        <p>Back to Home in {{ count }}</p>
        <p>Enjoy all the benefits of...</p>
        <svg viewBox="0 0 40 28" width="40" height="28">
          <path
            class="icon"
            fill="#45c3ff"
            d="M37.4,5.2c-1.4,0-2.6,1.2-2.6,2.6c0,0.5,0.2,1,0.4,1.5l-8.6,4.5l-5.5-8.9c0.9-0.4,1.4-1.3,1.4-2.3
	C22.6,1.2,21.4,0,20,0s-2.6,1.2-2.6,2.6c0,1,0.6,1.9,1.4,2.3l-5.5,8.9L4.8,9.3c0.3-0.4,0.4-0.9,0.4-1.5c0-1.4-1.2-2.6-2.6-2.6
	C1.2,5.2,0,6.4,0,7.8c0,1.4,1.2,2.6,2.6,2.6c0.2,0,0.5,0,0.7-0.1l6,17.7h21.5l5.9-17.7c0.2,0.1,0.5,0.1,0.7,0.1
	c1.4,0,2.6-1.2,2.6-2.6C40,6.4,38.8,5.2,37.4,5.2z M25.6,18h-4.1v8.3h-3V18h-4.1v-3h4.1v-3.8h3v3.8h4.1V18z"
          />
        </svg>
      </div>
    </div>
    <!-- SUBMISSION_FORM -->
    <form
      class="needs-validation"
      @submit.prevent="handleSubmit"
      v-else-if="!submission"
    >
      <svg viewBox="0 0 40 28" width="40" height="28">
        <polygon
          fill="#707070"
          points="26.5,14.4 20,0 13.5,14.4 2,7.8 9.5,28 30.5,28 38,7.8 "
        />
      </svg>
      <h1>Signup</h1>
      <div class="form-group mb-3">
        <input
          class="form-control"
          :class="{ 'is-invalid': v$.email.$errors.length }"
          @blur="v$.email.$touch"
          type="email"
          name="email"
          v-model="email"
          placeholder="Email"
          required
        />
        <div class="invalid-feedback">
          Please provide a valid email address.
        </div>
      </div>
      <div class="form-group mb-3">
        <input
          class="form-control"
          :class="{ 'is-invalid': v$.password.$errors.length }"
          @blur="v$.password.$touch"
          type="password"
          name="password"
          v-model="password"
          placeholder="Password - 6 chars min."
          required
        />
        <div class="invalid-feedback">Please provide a valid password.</div>
      </div>
      <button
        type="submit"
        class="btn btn-primary mt-2"
        :disabled="v$.$invalid"
      >
        <span>Submit</span>
        <svg viewBox="0 0 50 50" width="50" height="50">
          <path
            d="M48.8,22.9L3,0.2C1.6-0.5,0,0.6,0,2.3v18.8L30.4,25L0,28.9v18.8c0,1.7,1.6,2.8,3,2.1l45.8-22.7
	C50.4,26.3,50.4,23.7,48.8,22.9z"
          />
        </svg>
      </button>
      <div class="err py-3" v-if="err">
        <p>{{ err }}</p>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";
import { useRouter } from "vue-router";
import HomeBtn from "@/components/HomeBtn";

// firebase imports
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
  components: { HomeBtn },
  data() {
    return {};
  },
  setup() {
    const email = ref("");
    const password = ref("");
    const err = ref(null);
    const submission = ref(false);
    const count = ref(3);
    const router = useRouter();

    const handleSubmit = async () => {
      let form = document.querySelector(".needs-validation");
      form.checkValidity();

      const auth = getAuth();

      createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((user) => {
          console.log(user);
          err.value = null;
          form.classList.add("was-validated");
          resetForm();
          submission.value = true;
        })
        .catch((error) => {
          err.value = error.message;
        });
    };

    const resetForm = () => {
      email.value = "";
      password.value = "";
      let interv = setInterval(function () {
        count.value--;
      }, 1000);
      let t_out = setTimeout(function () {
        clearTimeout(t_out);
        clearInterval(interv);
        router.push("/");
      }, 3000);
    };

    return {
      v$: useVuelidate(),
      email,
      password,
      err,
      submission,
      handleSubmit,
      resetForm,
      count,
    };
  },
  validations() {
    return {
      email: { required, email },
      password: { required },
    };
  },
  methods: {
    // async handleSubmit() {
    //   let form = document.querySelector(".needs-validation");
    //   form.checkValidity();
    //   // check for valid form
    //   const isFormGood2Go = await this.v$.$validate();
    //   if (!isFormGood2Go) {
    //     return;
    //   }
    //   await this.signup(this.email, this.password);
    //   console.log(this.error);
    //   if (!this.error) {
    //     this.router.push("/");
    //   } else {
    //     console.log(this.auth.error);
    //     return;
    //   }
    //   form.classList.add("was-validated");
    //   this.resetForm();
    //   this.submission = true;
    // },
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
