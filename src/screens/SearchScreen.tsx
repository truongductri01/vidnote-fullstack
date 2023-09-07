import React from "react";
import VideoSearch from "../components/VideoSearch/VideoSearch";

function SearchScreen() {
    return (
        <div className="SearchScreen relative box-border flex-grow w-full flex flex-col overflow-y-auto">
            <VideoSearch />
        </div>
    );
}

export default SearchScreen;
