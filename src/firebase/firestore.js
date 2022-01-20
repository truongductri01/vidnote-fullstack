import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore/lite";
import app from "./config";

const db = getFirestore(app);

async function isAuthenticatedByNumber(userNumberId, database = db) {
  const authCol = collection(database, "auths");
  const docSnapshot = await getDocs(authCol);
  return docSnapshot.docs.some((doc) => doc.id === userNumberId);
}

async function setNoteByVidId(note, vidData, database = db) {
  await setDoc(doc(database, "notes", vidData.id.videoId), {
    note,
    videoId: vidData.id.videoId,
  });
  return vidData.id.videoId;
}

async function getNoteByVidId(vidId, database = db) {
  const docRef = doc(database, "notes", vidId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }
  return null;
}

export { isAuthenticatedByNumber, setNoteByVidId, getNoteByVidId };
