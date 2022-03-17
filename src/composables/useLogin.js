import { ref } from "vue";

// firebase imports
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const err = ref(null);

const login = async (email, password) => {
  err.value = null;

  const auth = getAuth();

  signInWithEmailAndPassword(auth, email, password)
    .then((user) => {
      console.log(user);
      err.value = null;
    })
    .catch((error) => {
      err.value = error.message;
      console.log(err.value);
    });
};

const useLogin = () => {
  return { err, login };
};

export default useLogin;
