import React from "react";
import { Outlet } from "react-router-dom";
function NotesScreen() {
  return (
    <div className="NotesScreen p-2 w-full flex-grow box-border flex flex-col overflow-y-auto">
      <Outlet />
    </div>
  );
}

export default NotesScreen;
