import React from "react";
import { Outlet } from "react-router-dom";
import Loader from "../designComponents/Loader/Loader";
import { useAppSelector } from "../redux/hooks";

function AuthScreen() {
  const isLoading = useAppSelector((state) => state.loader.isLoading);
  return (
    <div className="AuthScreen w-sreen h-screen max-w-full box-border flex items-center justify-center px-10">
      {isLoading && <Loader />}
      <Outlet />
    </div>
  );
}

export default AuthScreen;
