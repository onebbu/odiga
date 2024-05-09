import React, { useState  } from "react";
import styled from "styled-components";
import axios from "axios";
import Carousel from "./Carousel";
import TextEditor from "../component/Ckeditor/TextEditor";
import HashtagInput from "./HashtagInput.js";


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

  const handleTitleChange = (event) => {
    // console.log(MainImage);
    setTitle(event.target.value);
  };


  const courseImport = () => {
    axios.post("/courseimport", {
      Title: title,
      BoardContent: boardContent,
      MainImage : MainImage ,
      Tags : tags
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

  const handleclickoption = (event) => {
    const value = event.target.value;
    const userCourseNO = userdata.filter((data) => data.courseno === "odiga_" + value);
    console.log(userCourseNO);
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
            <TextEditor setData={setBoardContent} />
            
          </Div>

          {/* 해쉬태그 입력칸 */}
          <HashtagInput onTagsChange={handleTagsChange} />


          <h4> 여행코스 정보 </h4>
          <div style={{ visibility: "hidden" }}> 보이지 않는 공간 </div>
          <select onChange={handleclickoption}>
            {[...new Set(userdata.map((data) => data.courseno))]
              .map((courseno) => {
                const courseTitle = userdata.find((data) => data.courseno === courseno).coursetitle;
                return (
                  <option key={courseno} value={courseno.split('odiga_')[1]}>
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
            <Carousel selectedCourse={courseDayData} MainImage={MainImage} setMainImage={setMainImage} />
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