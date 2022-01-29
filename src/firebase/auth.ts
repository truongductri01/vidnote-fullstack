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
// const baseURL = "https://vidnote-api.herokuapp.com";
const baseURL = "http://localhost:8080";

async function logOut() {
  await signOut(auth);
  removeIdTokenLocalStorage();
}

async function signIn(email: string, password: string) {
  let idToken = await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => userCredential.user.getIdToken())
    .catch(() => null);
  idToken && setIdTokenLocalStorage(idToken);
  return idToken;
}

async function signUp(email: string, pasword: string) {
  let idToken = await createUserWithEmailAndPassword(auth, email, pasword).then(
    (userCredential) => userCredential.user.getIdToken()
  );
  setIdTokenLocalStorage(idToken);
  let user = createUserBackend(idToken);
  return user;
}

async function getUserInfo(idToken: string) {
  let userInfo = await fetch(baseURL + "/v1/api/auth/user-info", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data);
  return userInfo;
}

async function createUserBackend(idToken: string) {
  let user = await fetch(baseURL + "/v1/api/auth/signup", {
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
  })
    .then((res) => res.json())
    .then((data) => data);
  return user;
}

export { signIn, signUp, createUserBackend, getUserInfo, logOut };
