import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Loader from "./designComponents/Loader/Loader.js";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getIdTokenLocalStorage } from "./helpers/localStorageUtils";
import { getUserInfo } from "./firebase/auth";
import { setUserInfo } from "./redux/reducers/user/userReducer";

function App() {
  const isLoading = useSelector((state) => state.loader.isLoading);
  const idToken = getIdTokenLocalStorage();
  const userInfo = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!idToken) {
      navigate("/auth/login");
    }
  }, [idToken, navigate, dispatch]);

  useEffect(() => {
    if (idToken && !userInfo) {
      getUserInfo(idToken).then((userInfo) => dispatch(setUserInfo(userInfo)));
    }
  }, [idToken, userInfo]);
  return (
    <div className="App relative w-screen h-screen max-w-full flex flex-col items-center justify-between bg-gray-100">
      {isLoading && <Loader />}
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
