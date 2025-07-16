import React from "react";

const PlaylistPlayer = () => {
  return (
    <div>
      <iframe
        className="youtube-player"
        src="https://www.youtube.com/embed/videoseries?list=PLHFPDHiiBh2p1DMSuDqVD0d01YVtLMOpN"
        title="YouTube Playlist"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default PlaylistPlayer;
