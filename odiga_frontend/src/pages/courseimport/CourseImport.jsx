import React, { useEffect, useState, useContext } from "react";
import { LoginInfoContext } from "../login/LoginInfoProvider";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import TextEditor from "../component/Ckeditor/TextEditor";
import HashtagInput from "./HashtagInput.js";
import './styles.css';
import './couseImport.css';

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
  const [userdata, setUserData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState([]);
  const [boardContent, setBoardContent] = useState("");
  const [MainImage, setMainImage] = useState(null);
  const [tags, setTags] = useState(null);
  const [areacode, setAreacode] = useState("");
  const loginInfo = useContext(LoginInfoContext); 
  const navigate = useNavigate();
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [cosNo , setCosNo] = useState(null); 


  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    if(title.length > 20){
      alert("제목은 최대 20글자까지 가능합니다.");
    }
  };

  useEffect(() => {
    if (loginInfo === null) {
      return; 
    }
    if (!loginInfo) {
      alert("로그인 후 이용 가능합니다.");
      navigate("/login"); 
    } else {
      fetchTravelCourse();
    }
  }, [loginInfo, navigate]);

  useEffect(() => {
    fetchTravelCourse();
  }, []);

  const areaCodeToName = {
    '1': '서울',
    '2': '인천',
    '3': '대전',
    '4': '대구',
    '5': '광주',
    '6': '부산',
    '7': '울산',
    '8': '세종',
    '31': '경기',
    '32': '강원',
    '33': '충북',
    '34': '충남',
    '35': '경북',
    '36': '경남',
    '37': '전북',
    '38': '전남',
    '39': '제주'
  };

  const getAreaName = (code) => {
    return areaCodeToName[code] || "대한민국"; 
  };

  // 필수 매개변수
const requiredParams = {
  boardTitle: title,
  boardContent: boardContent,
  mainimage: MainImage,
  areacode: areacode,
  nickname: loginInfo.nickname,
  email: loginInfo.email,
  courseno: cosNo
};

// 키값과 한글 메시지 매핑 객체
const paramNamesInKorean = {
  boardTitle: "제목",
  boardContent: "내용",
  mainimage: "메인 이미지",
  areacode: "지역 코드",
  nickname: "닉네임",
  email: "이메일",
  courseno: "코스 번호"
};

