import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Loader from "../designComponents/Loader/Loader";
import Toast from "../designComponents/Toast/Toast";
import { useAppSelector } from "../redux/hooks";

function AuthScreen() {
  const isLoading = useAppSelector((state) => state.loader.isLoading);
  const toastInfo = useAppSelector((state) => state.toast.toastInfo);
  const [appHeight, setAppHeight] = useState(window.innerHeight);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setAppHeight(window.innerHeight);
    });
    window.addEventListener("orientationchange", () => {
      setAppHeight(window.innerHeight);
    });
  }, []);
  return (
    <div
      className="AuthScreen w-sreen max-w-full box-border flex items-center justify-center px-10 overflow-auto"
      style={{ height: `${appHeight}px` }}
    >
      {isLoading && <Loader />}
      {toastInfo.hasToast && (
        <Toast type={toastInfo.type} message={toastInfo.message} />
      )}
      <Outlet />
    </div>
  );
}

export default AuthScreen;
