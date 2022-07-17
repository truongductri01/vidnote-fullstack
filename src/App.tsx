import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Loader from "./designComponents/Loader/Loader";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setUserInfo } from "./redux/reducers/user/userReducer";
import { getUserInfoBackend, isValidIdToken } from "./apis/authApis";
import { setLoader } from "./redux/reducers/loader/loaderReducer";
import Toast from "./designComponents/Toast/Toast";
import { logOutAndClearData } from "./helpers/logout";
import { setToastError } from "./redux/reducers/toast/toastReducer";
import app from "./firebase/config";
import { getAuth } from "firebase/auth";
import { clearAuth, setAuth } from "./redux/reducers/auth/authReducer";

const auth = getAuth(app);

function App() {
  const [appHeight, setAppHeight] = useState<number>(window.innerHeight);
  const [finishAuthLoading, setFinishAuthLoading] = useState<boolean>(false);
  const isLoading = useAppSelector((state) => state.loader.isLoading);
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const toastInfo = useAppSelector((state) => state.toast.toastInfo);
  const redirectInfo = useAppSelector((state) => state.redirect);
  const authInfo = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const validateIdToken = async (idToken: string) => {
    if (idToken) {
      return isValidIdToken(idToken);
    }
    return false;
  };
  const logOut = () => {
    logOutAndClearData(dispatch)
      .then(() => {
        navigate("/auth/login");
        dispatch(setLoader(false));
      })
      .catch((e) => {
        dispatch(setToastError("" + e));
        dispatch(setLoader(false));
      });
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setAppHeight(window.innerHeight);
    });
    window.addEventListener("orientationchange", () => {
      setAppHeight(window.innerHeight);
    });
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        await user.getIdToken().then((token) => {
          dispatch(
            setAuth({
              accessToken: token,
              isSignIn: true,
              uid: user.uid,
            })
          );
        });
      } else {
        dispatch(clearAuth());
      }
      setFinishAuthLoading(true);
    });
  }, []);

  useEffect(() => {
    if (finishAuthLoading) {
      dispatch(setLoader(true));
      if (authInfo.isSignIn) {
        validateIdToken(authInfo.accessToken)
          .then((isValid) => {
            if (isValid) {
              if (!userInfo.id) {
                getUserInfoBackend(authInfo.accessToken)
                  .then((userInfo) => {
                    if (redirectInfo.hasRedirect) {
                      navigate(
                        "/notes/" +
                          userInfo.id +
                          redirectInfo.property.videoId +
                          "?videoId=" +
                          redirectInfo.property.videoId
                      );
                    }
                    dispatch(setUserInfo(userInfo));
                    dispatch(setLoader(false));
                  })
                  .catch((e) => {
                    dispatch(setToastError("" + e));
                    dispatch(setLoader(false));
                  });
              }
            } else {
              logOut();
            }
          })
          .catch((e) => {
            dispatch(setLoader(false));
            dispatch(setToastError("" + e));
          });
      } else {
        logOut();
      }
      dispatch(setLoader(false));
    }
  }, [authInfo.isSignIn, authInfo.accessToken, finishAuthLoading]);

  return (
    <div
      id="vidnote-app"
      className="App relative w-screen max-w-full flex flex-col items-center justify-between box-border overflow-y-auto"
      style={{
        height: `${appHeight}px`,
      }}
    >
      {isLoading && <Loader />}
      {toastInfo.hasToast && (
        <Toast type={toastInfo.type} message={toastInfo.message} />
      )}
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