// 필수 매개변수 검증 함수
function validateParams(params) {
  for (const [key, value] of Object.entries(params)) {
      if (value === undefined || value === null || value === "") {
        alert(`[${paramNamesInKorean[key]}]을/를 채워주세요.`);
        return false;
      }
  }
  return true;
}

  const courseImport = () => {
    const areaName = getAreaName(areacode);
    const fullTitle = `[${areaName}] ${title}`;
    const isConfirmed = window.confirm(`저장하시겠습니까?`);
          if (isConfirmed) {
            if (validateParams(requiredParams)){
              axios.post("/courseimport", {
                boardTitle: fullTitle,
                boardContent: boardContent,
                mainimage: MainImage,
                tags: tags,
                areacode: areacode,
                nickname: loginInfo.nickname,
                email: loginInfo.email,
                courseno: cosNo
              })
              .then((response) => {
                console.log(response, "가 전송됐습니다.");
                alert("여행코스 후기를 작성하였습니다.");
                // response.data에 boardNo가 포함되어 있다고 가정
                const boardNo = response.data;
                navigate(`/coursereview/detail/${boardNo}`);
              })
              .catch((error) => {
                console.error("POST 요청이 실패했습니다:", error);
              });
            }
          } else { alert("취소되었습니다."); }
    
  };

  const fetchTravelCourse = () => {
    if (loginInfo.nickname) {
      axios.post("/MyCourseDisplay", { nickname: loginInfo.nickname })
        .then((response) => {
          const coursesData = Array.isArray(response.data) ? response.data : [];
          const courseNO = response.data.filter(data => data.courseno === response.data[0].courseno);
          setUserData(coursesData);
          if (response.data.length > 0) {
            setAreacode(response.data[0].areacode);
            console.log("Areacode:", response.data[0].areacode);
            console.log("여행 코스를 성공적으로 가져왔습니다.", courseNO);
            setCosNo(response.data[0].courseno);
            setSelectedCourse(response.data.filter(data => data.courseno === response.data[0].courseno));
            setMainImage(response.data[0].firstimage);
            handleImageClick(response.data[0].mapx , response.data[0].mapy ,response.data[0].title , response.data[0].addr1 , response.data[0].firstimage ,response.data[0].contentid)
          }
        })
        .catch((error) => {
          console.error("여행 코스를 가져오는데 실패했습니다:", error);
        });
    }
  };

  const handleclickoption = (courseno) => {
    const userCourseNO = userdata.filter((data) => data.courseno === courseno);
    if (userCourseNO.length > 0) {
      setTitle("");
      setAreacode(userCourseNO[0].areacode);
      console.log("Selected Areacode:", userCourseNO[0].areacode);
      setCosNo(courseno);
      handleImageClick(userCourseNO[0].mapx ,userCourseNO[0].mapy , userCourseNO[0].title , userCourseNO[0].addr1 , userCourseNO[0].firstimage , userCourseNO[0].contentid); 
    }
    setSelectedCourse(userCourseNO);
  };

  const groupedByDay = selectedCourse.reduce((acc, curr) => {
    acc[curr.courseday] = [...(acc[curr.courseday] || []), curr];
    return acc;
  }, {});

  const handleTagsChange = (newTags) => {
    console.log(newTags);
    setTags(newTags|| null);
  };

  const handleImageClick = (mapx, mapy, title, addr1, imgSrc, uniqueId) => {
    setMainImage(imgSrc);
    setSelectedImageId(uniqueId);
    console.log("Selected Image ID:", uniqueId); 
    console.log("Main Image:", imgSrc); 

    const script = document.createElement('script');
    script.src = 'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=qdemuo7rvh&callback=initMap';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const mapOptions = {
        center: new window.naver.maps.LatLng(mapy, mapx),
        zoom: 17
      };
      const map = new window.naver.maps.Map('travelCourseMap', mapOptions);
      const markerOptions = {
        position: new window.naver.maps.LatLng(mapy, mapx),
        map: map
      };
      const marker = new window.naver.maps.Marker(markerOptions);

      const infoWindow = new window.naver.maps.InfoWindow({
        content: `<div><h2>${title}</h2><p>${addr1}</p><img src=${imgSrc} style="max-width: 200px;"></img></div>`
      });

      window.naver.maps.Event.addListener(marker, 'click', () => {
        infoWindow.open(map, marker);
      });
    };

    return () => document.body.removeChild(script);
  };
  
  if (loginInfo === undefined) {
    return null;
  }
  

  return (
    <>
      <section className="couseImportContainer">
        <section className="couseImportTop">
          <h3>{loginInfo.nickname}님의 여행기를 공유해주세요 :)</h3>
        </section>

        <section className="couseImportTitleInner">
          [{getAreaName(areacode)}] 
          <input
            className="couseImportTitleBox"
            type="text"
            placeholder={` 제목을 입력하세요.`}
            value={title}
            onChange={handleTitleChange}
          />
        </section>

        <section className="couseImportTextBox">
          <div className="editor-container">
            <TextEditor setData={setBoardContent} />
          </div>
        </section>
        
        <section className="couseImportHashTagBox">
          <HashtagInput onTagsChange={handleTagsChange} />
        </section>

        <div className="contourLineCourseContainer"></div>
        
        <section className="travelCourseContainer">
          <div className="travelCourseInner">
            <div className="travelCourseDataInner">
              <div className="travelCourseDataTitle">
                <select onChange={(event) => handleclickoption(event.target.value)} className="courseSelectBox">
                  {[...new Set(userdata.map((data) => data.courseno))]
                    .map((courseno) => {
                      const courseTitle = userdata.find((data) => data.courseno === courseno).coursetitle;
                      return (
                        <option key={courseno} value={courseno}>
                          {courseTitle}
                        </option>
                      );
                    })}
                </select>
                <p style={{color: 'grey'}}>일정을 선택하고 사진을 눌러 지도를 확인해보세요! </p>
                <p style={{color: 'grey'}}>(선택 된 사진은 글의 메인 이미지로 활용됩니다.)</p>
                <div className="contourLineCourse"></div>
              </div>

              {Object.keys(groupedByDay).map(day => (
                <div key={day} className="travelCourseDay">
                  <h4>DAY {day}</h4>
                  {groupedByDay[day].sort((a, b) => a.travelnum - b.travelnum).map((item, index) => {
                    const uniqueId = `${day}-${index}`; 
                    return (
                      <div key={uniqueId} className="day-item">
                        <div className={`location-num-wrap ${day === '1' ? 'color-first' : day === '2' ? 'color-second' : day === '3' ? 'color-third' : ''}`}>
                          <p className="location-num">{item.travelnum}</p>
                        </div>
                        <div className="location-img-wrap">
                          <div className="location-img-div">
                            <img 
                              className={`location-img ${selectedImageId === uniqueId ? 'selected' : ''}`} 
                              src={item.firstimage} 
                              alt={item.title} 
                              onClick={() => handleImageClick(item.mapx, item.mapy, item.title, item.addr1, item.firstimage, uniqueId)} 
                            />
                          </div>
                        </div>
                        <div className="result-location-info">
                          <h5>{item.title}</h5>
                          <p style={{color: '#bbb'}}>{item.addr1}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            <div id="travelCourseMap" className="travelCourseMap" ></div>
          </div>
        </section>
        <section className="buttonBox">       
          <button className="button" onClick={courseImport}>
            완료 ✔
          </button>
        </section>
      </section>
    </>
  );
}

export default CourseImport;
