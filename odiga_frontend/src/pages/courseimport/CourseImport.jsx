import React, { useEffect, useState  } from "react";
import styled from "styled-components";
import axios from "axios";
import Carousel from "./carousel";
import TextEditor from "../component/Ckeditor/TextEditor";
import HashtagInput from "./HashtagInput.js";
import Header from "../component/navbar/Header";
import Footer from '../component/footer/Footer';
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
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseDayData, setCourseDayData] = useState(null);
  const [boardContent , setBoardContent] = useState("");
  const [MainImage, setMainImage] = useState(null);
  const [tags, setTags] = useState(null);
  const [areacode, setAreacode] = useState("");
  const [nickName, setNickname] = useState("odiga");
  
  const handleTitleChange = (event) => {
    const areaName = getAreaName(areacode);
    const userInput = event.target.value.replace(`[${areaName}] `, ""); 
    setTitle(`[${areaName}] ${userInput}`); 
  };

  useEffect(() => {
    fetchTravelCourse();
  } , []);
  
  const areaCodeToName = {
    '35': '경상북도',
   //아레아코드 어떻게 ?..
  };

  const getAreaName = (code) => {
    return areaCodeToName[code] || "지역코드 없음"; 
  };
  
  const courseImport = () => {
    axios.post("/courseimport", {
      Title: title,
      BoardContent: boardContent,
      MainImage : MainImage ,
      Tags : tags ,
      areacode : areacode,
      nickName : nickName
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
      nickname: nickname,
    })
      .then((response) => {
        setUserData(response.data);
        console.log("여행 코스를 성공적으로 가져왔습니다.", response.data);
        if (response.data.length > 0) {
          setAreacode(response.data[0].areacode);
          handleclickoption(response.data[0].courseno);
        }
      })
      .catch((error) => {
        console.error("여행 코스를 가져오는데 실패했습니다:", error);
      });
      
  };

  const handleclickoption = (courseno) => {
    const userCourseNO = userdata.filter((data) => data.courseno === courseno);
    setSelectedCourse(userCourseNO);
  };
  
  const handleDayButtonClick = (day) => {
    const dayCourseData = selectedCourse.filter((data) => parseInt(data.courseday) === day);
    console.log(dayCourseData);
    setCourseDayData(dayCourseData);
  };

  const handleTagsChange = (newTags) => {
    console.log(newTags);
    setTags(newTags);
  };
  
  

  
  const nickname ="gyugyu"
  return (
    <>
        <Header/>
        <section className="couseImportContainer">
           
           <section className="couseImportTop">
            <h3> {nickname}님의 여행기를 공유해주세요 :)</h3>
           </section>
            
            <section className="couseImportTitleInner"> 
              <input
                className="couseImportTitleBox"
                type="text"
                placeholder={`[${getAreaName(areacode)}] 제목을 입력하세요.`}
                value={title}
                onChange={handleTitleChange}
              />
            </section>
            {/* style={{
              textAlign: "left",
              margin: "0 auto",
              width: "60%",
              minHeight: "30em",
              marginBottom: "30px",
              padding: "30px",
              border: "2px solid black",
              backgroundColor: "white",
              borderRadius: "10px",
            }} */}
           <section className="couseImportTextBox">
            <div>
            <TextEditor setData={setBoardContent} />
            </div>
           </section>
         
          <section className="couseImportHashTagBox">
          <HashtagInput onTagsChange={handleTagsChange} />
          </section>

          <h4> 여행코스 정보 </h4>
          <div style={{ visibility: "hidden" }}> 보이지 않는 공간 </div>
          <select onChange={(event) => handleclickoption(event.target.value)}>
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
            <Carousel selectedCourse={courseDayData} MainImage={MainImage} setMainImage={setMainImage} userdata = {userdata}/>
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
      

       <Footer/>
    </>
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

