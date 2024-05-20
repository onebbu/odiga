import React, { useState, useEffect } from 'react';
import './Banner.css';

const images = [
  require('../../assets/images/south-korea.jpg'),
  require('../../assets/images/seoul.jpg'),
  require('../../assets/images/busan.png'),
  require('../../assets/images/incheon.png'),
  require('../../assets/images/daegu.png')
];

function Banner() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      setProgress(0); // 이미지 변경 시 진행 바 초기화
    }, 15000); // 15초 간격으로 이미지 변경

    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => prevProgress + 100 / 150); // 15초 동안 100% 진행
    }, 100); // 100ms 간격으로 진행 바 업데이트

    return () => {
      clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 클리어
      clearInterval(progressInterval); // 컴포넌트 언마운트 시 인터벌 클리어
    };
  }, []);

  return (
    <section className="MainBanner">
      <div className="BannerContent">
        <div className="BannerText">
          <p className="BannerHeading">그래서 우리 어디가??</p>
          <div className="BannerDescription">
            <p>ODIGA가 여러분의 여행을</p>
            <p>안내 해드릴게요!</p>
          </div>
          <div className="BannerControls">
           <div className="ProgressBarContainer">
            <div className="ProgressBar" style={{ width: `${progress}%` }}></div>
           </div>
           <div className="ImageCount">
             <span>{String(currentImageIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span>
           </div>
          </div>
        </div>
        <div className="BannerImage">
          <img
            src={images[currentImageIndex]}
            alt="Banner"
            className="BannerImg"
          />
        </div>
      </div>

    </section>
  );
}

export default Banner;
