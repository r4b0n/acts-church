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
      id="request_form"
      class="needs-validation"
      @submit.prevent="handleSubmit"
      v-else-if="!submission"
    >
      <h1>Add Request</h1>
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
      <!-- for logged out users -->
      <div class="form container-fluid" v-if="!user">
        <h2 class="mt-2">
          You must <span class="link" @click="handleRedirect">signup</span> or
          <br />
          <span class="link" @click="handleRedirect">login</span> to add a
          request.
        </h2>
      </div>
      <!-- for logged in users -->
      <!-- NAME -->
      <div class="form container-fluid" v-if="user">
        <div class="form-group mb-3">
          <label class="form-label" for="name">Name:</label>
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
        <div class="form-group">
          <input
            class="email_hidden"
            type="hidden"
            name="email"
            :value="user.email"
            required
          />
        </div>

        <!-- ZIPCODE -->
        <div class="form-group mb-3">
          <label class="form-label" for="zipcode">Zipcode:</label>
          <input
            class="form-control"
            :class="{ 'is-invalid': v$.zipcode.$errors.length }"
            @blur="v$.zipcode.$touch"
            type="tel"
            name="zipcode"
            v-model="zipcode"
            placeholder="#####"
            maxlength="5"
            required
          />
          <div class="invalid-feedback">Please provide a valid zipcode.</div>
        </div>

        <!-- PHONE -->
        <div class="form-group mb-3">
          <label class="form-label" for="phone">Phone Number:</label>
          <input
            class="form-control"
            :class="{ 'is-invalid': v$.phone.$errors.length }"
            @blur="v$.phone.$touch"
            type="tel"
            name="phone"
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

        <!-- SUBJECT -->
        <div class="form-group mb-3">
          <label class="form-label" for="subject">Subject:</label>
          <input
            class="form-control"
            :class="{ 'is-invalid': v$.subject.$errors.length }"
            @blur="v$.subject.$touch"
            type="text"
            name="subject"
            v-model="subject"
            required
            placeholder="100 chars max."
            maxlength="100"
          />
          <div class="invalid-feedback">Please provide a valid subject.</div>
        </div>

        <!-- REQUEST -->
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
      </div>
    </form>
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
//import { ref } from "vue";
//import { computed } from "vue";
import Info from "./Info";
import getUser from "../composables/getUser";
import { useRouter } from "vue-router";

// firebase imports
import { db } from "../firebase/config";
import { getDocs, addDoc, collection } from "firebase/firestore";

// emailjs import
import emailjs from "@emailjs/browser";

export default {
  components: { Info },
  data() {
    return {
      name: "",
      zipcode: "",
      phone: "",
      subject: "",
      request: "",
      submission: false,
      fulfilledCount: 0,
      pendingCount: 0,
      router: useRouter(),
    };
  },
  setup() {
    const { user } = getUser();

    return {
      user,
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
      zipcode: { required },
      phone: { required },
      subject: { required },
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
        email: document.querySelector(".email_hidden").value,
        zipcode: this.zipcode,
        phone: this.phone,
        subject: this.subject,
        request: this.request,
        fulfilled: false,
        assignee: "",
      });
      const templateParams = {
        from_name: "Acts of the Church",
        action: "Request Added",
        email: document.querySelector(".email_hidden").value,
        reply_to: "ryanrabon@actsofthechurch.org",
        to_name: this.name,
        message:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi autem consectetur laborum blanditiis laudantium nostrum suscipit ut harum illo, tenetur, ipsam magni officia maxime? Quibusdam cupiditate dolore praesentium assumenda suscipit, adipisci veritatis in repellat corporis a totam iste aliquam doloremque deleniti voluptate omnis? Ab, laudantium placeat eius harum, perspiciatis eveniet sint obcaecati accusantium cumque at eum nostrum sunt officia ducimus quo amet. Sequi facilis ipsam earum",
      };
      emailjs
        .send(
          "service_2al5aml",
          "template_all",
          templateParams,
          "ugyQI0jOpCHu-bCYO"
        )
        .then(
          (response) => {
            console.log("SUCCESS!", response.status, response.text);
          },
          (err) => {
            console.log("FAILED...", err);
          }
        );
      this.resetForm();
      this.submission = true;
    },
    resetForm() {
      this.name = "";
      this.zipcode = "";
      this.phone = "";
      this.subject = "";
      this.request = "";
    },
    handleRedirect(e) {
      switch (e.target.innerHTML) {
        case "signup":
          this.router.push("/signup");
          break;
        case "login":
          this.router.push("/login");
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & .link {
    color: #45c3ff;
    cursor: pointer;
    text-transform: uppercase;
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
</style>
