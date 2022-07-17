import React, { useState, useEffect } from "react";
import DraftEditor from "../components/DraftEditor/DraftEditor";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { EditorState, ContentState } from "draft-js";
import {
  removeNoteById,
  setNotes,
  setSelectedNote,
} from "../redux/reducers/notes/notesReducer";
import { setLoader } from "../redux/reducers/loader/loaderReducer";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { stringDelimeter } from "../constants";
import NoteVideo from "../components/NoteVideo/NoteVideo";
import {
  deleteNoteById,
  getNoteById,
  setNoteBackend,
  updateNoteStatus,
} from "../apis/noteApis";
import { NoteData } from "../types/noteFetchingDataType";
import { fetchYoutubeVideoByIdBackend } from "../apis/youtubeApis";
import {
  removeNoteIdFromUser,
  setUserInfo,
} from "../redux/reducers/user/userReducer";
import {
  setToastError,
  setToastSuccess,
} from "../redux/reducers/toast/toastReducer";
import {
  primaryButtonStyleClassName,
  secondaryButtonStyleClassName,
} from "../styles/buttonStyles";
import Modal from "../components/Modal/Modal";
import { clientBaseUrl } from "../apis/routes";

function NoteEditScreen() {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const authInfo = useAppSelector((state) => state.auth);
  const { noteId } = useParams();
  const videoId = searchParams.get("videoId");
  const selectedNote = useAppSelector((state) => state.notes.selectedNote);
  const notes = useAppSelector((state) => state.notes.notes);
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createWithContent(
      ContentState.createFromText(selectedNote.noteData.note, stringDelimeter)
    )
  );
  const [data, setData] = useState(selectedNote);
  const [shareNote, setShareNote] = useState(false);
  const [noteInNotes, setNoteInNotes] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const publicViewLink = `${clientBaseUrl}/view/${noteId}?videoId=${videoId}`;
  const navigate = useNavigate();

  useEffect(() => {
    if (notes.some((note) => note.id === noteId)) {
      setNoteInNotes(true);
    }
  }, [notes, noteId]);

  useEffect(() => {
    setData(selectedNote);
  }, [selectedNote]);

  useEffect(() => {
    if (!selectedNote.noteData.id) {
      dispatch(setLoader(true));
      getNoteById(
        selectedNote?.noteData?.id ? selectedNote?.noteData?.id : noteId,
        authInfo.accessToken
      )
        .then((res: any) => {
          dispatch(setLoader(false));
          if (res) {
            if (res.note) {
              setEditorState(() =>
                EditorState.createWithContent(
                  ContentState.createFromText(res.note, stringDelimeter)
                )
              );
            }
            dispatch(
              setSelectedNote({
                ...selectedNote,
                noteData: { ...res },
              })
            );
            setData({ ...data, noteData: { ...data.noteData, ...res } });
          }
        })
        .catch((e) => {
          dispatch(setLoader(false));
          dispatch(setToastError("Error in note edit screen " + e));
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!selectedNote.video || (selectedNote.video as any)?.id !== videoId) {
      dispatch(setLoader(true));
      fetchYoutubeVideoByIdBackend(videoId as string)
        .then((videoData) => {
          dispatch(
            setSelectedNote({
              noteData: { ...selectedNote.noteData },
              video: { ...videoData },
            })
          );
          dispatch(setLoader(false));
        })
        .catch((e) => {
          dispatch(setLoader(false));
          dispatch(setToastError("Error while fetching youtube video" + e));
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNote.noteData.id]);

  const onSaveButtonClick = () => {
    dispatch(setLoader(true));
    const newData = {
      id: selectedNote?.noteData?.id ? selectedNote.noteData.id : noteId,
      note: editorState.getCurrentContent().getPlainText(stringDelimeter),
      status: "public",
      videoId: videoId,
      authorId: userInfo.id,
      video: {
        url: selectedNote.video?.snippet?.thumbnails.medium.url,
        title: selectedNote.video?.snippet.title,
        channelTitle: selectedNote.video?.snippet.channelTitle,
      },
    };
    setNoteBackend(newData, authInfo.accessToken)
      .then((isSuccess: boolean) => {
        if (isSuccess) {
          dispatch(setSelectedNote({ ...data }));
          let hasNote = false;
          for (let note of notes) {
            if (note.id === newData.id) {
              hasNote = true;
              break;
            }
          }
          if (!hasNote) {
            dispatch(setNotes([...notes, { ...newData }]));
          } else {
            dispatch(
              setNotes(
                notes.map((note: NoteData) => {
                  if (note.id === newData.id) {
                    return { ...newData };
                  } else {
                    return { ...note };
                  }
                })
              )
            );
          }

          // update user notes id list => prevent unneccesary fetching on notes screen
          let hasIdInUserInfo = userInfo.notesId.includes(newData.id as any);
          if (!hasIdInUserInfo) {
            dispatch(
              setUserInfo({
                ...userInfo,
                notesId: [...userInfo.notesId, newData.id],
              })
            );
          }
          dispatch(setToastSuccess("Note is saved"));
        } else {
          dispatch(setToastError("Something wrong happens"));
        }
        dispatch(setLoader(false));
      })
      .catch((e) => {
        dispatch(setLoader(false));
        dispatch(setToastError("" + e));
      });
  };
  const onShareButtonClick = () => {
    setShareNote(true);
  };
  const changeNoteStatus = (newState: "public" | "private") => {
    dispatch(setLoader(true));
    updateNoteStatus(
      selectedNote.noteData.id,
      newState,
      selectedNote.noteData.authorId,
      authInfo.accessToken
    )
      .then((res) => {
        if (res.ok) {
          dispatch(
            setSelectedNote({
              video: { ...selectedNote.video },
              noteData: {
                ...selectedNote.noteData,
                status: newState,
              },
            })
          );
        }
        dispatch(setLoader(false));
      })
      .catch((e) => {
        dispatch(setLoader(false));
      });
  };

  const deleteNoteFromId = (noteId: string | undefined) => {
    dispatch(setLoader(true));
    if (noteId) {
      deleteNoteById(noteId, authInfo.accessToken)
        .then((res) => {
          dispatch(setLoader(false));
          if (res.ok) {
            dispatch(setToastSuccess("Note Deleted"));
            dispatch(removeNoteById(noteId));
            dispatch(removeNoteIdFromUser(noteId));
            navigate("/notes");
          } else {
            dispatch(setToastError("Something wrong happens, try again!"));
          }
        })
        .catch((e) => {
          dispatch(setLoader(false));
          dispatch(setToastError("" + e));
        });
    } else {
      dispatch(setLoader(false));
      dispatch(setToastError("Invalid Note"));
    }
  };

  return (
    <div className="NoteEditScreen w-full flex-grow flex flex-col items-start overflow-y-auto lg:flex-row">
      {shareNote && (
        <Modal onClose={() => setShareNote(false)}>
          {selectedNote.noteData.status === "private" && (
            <div className="w-full flex flex-col justify-center">
              <p className="mb-2">
                This Note is private, make it public to share?
              </p>
              <button
                onClick={() => changeNoteStatus("public")}
                className={primaryButtonStyleClassName.default}
              >
                Make Note Public
              </button>
            </div>
          )}
          {selectedNote.noteData.status === "public" && (
            <div className="w-full flex flex-col">
              <p>This Note is ready to be viewed</p>
              <p className="px-1 mb-2 w-full overflow-auto bg-gray-300 rounded-sm">
                {publicViewLink}
              </p>
              <button
                className={secondaryButtonStyleClassName.default + " mb-3"}
                onClick={() => {
                  navigator.clipboard.writeText(publicViewLink);
                  dispatch(setToastSuccess("Link is copied"));
                }}
              >
                Copy link to Share
              </button>
              <button
                className={primaryButtonStyleClassName.default}
                onClick={() => changeNoteStatus("private")}
              >
                Make Note Private
              </button>
            </div>
          )}
        </Modal>
      )}
      {openDeleteModal && (
        <Modal onClose={() => setOpenDeleteModal(false)}>
          <div className="h-full flex flex-col items-center justify-center">
            <h1>Are you sure to delete this Note?</h1>
            <button
              className={primaryButtonStyleClassName.default + " mt-5"}
              onClick={() => deleteNoteFromId(noteId)}
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
      {selectedNote.video && <NoteVideo video={selectedNote.video} />}
      <div className="flex-grow w-full flex flex-col overflow-y-auto lg:h-full">
        <div className="Buttons flex mb-2 justify-between sm:justify-end">
          {noteId && noteInNotes && (
            <>
              <button
                className={
                  secondaryButtonStyleClassName.small +
                  " w-[140px] text-sm sm:mr-5"
                }
                onClick={onShareButtonClick}
              >
                Share this Note
              </button>
              <button
                className={primaryButtonStyleClassName.small + " w-[100px]"}
                onClick={() => setOpenDeleteModal(true)}
              >
                Delete
              </button>
            </>
          )}

          <button
            className={primaryButtonStyleClassName.small + " w-[100px]"}
            onClick={onSaveButtonClick}
          >
            Save
          </button>
        </div>
        <DraftEditor
          editorState={editorState}
          setEditorState={setEditorState}
        />
      </div>
    </div>
  );
}

export default NoteEditScreen;
