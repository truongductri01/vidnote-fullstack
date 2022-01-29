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
import RadioButtons from "../../designComponents/RadioButtons/RadioButtons";
import { NewUserSignUp } from "../../types/userTypes";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [searchable, setSearchable] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState("");
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

        <label htmlFor="">First name</label>
        <input
          type="text"
          className={primaryInputStyleClassName + " mb-5"}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label htmlFor="">Last name</label>
        <input
          type="text"
          className={primaryInputStyleClassName + " mb-5"}
          onChange={(e) => setLastName(e.target.value)}
        />

        <RadioButtons
          label="Can people see your profile"
          onChange={(value: string) => setSearchable(value == "Yes")}
          values={["Yes", "No"]}
          selectedValue={searchable ? "Yes" : "No"}
        />

        <label htmlFor="">Your avatar Url</label>
        <input
          type="text"
          className={primaryInputStyleClassName + " mb-5"}
          onChange={(e) => setAvatarUrl(e.target.value)}
        />
      </form>

      <div className="flex flex-col">
        <button
          disabled={
            password === confirmPassword &&
            password &&
            firstName &&
            lastName &&
            avatarUrl
              ? false
              : true
          }
          onClick={(e) => {
            e.preventDefault();
            if (password === confirmPassword) {
              const userData: NewUserSignUp = {
                firstName: firstName,
                lastName,
                searchable,
                avatarUrl,
              };
              dispatch(setLoader(true));
              signUp(email, password, userData)
                .then((userInfo) => {
                  dispatch(setLoader(false));
                  dispatch(setUserInfo(userInfo));
                  navigate("/");
                })
                .catch((e) => {
                  dispatch(setLoader(false));
                  alert(e);
                });
            }
          }}
          className={
            primaryButtonStyleClassName +
            " disabled:cursor-default disabled:bg-gray-400"
          }
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
