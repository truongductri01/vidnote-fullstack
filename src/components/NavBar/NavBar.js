import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="NavBar w-full h-12 px-2 box-border flex flex-shrink-0 items-center bg-violet-700 text-gray-50 text-base leading-6">
      <Link to={"/"}>
        <p>Home</p>
      </Link>
    </div>
  );
}

export default NavBar;
