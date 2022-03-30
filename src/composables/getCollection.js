import { ref, watchEffect } from "vue";

// firebase imports
import { db } from "../firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const getCollection = (c, q1, q2) => {
  const docs = ref(null);

  // collection reference
  let colRef = collection(db, c);

  if (q1) {
    if (q1 && q2) {
      colRef = query(colRef, where(...q1), where(...q2));
    } else {
      colRef = query(colRef, where(...q1));
    }
  }

  const unsub = onSnapshot(colRef, (snapshot) => {
    let results = [];

    // needs to be snapshot.docs no relation to const docs ref above
    snapshot.docs.forEach((doc) => {
      results.push({ ...doc.data(), id: doc.id });
    });

    // update values
    docs.value = results;
  });

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { docs };
};

export default getCollection;
