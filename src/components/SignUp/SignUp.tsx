import React, { useState } from "react";
import { signUp } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import { setUserInfo } from "../../redux/reducers/user/userReducer";
import { useAppDispatch } from "../../redux/hooks";
import { primaryInputStyleClassName } from "../../styles/inputStyles";
import { setLoader } from "../../redux/reducers/loader/loaderReducer";
import {
  primaryButtonStyleClassName,
  secondaryButtonStyleClassName,
} from "../../styles/buttonStyles";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <div className="SignUp w-full">
      <h1 className="text-4xl text-center font-bold">SignUp</h1>
      <form className="flex flex-col">
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
        <label htmlFor="">Confirm Password</label>
        <input
          type="password"
          className={primaryInputStyleClassName + " mb-5"}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </form>

      <div className="flex flex-col">
        <button
          onClick={(e) => {
            e.preventDefault();
            if (password === confirmPassword) {
              dispatch(setLoader(true));
              signUp(email, password)
                .then((userInfo) => {
                  dispatch(setLoader(false));
                  dispatch(setUserInfo(userInfo));
                  navigate("/");
                })
                .catch(() => {
                  dispatch(setLoader(false));
                });
            }
          }}
          className={primaryButtonStyleClassName}
        >
          Register
        </button>
        <button
          onClick={() => navigate("/auth/login")}
          className={secondaryButtonStyleClassName.default + " mt-10"}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default SignUp;
