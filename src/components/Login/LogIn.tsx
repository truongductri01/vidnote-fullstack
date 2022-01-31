import React, { useState } from "react";
import { signIn } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import { setLoader } from "../../redux/reducers/loader/loaderReducer";
import { useAppDispatch } from "../../redux/hooks";
import { primaryInputStyleClassName } from "../../styles/inputStyles";
import {
  primaryButtonStyleClassName,
  secondaryButtonStyleClassName,
} from "../../styles/buttonStyles";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogInSubmit = () => {
    dispatch(setLoader(true));
    signIn(email, password)
      .then((idToken) => {
        dispatch(setLoader(false));
        if (idToken) {
          navigate("/");
        }
      })
      .catch((e) => {
        dispatch(setLoader(false));
        alert(e);
      });
  };

  return (
    <div className="LogIn w-full">
      <h1 className="text-2xl text-center font-bold">Login</h1>
      <form
        className="flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogInSubmit();
        }}
      >
        <label htmlFor="">Email</label>
        <input
          type="email"
          className={primaryInputStyleClassName + " mb-5"}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          className={primaryInputStyleClassName + " mb-5"}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            handleLogInSubmit();
          }}
          className={primaryButtonStyleClassName}
        >
          Login
        </button>
      </form>
      <div className="flex flex-col">
        <button
          className={secondaryButtonStyleClassName.default + " mt-8"}
          onClick={() => navigate("/auth/signup")}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default LogIn;
