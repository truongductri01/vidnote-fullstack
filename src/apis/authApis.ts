import { baseURL, apiURL } from "./routes";
const authBaseRoute = "/auth";
export async function isValidIdToken(idToken: string) {
  let isValid = await fetch(
    baseURL + apiURL + authBaseRoute + "/verify-token",
    {
      headers: {
        Authorization: "Bearer " + idToken,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => data);
  return isValid;
}
