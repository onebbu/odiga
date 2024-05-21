import React, { useEffect, useState } from "react";

const YoutubePlaylist = () => {
  // 고정된 YouTube 비디오 ID 목록
  const videoIds = [
    "rPZGxw6Jsrg",
    "i8ZXe3PKb3s",
    "Vjk8SjbjxRA",
    "dqkfpKJw348",
    "uvzpY-yFvXY",
    "RdzvyvGcOYQ",
    "dQ_lCmB2hfk",
    "xLD8oWRmlAE",
    "JiwY5RQM95w",
    "7veVqy5gFw8"


  ];
  
  const [videoId, setVideoId] = useState(null);

  useEffect(() => {
    // 무작위로 비디오 ID 선택
    const randomVideoId = videoIds[Math.floor(Math.random() * videoIds.length)];
    setVideoId(randomVideoId);
  }, [videoIds]);

  return (
    <>
      {videoId ? (
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
          frameBorder="0"
          allowFullScreen
          style={{
            marginLeft: "0",
            minHeight: "300px",
            maxWidth: "800px",
            borderRadius: "20px",
          }}
        ></iframe>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default YoutubePlaylist;
