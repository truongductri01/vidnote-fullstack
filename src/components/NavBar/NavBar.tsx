import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setLoader } from "../../redux/reducers/loader/loaderReducer";
import { useDispatch } from "react-redux";
import { secondaryButtonStyleClassName } from "../../styles/buttonStyles";
import { logOutAndClearData } from "../../helpers/logout";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authInfo = useAppSelector((state) => state.auth);
  const linkClass = "mr-5 border-b-2 py-1 px-1";
  const [idToken, setIdToken] = useState<string>();

  useEffect(() => {
    if (authInfo.isSignIn) {
      setIdToken(authInfo.accessToken);
    }
  }, [authInfo.isSignIn, authInfo.accessToken]);
  return (
    <div className="NavBar w-full h-14 px-2 box-border flex flex-shrink-0 items-center bg-violet-700 text-gray-50 text-lg leading-6 pt-">
      <Link to={"/"} className={linkClass}>
        <p>Home</p>
      </Link>
      <Link to={"/notes"} className={linkClass}>
        <p>Notes</p>
      </Link>
      {idToken ? (
        <button
          className={secondaryButtonStyleClassName.small + " ml-auto"}
          onClick={() => {
            dispatch(setLoader(true));
            logOutAndClearData(dispatch).then(() => {
              dispatch(setLoader(false));
              navigate("/auth/login");
            });
          }}
        >
          Sign out
        </button>
      ) : (
        <button
          className={secondaryButtonStyleClassName.small + " ml-auto"}
          onClick={() => {
            navigate("/auth/login");
          }}
        >
          Sign in
        </button>
      )}
    </div>
  );
}

export default NavBar;
