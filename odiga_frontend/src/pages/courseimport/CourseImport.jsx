import React, { useState } from 'react';
import './styles.css'; 

const CourseImport = () => {
  const [selectedCourse, setSelectedCourse] = useState('1');
  const [reviewText, setReviewText] = useState('');

  const courseImages = {
    '1': 'https://a.cdn-hotels.com/gdcs/production75/d1444/e66988b1-f783-4e8f-a7ea-8c5eebe88436.jpg?impolicy=fcrop&w=800&h=533&q=medium',
    '2': 'https://image.ajunews.com/content/image/2020/10/29/20201029110919207531.jpg',
    '3': 'https://img.freepik.com/free-photo/woman-traveler-with-backpack-walking-in-row-of-yellow-ginkgo-tree-in-autumn-autumn-park-in-tokyo-japan_335224-178.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1712102400&semt=ais',
    '4': 'https://example.com/image4.jpg'
  };

  const courseTags = {
    '1': ['태그1', '태그2'],
    '2': ['태그3', '태그4'],
    '3': ['태그5', '태그6'],
    '4': ['태그7', '태그8']
  };

  const handleCourseClick = (courseNumber) => {
    setSelectedCourse(courseNumber);
  };

  const handleReviewChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleSubmitReview = () => {
    // 여행 후기를 제출하는 로직을 여기에 추가
    console.log('여행 후기 제출:', reviewText);
  };

  return (
    <div>
      <header>
        <h1>나만의 여행 코스 작성</h1>
      </header>
      <main>
        <section id="course-selection">
          <h2>여행 코스 선택</h2>
          <div className="icon-container">
            {Object.keys(courseImages).map(courseNumber => (
              <React.Fragment key={courseNumber}>
                <button
                  className={`course-icon ${selectedCourse === courseNumber ? 'selected-icon' : ''}`}
                  onClick={() => handleCourseClick(courseNumber)}
                >
                  {courseNumber}
                </button>
                {courseNumber !== '4' && <span className="arrow">→</span>}
              </React.Fragment>
            ))}
          </div>
          <button id="fetch-my-course">내 여행 코스 가져오기</button>
        </section>

        <section id="similar-destinations-placeholder">
          <h2>여행지 상세 정보</h2>
          <img src={courseImages[selectedCourse]} alt="여행지 이미지" id="similar-destinations" />
          <div id="tags">
            {courseTags[selectedCourse] && courseTags[selectedCourse].map((tag, index) => (
              <span className="tag" key={index}>{tag}</span>
            ))}
          </div>
        </section>
        <section id="course-review">
          <h2>여행 후기 작성</h2>
          <form>
            <textarea
              id="review-text"
              rows="5"
              placeholder="여기에 여행 후기를 작성하세요."
              value={reviewText}
              onChange={handleReviewChange}
            ></textarea>
          </form>
          <button type="button" id="submit-review" onClick={handleSubmitReview}>submit</button>
        </section>
      </main>
    </div>
  );
};

export default CourseImport;
