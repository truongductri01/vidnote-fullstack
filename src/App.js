import { useState } from "react";
import "./App.css";
import VideoSearch from "./components/VideoSearch/VideoSearch";

function App() {
  const [selectedVideo, setSelectedVideo] = useState();
  console.log("Selected Video >>>", selectedVideo);
  return (
    <div className="App">
      <nav>
        <h1>VidNote</h1>
        <p>Never forget your videos</p>
      </nav>
      {selectedVideo ? (
        <p>Has selected video</p>
      ) : (
        <VideoSearch setSelectedVideo={setSelectedVideo} />
      )}
    </div>
  );
}

export default App;
