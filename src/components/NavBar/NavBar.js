import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="NavBar">
      <Link to={"/"}>
        <p>Home</p>
      </Link>
    </div>
  );
}

export default NavBar;
