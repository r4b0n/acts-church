<template>
  <div id="section-request" class="container-fluid row my-4">
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
      <h1>New Request</h1>
      <div class="infos form-group my-3">
        <Info
          ><h2>Fulfilled:</h2>
          <p class="red">
            {{ fulfilledCount }}<i class="fa-solid fa-heart fa-xs"></i>
          </p>
        </Info>
        <Info
          ><h2>Pending:</h2>
          <p>{{ pendingCount }}<i class="fa-solid fa-heart-crack fa-xs"></i></p>
        </Info>
      </div>

      <!-- NAME -->
      <div class="form-group mb-3">
        <label class="form-label" for="title">Name:</label>
        <input
          class="form-control"
          :class="{ 'is-invalid': v$.name.$errors.length }"
          @blur="v$.name.$touch"
          type="text"
          name="name"
          v-model="name"
          required
          placeholder="First and Last"
        />
        <div class="invalid-feedback">Please provide your full name.</div>
      </div>

      <!-- EMAIL -->
      <div class="form-group mb-3">
        <label class="form-label" for="email">Email:</label>
        <input
          class="form-control"
          :class="{ 'is-invalid': v$.email.$errors.length }"
          @blur="v$.email.$touch"
          type="email"
          name="email"
          v-model="email"
          required
        />
        <div class="invalid-feedback">
          Please provide a valid email address.
        </div>
      </div>

      <!-- PHONE -->
      <div class="form-group mb-3">
        <label class="form-label" for="phone">Phone Number:</label>
        <input
          class="form-control"
          :class="{ 'is-invalid': v$.phone.$errors.length }"
          @blur="v$.phone.$touch"
          type="tel"
          v-model="phone"
          v-maska="'(###) ###-####'"
          placeholder="(###) ###-####"
          maxlength="14"
          required
        />
        <div class="invalid-feedback">
          Please provide a valid telephone number.
        </div>
      </div>

      <!-- EMAIL -->
      <div class="form-group mb-3">
        <label class="form-label" for="request">Request:</label>
        <textarea
          class="form-control"
          :class="{ 'is-invalid': v$.request.$errors.length }"
          @blur="v$.request.$touch"
          name="request"
          v-model="request"
          rows="7"
          maxlength="500"
          required
          placeholder="500 chars max."
        ></textarea>
        <div class="invalid-feedback">Please provide a valid request.</div>
      </div>

      <button
        type="submit"
        class="btn btn-primary mb-3"
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
//import { ref } from "vue";
//import { computed } from "vue";
import Info from "./Info";

// firebase imports
import { db } from "../firebase/config";
import { getDocs, addDoc, collection } from "firebase/firestore";

export default {
  components: { Info },
  data() {
    return {
      name: "",
      email: "",
      phone: "",
      request: "",
      submission: false,
      fulfilledCount: 0,
      pendingCount: 0,
    };
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  mounted() {
    const colRef = collection(db, "requests");
    let el = this;
    getDocs(colRef).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.data().fulfilled) {
          el.fulfilledCount++;
        } else {
          el.pendingCount++;
        }
      });
    });
  },
  validations() {
    return {
      name: { required },
      email: { required, email },
      phone: { required },
      request: { required },
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

      const colRef = collection(db, "requests");

      await addDoc(colRef, {
        name: this.name,
        email: this.email,
        phone: this.phone,
        request: this.request,
        fulfilled: false,
      });
      this.resetForm();
      this.submission = true;
    },
    resetForm() {
      this.name = "";
      this.email = "";
      this.phone = "";
      this.request = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.container,
.container-fluid,
.container-xxl,
.container-xl,
.container-lg,
.container-md,
.container-sm {
  padding: 0 !important;
  position: relative;
}

form {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;

  & h1 {
    margin: 0;
  }

  & label {
    text-transform: uppercase;
    float: left;
    font-weight: 500;
  }
}

.infos {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  & h2 {
    padding: 20px 20px 0 20px;
    margin: 0;
    text-transform: uppercase;
    @media (min-width: 576px) {
      // RED (SM)
    }
    @media (min-width: 768px) {
      // GREEN (MD)
      padding: 20px;
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
  & p {
    color: #45c3ff;
    font-size: 2rem;
    font-weight: 500;
    margin: 0;
    padding: 0 0 20px 0;
    @media (min-width: 576px) {
      // RED (SM)
    }
    @media (min-width: 768px) {
      // GREEN (MD)
      padding: 20px 20px 20px 0;
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
    &.red {
      color: red;
    }
  }
  & .fa-solid {
    margin-left: 5px;
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
  max-width: 750px;
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

.alert-success {
  background: transparent;
  color: #707070;
  border-color: transparent;
  margin: 0;
  font-size: 1.5rem;
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
