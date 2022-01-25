import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  removeIdTokenLocalStorage,
  setIdTokenLocalStorage,
} from "../helpers/localStorageUtils";
import app from "./config";

const auth = getAuth(app);

async function logOut() {
  await signOut(auth);
  removeIdTokenLocalStorage();
}

async function signIn(email, password) {
  let idToken = await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => userCredential.user.getIdToken())
    .catch(() => null);
  setIdTokenLocalStorage(idToken);
  return idToken;
}

async function signUp(email, pasword) {
  let idToken = await createUserWithEmailAndPassword(auth, email, pasword).then(
    (userCredential) => userCredential.user.getIdToken()
  );
  setIdTokenLocalStorage(idToken);
  return idToken;
}

async function getUserInfo(email, password) {
  let idToken = await signIn(email, password);
  let userInfo = await fetch("http://localhost:8080/v1/api/auth/user-info", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data);
  return userInfo;
}

async function createUserBackend(email, password) {
  let idToken = await signIn(email, password);
  await fetch("http://localhost:8080/v1/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({
      firstName: "Troy",
      lastName: "Truong",
      notesId: [""],
      avatarURL: "",
      searchable: false,
    }),
  });
  return idToken;
}

export { signIn, signUp, createUserBackend, getUserInfo, logOut };
