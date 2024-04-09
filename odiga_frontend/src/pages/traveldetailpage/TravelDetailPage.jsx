import React , { useState }from "react";
import './css/styles.css'; 

function TravelDetailPage() {
    return (
        <body>
          <header>
            <h1>여행지 상세 정보</h1>
          </header>
    
          <main>
            <LikeButton/>
            <section id="travel-name">
              <h2>여행지 이름</h2>
              <p id="name-placeholder">벛꽃 축제.</p>
            </section>
    
            <section id="map-location">
              <h2>지도 위치</h2>
              <div id="map-placeholder">
                <img src="https://spi.maps.daum.net/map2/map/imageservice?IW=600&IH=350&MX=400205&MY=-11702&SCALE=2.5&service=open" alt="" />
              </div>
            </section>
    
            <section id="detail-info">
              <h2>상세 정보</h2>
              <p id="detail-placeholder">이 축제는 저시깽 모시깽 이러이러 한 벛꽃축제입니다.</p>
            </section>
    
            <section id="tag-list">
              <h2>태그 목록</h2>
              <div id="tag-list-placeholder">
                <span className="tag">#벛꽃</span>
                <span className="tag">#축제</span>
                <span className="tag">#가고싶다</span>
              </div>
            </section>
    
            <section id="similar-destinations">
              <h2>비슷한 여행지 추천 목록</h2>
              <div id="similar-destinations-placeholder">
                <img src="https://a.cdn-hotels.com/gdcs/production75/d1444/e66988b1-f783-4e8f-a7ea-8c5eebe88436.jpg?impolicy=fcrop&w=800&h=533&q=medium" alt="비슷한 여행지 사진 1" />
                <img src="https://image.ajunews.com/content/image/2020/10/29/20201029110919207531.jpg" alt="비슷한 여행지 사진 2" />
                <img src="https://img.freepik.com/free-photo/woman-traveler-with-backpack-walking-in-row-of-yellow-ginkgo-tree-in-autumn-autumn-park-in-tokyo-japan_335224-178.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1712102400&semt=ais" alt="비슷한 여행지 사진 3" />
              </div>
            </section>
    
            <section id="reviews">
              <h2>후기와 별점 매기기</h2>
              <div id="reviews-placeholder">
                <input type="text" />
                <div className="rating">
                  <span className="star">&#9733;</span>
                  <span className="star">&#9733;</span>
                  <span className="star">&#9733;</span>
                  <span className="star">&#9733;</span>
                  <span className="star">&#9734;</span>
                </div>
                <button>submit</button>
              </div>
            </section>
    
            <section id="review-display">
              <h2>리뷰</h2>
              <div id="review-display-placeholder">
                <h3>reviews</h3>
              </div>
            </section>
          </main>
        </body>
    )
}

function LikeButton() {
    const [likes, setLikes] = useState(0);
  
    return (
        <section id="action-bar">
              <div id="count-container">
                <img src="view-icon.png" alt="icon" />
                <span id="view-count">조회수: 100</span>
                <img src="like-icon.png" alt="icon" />
                <span id="like-count">좋아요: {likes}</span>
              </div>
              <button id="like-button" onClick={() => setLikes(likes + 1)}>
                 좋아요
              </button>
            </section>
    );
  }
  

export default TravelDetailPage;