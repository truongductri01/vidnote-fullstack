import { Link } from "react-router-dom";
import { secondaryButtonStyleClassName } from "../../designComponents/Button/buttonStyles";
import { logOut } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../redux/reducers/loader/loaderReducer";
import { useDispatch } from "react-redux";

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="NavBar w-full h-12 px-2 box-border flex flex-shrink-0 items-center bg-violet-700 text-gray-50 text-base leading-6">
      <Link to={"/"}>
        <p>Home</p>
      </Link>
      <button
        className={secondaryButtonStyleClassName.small}
        onClick={() => {
          dispatch(setLoading(true));
          logOut().then(() => {
            dispatch(setLoading(false));
            navigate("/login");
          });
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default NavBar;
