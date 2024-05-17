import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./static/slider.css";
import { useState } from "react";



function Carousel({selectedCourse, MainImage, setMainImage , userdata }) {

    const settings = {
      dots: true,
      infinite: false,
      speed: 1000,
      slidesToShow: selectedCourse && selectedCourse.length > 1 ? 3 : selectedCourse ? selectedCourse.length : 1, // 존재하고 
      slidesToScroll: 1,
      row: 1,
    };


    const handleImageSelect = (course) => {
      setMainImage(course.firstimage);
      console.log(MainImage);
    }
    
  
  
    return (
      <div style={{ top: "50%", textAlign: "center" }}>
        {selectedCourse && selectedCourse.length > 0 && (
          <Slider {...settings}>
            {selectedCourse.map((course, index) => (
              <div key={course.courseno}>
                <span>{index + 1}. </span>
                {ItemImg(course.firstimage , course.mapx , course.mapy ,course.title , course.addr1)}             
                {ItemTitle(course.title)}
                <button onClick={() => handleImageSelect(course)}>Select Image</button>
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
            zoom: 17
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
            borderRadius: "30px",
          }}
          src={imgSrc}
          alt="course_image"
        />
      </button>
    );
  }





  export default Carousel;