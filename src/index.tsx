import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchScreen from "./screens/SearchScreen";
import { Provider } from "react-redux";
import NoteEditScreen from "./screens/NoteEditScreen";
import NotesScreen from "./screens/NotesScreen";
import AuthScreen from "./screens/AuthScreen";
import LogIn from "./components/Login/LogIn";
import SignUp from "./components/SignUp/SignUp";
import NotesContainer from "./components/NotesContainer/NotesContainer";
import CheckList from "./screens/CheckList";
import RedirectScreen from "./screens/RedirectScreen";
import ViewNoteScreen from "./screens/ViewNoteScreen";
import MyProfileScreen from "./screens/MyProfileScreen";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/store";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import TestScreen from "./screens/TestScreen";

const client = new ApolloClient({
    uri: "http://localhost:8080/graphql",
    cache: new InMemoryCache(),
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/auth" element={<AuthScreen />}>
                                <Route path="login" element={<LogIn />}></Route>
                                <Route
                                    path="signup"
                                    element={<SignUp />}
                                ></Route>
                            </Route>
                            <Route
                                path="/test"
                                element={<TestScreen />}
                            ></Route>
                            <Route
                                path="checklist"
                                element={<CheckList />}
                            ></Route>
                            <Route
                                path="/redirect"
                                element={<RedirectScreen />}
                            ></Route>
                            <Route
                                path="view/:noteId"
                                element={<ViewNoteScreen />}
                            ></Route>
                            <Route path="/" element={<App />}>
                                <Route index element={<SearchScreen />}></Route>
                                <Route
                                    path="my-profile"
                                    element={<MyProfileScreen />}
                                ></Route>
                                <Route path="notes" element={<NotesScreen />}>
                                    <Route index element={<NotesContainer />} />
                                    <Route
                                        path=":noteId"
                                        element={<NoteEditScreen />}
                                    />
                                </Route>
                            </Route>
                            {/* <Route path="/gallery" element={<GalleryScreen />}></Route> */}
                        </Routes>
                    </BrowserRouter>
                </PersistGate>
            </Provider>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
