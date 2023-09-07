import React, { useEffect, useState } from "react";
import { getAllNotesBackend } from "../apis/noteApis";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setLoader } from "../redux/reducers/loader/loaderReducer";
import { setNotes } from "../redux/reducers/notes/notesReducer";
import { setToastError } from "../redux/reducers/toast/toastReducer";
import { NoteData } from "../types/noteFetchingDataType";
import NoteCard from "../components/NoteCard/NoteCard";
import Drawer from "../components/Drawer/Drawer";
import VideoSearch from "../components/VideoSearch/VideoSearch";
import { primaryInputStyleClassName } from "../styles/inputStyles";
import { primaryButtonStyleClassName } from "../styles/buttonStyles";
import { searchDocuments } from "../apis/elasticSearchApis";

function NotesContainer() {
    const dispatch = useAppDispatch();
    const notes = useAppSelector((state) => state.notes.notes);
    const userInfo = useAppSelector((state) => state.user.userInfo);
    const authInfo = useAppSelector((state) => state.auth);
    const [openSearchDrawer, setOpenSearchDrawer] = useState<boolean>(false);
    const [query, setQuery] = useState<string>("");
    console.log(notes);
    useEffect(() => {
        if (notes && notes.length != userInfo.notesId.length) {
            dispatch(setLoader(true));
            getAllNotesBackend(authInfo.accessToken)
                .then((notesList) => {
                    dispatch(setNotes(notesList));
                })
                .catch((e) => {
                    dispatch(setToastError("" + e));
                })
                .finally(() => {
                    dispatch(setLoader(false));
                });
        }
    }, [userInfo]);

    const handleSubmit = () => {
        if (query) {
            dispatch(setLoader(true));
            searchDocuments(authInfo.accessToken, query)
                .then((data) => {
                    const notesSearch = data.data;
                    dispatch(setNotes(notesSearch));
                })
                .catch((e) => {
                    dispatch(setToastError("" + e));
                })
                .finally(() => {
                    dispatch(setLoader(false));
                });
        } else {
            dispatch(setLoader(true));
            getAllNotesBackend(authInfo.accessToken)
                .then((notesList) => {
                    dispatch(setNotes(notesList));
                })
                .catch((e) => {
                    dispatch(setToastError("" + e));
                })
                .finally(() => {
                    dispatch(setLoader(false));
                });
        }
    };

    return (
        <div className="NotesContainer w-full h-full flex-grow flex-shrink-0 px-5 pb-5 overflow-auto flex flex-wrap">
            {openSearchDrawer && (
                <Drawer
                    hasBackDrop
                    show={openSearchDrawer}
                    setShow={setOpenSearchDrawer}
                >
                    <div className="ml-auto mr-0 w-[90%] max-w-[400px] h-full bg-slate-50 p-5">
                        <VideoSearch />
                    </div>
                </Drawer>
            )}
            <div className="flex w-full justify-between py-5 sticky top-0 bg-slate-50 z-0">
                <p>Your Notes</p>
                <button
                    className=" rounded-md h-max w-max px-4 py-1 bg-secondary"
                    onClick={() => setOpenSearchDrawer(true)}
                >
                    Add note
                </button>
            </div>

            <form
                className="VideoSearch__form w-full bg-gray-50 h-[40px] flex-shrink-0 flex mb-4"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                <input
                    type="text"
                    className={primaryInputStyleClassName}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search your notes ..."
                />
                <button
                    className={
                        primaryButtonStyleClassName.default +
                        " ml-2 bg-primary hover:bg-primary"
                    }
                    onClick={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    Submit
                </button>
            </form>

            {notes &&
                notes.map((noteData: NoteData) => (
                    <NoteCard noteData={noteData} key={noteData.id} />
                ))}
        </div>
    );
}

export default NotesContainer;
