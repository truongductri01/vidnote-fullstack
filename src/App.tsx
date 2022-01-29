import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Loader from "./designComponents/Loader/Loader";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getIdTokenLocalStorage } from "./helpers/localStorageUtils";
import { getUserInfo, logOut } from "./firebase/auth";
import { setUserInfo } from "./redux/reducers/user/userReducer";
import { isValidIdToken } from "./apis/authApis";
import { setLoader } from "./redux/reducers/loader/loaderReducer";

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
      isValidIdToken(idToken).then((isValid) => {
        if (isValid) {
          if (!userInfo.id) {
            getUserInfo(idToken).then((userInfo) => {
              dispatch(setUserInfo(userInfo));
              dispatch(setLoader(false));
            });
          }
          dispatch(setLoader(false));
        } else {
          logOut();
          navigate("/auth/login");
          dispatch(setLoader(false));
        }
      });
    }
  }, [idToken, navigate, dispatch, userInfo]);

  return (
    <div className="App relative w-screen h-screen max-w-full flex flex-col items-center justify-between bg-gray-100">
      {isLoading && <Loader />}
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
