import React, { useState, useEffect } from "react";

const YoutubePlaylist = React.memo(() => {
  const videoIds = [
    "rPZGxw6Jsrg", "i8ZXe3PKb3s", "Vjk8SjbjxRA", "dqkfpKJw348",
    "uvzpY-yFvXY", "RdzvyvGcOYQ", "dQ_lCmB2hfk", "xLD8oWRmlAE",
    "JiwY5RQM95w", "7veVqy5gFw8"
  ];

  // 초기 랜덤 비디오 ID 설정
  const [videoId, setVideoId] = useState(() => videoIds[Math.floor(Math.random() * videoIds.length)]);

  return (
    <div className="youtube">
      <iframe
        title="Youtube Video"
        className="youtube"
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
});

export default YoutubePlaylist;