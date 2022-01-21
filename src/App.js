import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Loader from "./designComponents/Loader/Loader";
import { useSelector } from "react-redux";

function App() {
  const isLoading = useSelector((state) => state.loader.isLoading);
  return (
    <div className="App relative w-screen h-screen max-w-full flex flex-col items-center justify-between bg-gray-100">
      {isLoading && <Loader />}
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
