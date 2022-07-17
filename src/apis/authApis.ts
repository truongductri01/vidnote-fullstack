import { config } from "../config/config";
import { NewUserSignUp } from "../types/userTypes";
const { baseURL, apiURL } = config.app;
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

export async function getUserInfoBackend(idToken: string) {
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

export async function createUserBackend(
  userData: NewUserSignUp,
  idToken: string
) {
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
