const idTokenKey = "idToken";
function setIdTokenLocalStorage(idToken) {
  localStorage.setItem(idTokenKey, idToken);
}
function getIdTokenLocalStorage() {
  return localStorage.getItem(idTokenKey);
}
function removeIdTokenLocalStorage() {
  localStorage.removeItem(idTokenKey);
}

export {
  setIdTokenLocalStorage,
  getIdTokenLocalStorage,
  removeIdTokenLocalStorage,
};
