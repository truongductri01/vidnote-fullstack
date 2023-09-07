import React from "react";
import { Outlet } from "react-router-dom";
function NotesScreen() {
    return (
        <div className="NotesScreen p-5 w-full flex-grow box-border flex flex-col">
            <Outlet />
        </div>
    );
}

export default NotesScreen;
