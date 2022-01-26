import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setLoader } from "../../redux/reducers/loader/loaderReducer";
import { removeUserInfo } from "../../redux/reducers/user/userReducer";
import { useDispatch } from "react-redux";
import { secondaryButtonStyleClassName } from "../../styles/buttonStyles";
import { logOut } from "../../firebase/auth";

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="NavBar w-full h-12 px-2 box-border flex flex-shrink-0 items-center bg-violet-700 text-gray-50 text-base leading-6">
      <Link to={"/"}>
        <p>Home</p>
      </Link>
      <button
        className={secondaryButtonStyleClassName.small + " ml-auto"}
        onClick={() => {
          dispatch(setLoader(true));
          logOut().then(() => {
            dispatch(setLoader(false));
            dispatch(removeUserInfo());
            navigate("/auth/login");
          });
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default NavBar;
