import React, { useState , useEffect } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./static/slider.css";
import axios from "axios";


const Input = styled.input`
  width: 100%;
  padding: 5px;
  font-size: 16px;
  border-radius: 5px; 
  border: 2px solid black;
  margin-bottom: 10px;
`;

function CourseImport() {
  const [title, setTitle] = useState("");
  const [boardcontent, setBoardContent] = useState("");
  const [userdata, setUserData] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setBoardContent(event.target.value);
  };

  const courseImport = () => {
    axios.post("/courseimport", {
      Title: title,
      BoardContent: boardcontent,
    })
      .then((response) => {
        console.log(response, "가 전송됐습니다.");
      })
      .catch((error) => {
        console.error("POST 요청이 실패했습니다:", error);
      });
  };

  const fetchTravelCourse = () => {
    axios.post("/MyCourseDisplay", {
      nickname: "odiga",
    })
      .then((response) => {
        setUserData(response.data);
        console.log("여행 코스를 성공적으로 가져왔습니다.", response.data);
      })
      .catch((error) => {
        console.error("여행 코스를 가져오는데 실패했습니다:", error);
      });
  };

  const handleDayButtonClick = (day) => {
    setSelectedDay(day);
    const dayCourseData = userdata.filter((data) => parseInt(data.courseday) === day);
    console.log(dayCourseData);
    setSelectedCourse(dayCourseData);
  };
  

  

  return (
    <>
      <header
        style={{
          backgroundColor: "lightblue",
          lineHeight: "80px",
          textAlign: "center",
          display: "block",
          width: "100%",
        }}
      >
        헤더공간
      </header>

      <Container>
        <section
          style={{
            width: "100%",
            backgroundColor: "#f2fbff",
            margin: "0 auto",
          }}
        >
          <div style={{ visibility: "hidden" }}> 보이지 않는 공간 </div>
          <div
            style={{
              margin: "0 auto",
              marginBottom: "30px",
              padding: "5px",
              border: "2px solid black",
              backgroundColor: "white",
              borderRadius: "10px",
              width: "60%",
            }}
            className="section-heading text-center"
          >
            <h4 style={{ margin: "0 auto" }}>
              <Input
                type="text"
                placeholder="글 제목을 입력하세요."
                value={title}
                onChange={handleTitleChange}
              />
            </h4>
          </div>

          <Div
            style={{
              textAlign: "left",
              margin: "0 auto",
              width: "60%",
              minHeight: "30em",
              marginBottom: "30px",
              padding: "30px",
              border: "2px solid black",
              backgroundColor: "white",
              borderRadius: "10px",
            }}
          >
            <Input
              type="textarea"
              placeholder="글 내용을 입력하세요."
              value={boardcontent}
              onChange={handleContentChange}
            />
          </Div>
          <h4> 여행코스 정보 </h4>
          <div style={{ visibility: "hidden" }}> 보이지 않는 공간 </div>
          <Div
            style={{
              textAlign: "left",
              width: "60%",
              margin: "0 auto",
              padding: "10px",
              backgroundColor: "lightblue",
              borderRadius: "10px",
              marginBottom: "30px",
            }}
          >
            <button className="btn btn-primary" type="button" onClick={fetchTravelCourse}>
              내 여행 코스 가져오기
            </button>
            <button className="btn btn-secondary" type="button" onClick={() => handleDayButtonClick(1)}>
              DAY1
            </button>
            <button className="btn btn-secondary" type="button" onClick={() => handleDayButtonClick(2)}>
              DAY2
            </button>
            <button className="btn btn-secondary" type="button" onClick={() => handleDayButtonClick(3)}>
              DAY3
            </button>
            {carousel(selectedCourse)}
          </Div>

          <Div
            style={{
              margin: "0 auto",
              width: "60%",
              marginBottom: "30px",
              marginTop: "30px",
              backgroundColor: "white",
            }}
          >
            <div id="map" style={{ width: '100%', height: '400px' }}></div>
          </Div>

          <div style={{ visibility: "hidden" }}> 보이지 않는 공간 </div>
          <button className="btn btn-primary" type="button" onClick={courseImport}>
            글 작성
          </button>
          <div style={{ visibility: "hidden" }}> 보이지 않는 공간 </div>
        </section>
      </Container>

      <footer
        style={{
          backgroundColor: "lightblue",
          lineHeight: "80px",
          textAlign: "center",
          border: "1px",
          borderColor: "black",
          marginTop: "30px",
        }}
      >
        푸터공간
      </footer>
    </>
  );
}

