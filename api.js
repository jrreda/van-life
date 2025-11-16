// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbOIB0Pe4-6g6elAHcO-INJI8c2uVcJrA",
  authDomain: "vanlife-87b3f.firebaseapp.com",
  projectId: "vanlife-87b3f",
  storageBucket: "vanlife-87b3f.firebasestorage.app",
  messagingSenderId: "111902654798",
  appId: "1:111902654798:web:9fbc1b64041e06dcce5e1f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log("db", db);
const vansCollectionRef = collection(db, "vans");

// ------------------------------- Firebase API -------------------------------
export async function getVans() {
  try {
    const snapshot = await getDocs(vansCollectionRef);

    const vans = snapshot.docs.map((doc) => {
      console.log("Processing doc:", doc.id, doc.data());
      return {
        ...doc.data(),
        id: doc.id,
      };
    });

    console.log("vans", vans);

    return vans;
  } catch (error) {
    console.error("Error fetching vans:", error);
    throw error;
  }
}

export async function getVan(id) {
  try {
    const docRef = doc(db, "vans", id);
    const snapshot = await getDoc(docRef);
    const van = {id, ...snapshot.data()};
    return van;
  } catch (error) {
    console.error("Error fetching van:", error);
    throw error;
  }
}

// A function whose only purpose is to delay execution
// for the specified # of milliseconds when used w/ `await`
// e.g. inside an async function:
// await sleep(2000)  => pauses the function for 2 seconds before moving on
function sleep(ms) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
}

// ------------------------------- MirageJS API -------------------------------
// export async function getVans(id) {
//   const url = id ? `/api/vans/${id}` : "/api/vans";
//   const res = await fetch(url);
//   if (!res.ok) {
//     throw {
//       message: "Failed to fetch vans",
//       status: res.status,
//       statusText: res.statusText,
//     };
//   }
//   const data = await res.json();
//   return data.vans;
// }

export async function getHostVans(id) {
  const url = id ? `/api/host/vans/${id}` : "/api/host/vans";
  const res = await fetch(url);
  if (!res.ok) {
    throw {
      message: "Failed to fetch vans",
      statusText: res.statusText,
      status: res.status,
    };
  }
  const data = await res.json();
  return data.vans;
}

export async function loginUser(credentials) {
  const res = await fetch("/api/login", {
    method: "post",
    body: JSON.stringify(credentials),
  });
  const data = await res.json();

  if (!res.ok || !res.status === 401 || !data.token) {
    throw {
      message: data.message,
      statusText: res.statusText,
      status: res.status,
    };
  }

  return data;
}
