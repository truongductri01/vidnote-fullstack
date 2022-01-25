import React, { useState } from "react";
import { primaryButtonStyleClassName } from "../../designComponents/Button/buttonStyles";
import { primaryInputStyle } from "../../designComponents/Input/inputStyles";
import { signIn } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../redux/reducers/loader/loaderReducer";
import { useDispatch } from "react-redux";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="LogIn w-[400px]">
      <h1 className="text-2xl text-center font-bold">Login</h1>
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
        <button
          onClick={(e) => {
            e.preventDefault();
            dispatch(setLoading(true));
            signIn(email, password)
              .then(() => {
                dispatch(setLoading(false));
                navigate("/");
              })
              .catch(() => {
                dispatch(setLoading(false));
              });
          }}
          className={primaryButtonStyleClassName}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LogIn;