function carousel(selectedCourse) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 1000,
    slidesToShow: selectedCourse && selectedCourse.length > 1 ? 3 : selectedCourse ? selectedCourse.length : 1, // 존재하고 
    slidesToScroll: 1,
    row: 1,
  };


  return (
    <div style={{ top: "50%", textAlign: "center" }}>
      {selectedCourse && selectedCourse.length > 0 && (
        <Slider {...settings}>
          {selectedCourse.map((course) => (
            <div key={course.courseno}>
              {ItemImg(course.firstimage , course.mapx , course.mapy ,course.title , course.addr1)}             
              {ItemTitle(course.title)}
            </div>
          ))}
        </Slider>
      )}
      {(!selectedCourse || selectedCourse.length === 0) && <p>정보가 없습니다.</p>}
    </div>
  );
}


function ItemTitle(title) {
  return (
    <h4>{title}</h4>
  );
}

function ItemImg(imgSrc, mapx , mapy , title , addr1)  {
  const handleImageClick = () =>{
    if (mapx && mapy) {
      // userdata가 존재하는 경우
      const script = document.createElement('script');
      script.src = 'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=qdemuo7rvh&callback=initMap';
      script.async = true;
      script.onload = () => {
        const mapOptions = {
          center: new window.naver.maps.LatLng(mapy,mapx),
          zoom: 80
        };
        
        const map = new window.naver.maps.Map('map', mapOptions);
        
        const markerOptions = {
          position: new window.naver.maps.LatLng(mapy, mapx),
          map: map
        };
        
        const marker = new window.naver.maps.Marker(markerOptions);
        
        const contentString = `
          <div>
            <h2>${title}</h2>
            <p>${addr1}</p>
            <img src=${imgSrc} style="max-width: 200px;"></img>
          </div>
        `;
        
        const infoWindow = new window.naver.maps.InfoWindow({
          content: contentString
        });
        
        window.naver.maps.Event.addListener(marker, 'click', function() {
          infoWindow.open(map, marker);
        });
      };
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    } else {
      // userdata가 없는 경우 서울역 좌표를 기본으로 사용
      const script = document.createElement('script');
      script.src = 'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=qdemuo7rvh&callback=initMap';
      script.async = true;
      script.onload = () => {
        const mapOptions = {
          center: new window.naver.maps.LatLng(37.554722, 126.970833), // 서울역 좌표
          zoom: 15
        };
        
        const map = new window.naver.maps.Map('map', mapOptions);
        
        const markerOptions = {
          position: new window.naver.maps.LatLng(37.554722, 126.970833), // 서울역 좌표
          map: map
        };
        
        const marker = new window.naver.maps.Marker(markerOptions);
        
        const contentString = `
          <div>
            <h2>서울역</h2>
            <p>서울특별시 중구</p>
          </div>
        `;
        
        const infoWindow = new window.naver.maps.InfoWindow({
          content: contentString
        });
        
        window.naver.maps.Event.addListener(marker, 'click', function() {
          infoWindow.open(map, marker);
        });
      };
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  }
  
  return (
    <button
      style={{
        margin: "0 auto",
        maxWidth: "200px", 
        maxHeight: "200px", 
        border: "0px",
        backgroundColor: "lightblue",
      }}
      onClick={handleImageClick}
    >
      <img
        style={{
          width: "100%", 
          height: "100%", 
          overflow: "hidden",
          padding: "20px",
          backgroundColor: "lightblue",
          borderRadius: "50px",
        }}
        src={imgSrc}
        alt="course_image"
      />
    </button>
  );
}

export default CourseImport;

const Container = styled.div`
  text-align: center;
  verticalAlign: "center";
  background-color: lightblue;
  display: block;
`;

const Div = styled.div`
  width: 100%;
  height: auto;
`;
