import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { createUserBackend } from "../apis/authApis";
import { NewUserSignUp } from "../types/userTypes";
import app from "./config";

const auth = getAuth(app);

async function logOut() {
  await auth.signOut();
}

async function signIn(email: string, password: string) {
  return await signInWithEmailAndPassword(auth, email, password);
}

async function signUp(email: string, pasword: string, userData: NewUserSignUp) {
  return await createUserWithEmailAndPassword(auth, email, pasword).then(
    async () => {
      const idToken = await auth.currentUser?.getIdToken();
      let user = await createUserBackend(userData, idToken || "");
      return user;
    }
  );
}

export { signIn, signUp, logOut };
