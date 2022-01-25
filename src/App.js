import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Loader from "./designComponents/Loader/Loader.js";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import {
//   createUserBackend,
//   getUserInfo,
//   signIn,
//   signUp,
// } from "./firebase/auth";

function App() {
  const isLoading = useSelector((state) => state.loader.isLoading);
  const idToken = useSelector((state) => state.auth.idToken);
  const navigate = useNavigate();
  useEffect(() => {
    // signIn("tri@gmail.com", "07112001").then((token) => console.log(token));
    // signUp("tri_2@gmail.com", "07112001").then((token) => console.log(token));
    // createUserBackend("tri_1@gmail.com", "07112001").then((data) =>
    //   console.log(data)
    // );
    // getUserInfo("tri@gmail.com", "07112001").then((userInfo) =>
    //   console.log(userInfo)
    // );
    if (!idToken) {
      navigate("/login");
    }
  }, [idToken, navigate]);
  return (
    <div className="App relative w-screen h-screen max-w-full flex flex-col items-center justify-between bg-gray-100">
      {isLoading && <Loader />}
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
