import React, { useState } from "react";
import { primaryButtonStyleClassName } from "../../designComponents/Button/buttonStyles";
import { primaryInputStyle } from "../../designComponents/Input/inputStyles";
import { signIn, signUp } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../redux/reducers/loader/loaderReducer";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/reducers/user/userReducer";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="SignUp w-full px-20">
      <h1 className="text-4xl text-center font-bold">SignUp</h1>
      <form className="flex flex-col">
        <label htmlFor="">Email</label>
        <input
          type="email"
          className={primaryInputStyle + " mb-5"}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          className={primaryInputStyle + " mb-5"}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="">Confirm Password</label>
        <input
          type="password"
          className={primaryInputStyle + " mb-5"}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            if (password === confirmPassword) {
              dispatch(setLoading(true));
              signUp(email, password)
                .then((userInfo) => {
                  dispatch(setLoading(false));
                  dispatch(setUserInfo(userInfo));
                  navigate("/");
                })
                .catch(() => {
                  dispatch(setLoading(false));
                });
            }
          }}
          className={primaryButtonStyleClassName}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default SignUp;
