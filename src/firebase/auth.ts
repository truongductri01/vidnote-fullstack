import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createUserBackend } from "../apis/authApis";
import {
  removeIdTokenLocalStorage,
  setIdTokenLocalStorage,
} from "../helpers/localStorageUtils";
import { NewUserSignUp } from "../types/userTypes";
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

async function signUp(email: string, pasword: string, userData: NewUserSignUp) {
  let idToken = await createUserWithEmailAndPassword(auth, email, pasword).then(
    (userCredential) => userCredential.user.getIdToken()
  );
  setIdTokenLocalStorage(idToken);
  let user = createUserBackend(userData);
  return user;
}

export { signIn, signUp, logOut };
