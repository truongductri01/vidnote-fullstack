import React from "react";
import { Outlet } from "react-router-dom";

function AuthScreen() {
  return (
    <div className="AuthScreen">
      <Outlet />
    </div>
  );
}

export default AuthScreen;
