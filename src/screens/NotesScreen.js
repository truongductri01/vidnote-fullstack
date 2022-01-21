import { Outlet } from "react-router-dom";
function NotesScreen() {
  return (
    <div
      className="NotesScreen"
      style={{
        width: "100%",
        flexGrow: "1",
        padding: "12px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Outlet />
    </div>
  );
}

export default NotesScreen;
