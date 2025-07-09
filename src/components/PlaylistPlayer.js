import React from "react";

const PlaylistPlayer = () => {
  return (
    <div style={styles.container}>
      <iframe
        width="320"
        height="180"
        src="https://www.youtube.com/embed/videoseries?list=PLHFPDHiiBh2p1DMSuDqVD0d01YVtLMOpN"
        title="YouTube Playlist"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

const styles = {
  container: {
    margin: "20px auto",
    width: "fit-content",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  },
};

export default PlaylistPlayer;
