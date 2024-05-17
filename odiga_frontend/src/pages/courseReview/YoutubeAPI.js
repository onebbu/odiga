import React, { useState, useEffect } from "react";
import axios from "axios";

const YoutubePlaylist = () => {
  const [videos, setVideos] = useState([]);
  const [randomVideos, setRandomVideos] = useState([]);

  // YouTube API 호출하여 재생 목록의 동영상 가져오기
  useEffect(() => {
    const fetchPlaylistVideos = async () => {
      try {
        // 주어진 URL에서 재생 목록 ID 추출
        const playlistId = "PL4Lb93R1nd7ecPn9R7Q09f3dkDa6rbGvj"; // 여기에 추출된 재생 목록 ID를 넣어주세요

        const response = await axios.get(
          "https://www.googleapis.com/youtube/v3/playlistItems",
          {
            params: {
              part: "snippet",
              playlistId: playlistId,
              key: "AIzaSyCuvenJJj2OaMIrQtRwP2lmlTrR84RpYl0", // 여기에 자신의 YouTube API 키를 넣어주세요
              maxResults: 30, // 최대 20개의 동영상을 가져옴
            },
          }
        );
        setVideos(response.data.items);
      } catch (error) {
        console.error("Error fetching playlist videos:", error);
      }
    };

    fetchPlaylistVideos();
  }, []);

  // 동영상 목록을 랜덤하게 섞음
  useEffect(() => {
    if (videos.length > 0) {
      const shuffledVideos = [...videos].sort(() => 0.5 - Math.random());
      const selectedVideos = shuffledVideos.slice(1, 2); // 처음 3개의 동영상 선택
      setRandomVideos(selectedVideos);
    }
  }, [videos]);

  return (
    <>
      {randomVideos.map((video) => (
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}?autoplay=1&mute=1`}
          frameBorder="0"
          allowFullScreen
          style={{
            marginLeft: "0",
            minHeight: "300px",
            maxWidth: "800px",
            borderRadius: "20px",
          }}
        ></iframe>
      ))}
    </>
  );
};

export default YoutubePlaylist;
