import { ref } from "vue";

// firebase imports
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const err = ref(null);

const signup = async (email, password) => {
  err.value = null;

  const auth = getAuth();

  createUserWithEmailAndPassword(auth, email, password)
    .then((user) => {
      console.log(user);
      err.value = null;
    })
    .catch((error) => {
      err.value = error.message;
      console.log(err.value);
    });
};

const useSignup = () => {
  return { err, signup };
};

export default useSignup;
