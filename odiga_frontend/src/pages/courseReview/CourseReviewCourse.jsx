import React, { useState, useEffect } from "react";
import axios from "axios";
import ResultList from "../result-list/ResultList";
import NaverMapView from "../result-list/naver-map/NaverMapView";
import Spinner from "react-bootstrap/Spinner";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";

const CourseReading = ({ detailsData }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (detailsData && detailsData.length > 0) {
          const nickname = detailsData[0].nickname;
          const courseNo = detailsData[0].courseNo;

          const response = await axios.get(`/courseId/${nickname}/${courseNo}`);
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [detailsData]);

  console.log(data);

  // data가 빈 객체인 경우
  if (data && typeof data === "object" && Object.keys(data).length === 0) {
    return (
      <div style={{height:"10em", padding:"30px"}}>
        <FontAwesomeIcon icon={faBan} size="5x" style={{color:"red", padding:"10px"}}/>
        <p style={{ width: "100%" }}><b>여행코스 정보가 없습니다.</b></p>
      </div>
    );
  }

  if (data) {
    return (
      <>

        <Container>
          <div
            style={{
              width: "50%",
              height: "30em",
              display: "inline-block",
              overflow: "scroll",
              flex: "1",
            }}
          >
            <ResultList data={data} />
          </div>
          <div
            style={{
              width: "50%",
              height: "30em",
              display: "inline-block",
              overflow: "hidden",
              flex: "1",
            }}
          >
            <NaverMapView data={data} />
          </div>
        </Container>
      </>
    );
  }

  // data가 null 또는 undefined인 경우
  return (
    <Container>
      <Spinner animation="border" style={{ width: "3rem", height: "3rem" }} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30em;
  padding: 0px;
  margin: 30px 10px 0 10px;
`;

export default CourseReading;
