import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Loader from "./designComponents/Loader/Loader";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getIdTokenLocalStorage } from "./helpers/localStorageUtils";
import { setUserInfo } from "./redux/reducers/user/userReducer";
import { getUserInfoBackend, isValidIdToken } from "./apis/authApis";
import { setLoader } from "./redux/reducers/loader/loaderReducer";
import Toast from "./designComponents/Toast/Toast";
import { logOutAndClearData } from "./helpers/logout";

function App() {
  const isLoading = useAppSelector((state) => state.loader.isLoading);
  const idToken = getIdTokenLocalStorage();
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!idToken) {
      navigate("/auth/login");
    } else {
      dispatch(setLoader(true));
      isValidIdToken(idToken)
        .then((isValid) => {
          if (isValid) {
            if (!userInfo.id) {
              getUserInfoBackend().then((userInfo) => {
                dispatch(setUserInfo(userInfo));
                dispatch(setLoader(false));
              });
            }
            dispatch(setLoader(false));
          } else {
            logOutAndClearData(dispatch)
              .then(() => {
                navigate("/auth/login");
                dispatch(setLoader(false));
              })
              .catch((e) => {
                alert("Error while logging out" + e);
                dispatch(setLoader(false));
              });
          }
        })
        .catch((e) => {
          dispatch(setLoader(false));
          alert(e);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idToken]);

  return (
    <div className="App relative w-screen h-screen max-w-full flex flex-col items-center justify-between">
      {isLoading && <Loader />}
      {/* <Toast /> */}
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
