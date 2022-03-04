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

async function logOut() {
  await signOut(auth);
  removeIdTokenLocalStorage();
}

async function signIn(email: string, password: string) {
  return await signInWithEmailAndPassword(auth, email, password).then(
    async (userCredential) => {
      const idToken = await userCredential.user.getIdToken();
      idToken && setIdTokenLocalStorage(idToken);
      return idToken;
    }
  );
}

async function signUp(email: string, pasword: string, userData: NewUserSignUp) {
  return await createUserWithEmailAndPassword(auth, email, pasword).then(
    async (userCredential) => {
      const idToken = await userCredential.user.getIdToken();
      setIdTokenLocalStorage(idToken);
      let user = createUserBackend(userData);
      return user;
    }
  );
}

export { signIn, signUp, logOut };
