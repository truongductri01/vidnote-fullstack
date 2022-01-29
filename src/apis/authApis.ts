import { getIdTokenLocalStorage } from "../helpers/localStorageUtils";
import { NewUserSignUp } from "../types/userTypes";
import { baseURL, apiURL } from "./routes";
const authBaseRoute = "/auth";
const authRoutes = {
  verifyToken: authBaseRoute + "/verify-token",
  getUserInfo: authBaseRoute + "/user-info",
  postCreateUser: authBaseRoute + "/create-user",
};
export async function isValidIdToken(idToken: string) {
  let isValid = await fetch(baseURL + apiURL + authRoutes.verifyToken, {
    headers: {
      Authorization: "Bearer " + idToken,
    },
  })
    .then((res) => res.json())
    .then((data) => data);
  return isValid;
}

export async function getUserInfoBackend() {
  let idToken = getIdTokenLocalStorage();
  if (idToken) {
    let userInfo = await fetch(baseURL + apiURL + authRoutes.getUserInfo, {
      headers: {
        Authorization: "Bearer " + idToken,
      },
    })
      .then((res) => res.json())
      .then((data) => data);
    return userInfo;
  }
  return null;
}

export async function createUserBackend(userData: NewUserSignUp) {
  let idToken = getIdTokenLocalStorage();
  if (idToken) {
    let user = await fetch(baseURL + apiURL + authRoutes.postCreateUser, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({ ...userData, notesId: [] }),
    })
      .then((res) => res.json())
      .then((data) => data);
    return user;
  }
  return null;
}
