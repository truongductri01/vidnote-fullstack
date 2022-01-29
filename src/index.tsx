import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchScreen from "./screens/SearchScreen";
import { Provider } from "react-redux";
import store from "./redux/store";
import NoteEditScreen from "./screens/NoteEditScreen";
import NotesScreen from "./screens/NotesScreen";
import AuthScreen from "./screens/AuthScreen";
import LogIn from "./components/Login/LogIn";
import SignUp from "./components/SignUp/SignUp";
import NotesContainer from "./components/NotesContainer/NotesContainer";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<AuthScreen />}>
            <Route path="login" element={<LogIn />}></Route>
            <Route path="signup" element={<SignUp />}></Route>
          </Route>
          <Route path="/" element={<App />}>
            <Route index element={<SearchScreen />}></Route>
            <Route path="notes" element={<NotesScreen />}>
              <Route index element={<NotesContainer />} />
              <Route path=":noteId" element={<NoteEditScreen />} />
            </Route>
          </Route>
          {/* <Route path="/gallery" element={<GalleryScreen />}></Route> */}
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
