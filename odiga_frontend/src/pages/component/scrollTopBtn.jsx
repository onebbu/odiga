import React, { useState, useEffect } from "react";
import './scrollTopBtn.css';
// 디자인좀....


const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);
  
    // 스크롤 이벤트를 처리하는 함수
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
  
    // 버튼을 클릭했을 때 페이지 상단으로 스크롤되도록 하는 함수
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };
  
    // 페이지가 로드되거나 스크롤될 때 스크롤 이벤트를 추가/제거합니다.
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  
    return (
      <div>
        {isVisible && (
          <button className="scroll-to-top-button" onClick={scrollToTop}>
            <div className="arrow-up"></div>
          </button>
        )}
      </div>
    );
  };

  export default ScrollToTopButton;