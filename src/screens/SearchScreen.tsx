import React from "react";
import VideoSearch from "../components/VideoSearch/VideoSearch";

function SearchScreen() {
  return (
    <div className="SearchScreen relative p-2 box-border flex-grow w-full flex flex-col overflow-y-auto">
      <h3 className="text-[24px] text-center">
        Search Video and Add your note
      </h3>
      <VideoSearch />
    </div>
  );
}

export default SearchScreen;
