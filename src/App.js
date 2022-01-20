import { useState } from "react";
import "./App.css";
import DraftEditor from "./components/DraftEditor/DraftEditor";
import VideoSearch from "./components/VideoSearch/VideoSearch";
import { isAuthenticatedByNumber } from "./firebase/firestore";

function App() {
  const [selectedVideo, setSelectedVideo] = useState();
  // console.log("Selected Video >>>", selectedVideo);
  isAuthenticatedByNumber("5129560044").then((data) => console.log(data));
  return (
    <div className="App">
      {/* <nav>
        <h1>VidNote</h1>
        <p>Never forget your videos</p>
      </nav> */}
      {selectedVideo ? (
        <div
          style={{ height: "1000px", display: "flex", flexDirection: "column" }}
        >
          <iframe
            width="100%"
            height="315px"
            src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <DraftEditor selectedVideo={selectedVideo} />
        </div>
      ) : (
        <VideoSearch setSelectedVideo={setSelectedVideo} />
      )}{" "}
    </div>
  );
}

export default App;
