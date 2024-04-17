import React, { Component } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import styles from "./static/courseReview.module.css";
import { red } from "@mui/material/colors";

function CourseReviewDetail() {
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
            <h4> 글 제목이 들어갑니다.</h4>
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
            글 내용이 들어갑니다.
            <br />
            글 내용이 들어갑니다. 글 내용이 들어갑니다.
            <br />
            글 내용이 들어갑니다.
            <br />
            글 내용이 들어갑니다.
            <br />
            <br />
            <br />글 내용이 들어갑니다.
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
            {carousel()}
            <Div style={{ display: "inline-block", width: "100px" }}></Div>
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
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6215.7725807321685!2d126.69860724487357!3d37.78789857262643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c8b8a0a9d3671%3A0xd2b2c34c16b1778c!2z7Zek7J2066asIOyYiOyIoOuniOydhA!5e0!3m2!1sko!2skr!4v1713327112832!5m2!1sko!2skr"
              style={{ width: "100%" }}
            ></iframe>
          </Div>

          <div style={{ visibility: "hidden" }}> 보이지 않는 공간 </div>
          <button className="btn btn-primary" type="submit">
            <Link
              style={{ color: "white" }}
              className="mypageitem"
              to="/coursereview"
            >
              목록
            </Link>
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

function carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    row: 1,
  };
  return (
    <div style={{top:"50%", textAlign: "center" }}>
      <Slider {...settings}>
        <div>
          {ItemImg(
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnScUYoStecJvh9b8x1FxonfUmHBFwxHy4LQX0NcRUGQ&s"
          )}
          {ItemTitle("여행지1")}
        </div>

        <div>
          {ItemImg(
            "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=9916e682-db49-42ec-b894-fea17074ca21"
          )}
          {ItemTitle("여행지2")}
        </div>

        <Div style={{ color: "yellow", margin: "0 auto" }}>
          {ItemImg(
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnScUYoStecJvh9b8x1FxonfUmHBFwxHy4LQX0NcRUGQ&s"
          )}
          {ItemTitle("여행지3")}
        </Div>
      </Slider>
    </div>
  );
}

function ItemTitle(Title) {
  return (
    <>
      <h4 >{Title}</h4>
    </>
  );
}

function ItemImg(imgSrc) {
  return (
    <>
      <button
        style={{
          margin: "0 auto",
          maxWidth: "100%",
          border: "0px",
          backgroundColor: "lightblue",
        }}
      >
        <img
          style={{
            maxWidth: "100%",
            padding: "20px",
            backgroundColor: "lightblue",
            borderRadius: "50px",
          }}
          src={imgSrc}
        />
      </button>
    </>
  );
}

function ItemMap(Map) {
  return <></>;
}

export default CourseReviewDetail;

const Container = styled.div`
  text-align: center;
  verticalAlign:"center"
  background-color: lightblue;
  display: block;
  width: 100%;
`;

const Div = styled.div`
  width: 100%;
  height: auto;
`;
