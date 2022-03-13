<template>
  <div class="container-fluid">
    <HomeBtn />
    <!-- SUCCESSFUL_SUBMISSION_MESSAGE -->
    <div class="container-fluid" v-if="submission">
      <div class="alert alert-success" role="alert">
        Thank you! Your request has been successfully sent.
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
          placeholder="Password"
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
    </form>
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";
import HomeBtn from "@/components/HomeBtn";

export default {
  components: { HomeBtn },
  data() {
    return {
      email: "",
      password: "",
      submission: false,
    };
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  validations() {
    return {
      email: { required, email },
      password: { required },
    };
  },
  methods: {
    async handleSubmit() {
      let form = document.querySelector(".needs-validation");
      form.checkValidity();

      // check for valid form
      const isFormGood2Go = await this.v$.$validate();
      if (!isFormGood2Go) {
        return;
      }

      form.classList.add("was-validated");

      this.resetForm();
      this.submission = true;
    },
    resetForm() {
      this.email = "";
      this.password = "";
    },
  },
};
</script>

<style lang="scss" scoped>
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
}
.form-control {
  border-radius: 0;

  &:focus {
    border-color: #45c3ff;
    box-shadow: 0 0 0px 2px #45c3ff;
  }

  &.is-invalid {
    border-color: #ff0055;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23ff0055'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23ff0055' stroke='none'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right calc(0.375em + 0.1875rem) center;
    background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);

    &:focus {
      border-color: #ff0055;
      box-shadow: 0 0 0px 2px #ff0055;
    }
  }

  &::placeholder {
    color: #b7b7b7;
  }
}

.invalid-feedback {
  color: #ff0055;
}

input.is-invalid {
  color: #707070;
}

.form-group {
  width: 100%;
  max-width: 400px;
  padding: 0 20px;
  @media (min-width: 576px) {
    // RED (SM)
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
.btn {
  color: #f7f7f7;
  background: #707070;
  border-radius: 0;
  border: 0;
  width: 212px;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding-top: 8px;
  font-size: 1.7rem;
  font-weight: bold;
  text-transform: uppercase;
  overflow: hidden;

  & svg {
    width: 25px;
    margin-left: 15px;
    & path {
      fill: white;
    }
  }

  &:disabled {
    color: #f7f7f7;
    background: #707070;
  }

  &:hover {
    background: #45c3ff;

    & svg {
      animation: fly 1s linear infinite;
      @keyframes fly {
        from {
          transform: translateX(0px);
        }
        to {
          transform: translateX(77px);
        }
      }
    }
  }

  &:focus {
    color: #f7f7f7;
    background-color: #707070;
    border-color: #707070;
    box-shadow: 0 0 0 0px #707070 !important;
  }
}
.was-validated .form-select:invalid:not([multiple]):not([size]),
.was-validated .form-select:invalid:not([multiple])[size="1"],
.form-select.is-invalid:not([multiple]):not([size]),
.form-select.is-invalid:not([multiple])[size="1"] {
  padding-right: 4.125rem;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%234706c2' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e"),
    url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%234706c2'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%234706c2' stroke='none'/%3e%3c/svg%3e");
  background-position: right 0.75rem center, center right 2.25rem;
  background-size: 16px 12px, calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}
</style>
