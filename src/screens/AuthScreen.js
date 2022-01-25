import React from "react";
import { Outlet } from "react-router-dom";

function AuthScreen() {
  return (
    <div className="AuthScreen w-sreen h-screen max-w-full box-border flex items-center justify-center">
      <Outlet />
    </div>
  );
}

export default AuthScreen;
