import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchScreen from "./screens/SearchScreen";
import { Provider } from "react-redux";
import store from "./redux/store";
import NotesScreen from "./screens/NotesScreen";
import NoteEditScreen from "./screens/NoteEditScreen";
import GalleryScreen from "./screens/GalleryScreen";
import AuthScreen from "./screens/AuthScreen";
import LogIn from "./components/Login/LogIn";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<AuthScreen />}>
            <Route index element={<LogIn />}></Route>
          </Route>
          <Route path="/" element={<App />}>
            <Route index element={<SearchScreen />}></Route>
            <Route path="notes" element={<NotesScreen />}>
              <Route index element={<h1>NotesScreen</h1>} />
              <Route path=":noteId" element={<NoteEditScreen />} />
            </Route>
          </Route>
          <Route path="/gallery" element={<GalleryScreen />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
