import { faEye, faHeart, faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styled from "styled-components";
import Comments from "./Comments";
import "./static/slider.css";

function CourseReviewDetail() {
  const { boardNo } = useParams();
  const [detailsData, setDetailsData] = useState(null);
  const [didMount, setDidMount] = useState(false);
  const [liked, setLiked] = useState(false); // 좋아요 상태 관리
  const [likeCount, setLikeCount] = useState(0); // 좋아요 수 관리

  useEffect(() => {
    setDidMount(true);
    return () => {};
  }, []);

  useEffect(() => {
    if (didMount) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`/coursereview/detail/${boardNo}`);
          const { boardLikeCount } = response.data[0];
          setDetailsData(response.data);
          setLikeCount(boardLikeCount);
          console.log("조회수 증가");
        } catch (error) {
          console.error("Error fetching details:", error);
        }
      };

      fetchData();
      return () => {
        setDidMount(false);
      };
    }
  }, [didMount, boardNo]);

  const handleLike = async () => {
    if (!liked) {
      try {
        await axios.post(`/coursereview/like/${boardNo}`);
        setLikeCount((prevCount) => prevCount + 1);
        setLiked(true);
      } catch (error) {
        console.error("Error liking the post:", error);
      }
    }
  };

  return (
    <>
      <Container>
        <section
          style={{
            width: "100%",
            backgroundColor: "#f2fbff",
            margin: "0 auto",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              margin: "0 auto",
              marginBottom: "10px",
              padding: "10px",
              width: "60%",
            }}
            className="section-heading text-center"
          >
            <h4 style={{ padding: "10px", margin: "0 auto" }}>
              <br />
              {detailsData && detailsData[0].boardTitle}{" "}
            </h4>
            <br />
            <hr />
            <br />
            <h7 style={{ textAlign: "left", margin: "0 auto" }}>
              <b>작성자 :</b> {detailsData && detailsData[0].nickname} &nbsp;
              &nbsp; &nbsp;
              <b>작성일 :</b> {detailsData && detailsData[0].boardDate} <br />{" "}
              <br />
              <FontAwesomeIcon icon={faEye} /> :{" "}
              {detailsData && detailsData[0].boardViewCount} &nbsp; &nbsp;
              &nbsp;
              <FontAwesomeIcon icon={faHeart} /> :{" "}
              {detailsData && detailsData[0].boardLikeCount} &nbsp; &nbsp;
              &nbsp;
              <FontAwesomeIcon icon={faStar} /> :{" "}
              {detailsData?.[0]?.boardGrade !== undefined &&
              detailsData?.[0]?.boardGrade !== null
                ? detailsData[0].boardGrade.toFixed(1)
                : "평가 없음"}
              <br />
            </h7>
            <br />
            <hr />
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
            <div style={{ display: "flex" }}>
              <div className="ck ck-editor__main" style={{ width: "100%" }}>
                <div
                  className="ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline ck-blurred"
                  dangerouslySetInnerHTML={{
                    __html:
                      detailsData &&
                      detailsData[0] &&
                      detailsData[0].boardContent
                        ? detailsData[0].boardContent
                        : "",
                  }}
                />
              </div>
            </div>
          </Div>

          <h4> 여행코스 정보 </h4>
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
          </Div>

          <Div
            style={{
              margin: "0 auto",
              width: "60%",
              marginTop: "30px",
              backgroundColor: "white",
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6215.7725807321685!2d126.69860724487357!3d37.78789857262643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c8b8a0a9d3671%3A0xd2b2c34c16b1778c!2z7Zek7J2066asIOyYiOyIoOuniOydhA!5e0!3m2!1sko!2skr!4v1713327112832!5m2!1sko!2skr"
              style={{
                width: "100%",
                height: "200px",
                textAlign: "left",
                display: "inline-block",
              }}
            ></iframe>
          </Div>

          {/* 좋아요 버튼 */}
          <button className="btn btn-primary" onClick={handleLike} disabled={liked}>
            {liked ? "좋아요 완료" : "좋아요"}
          </button>

          <Link
            className="btn btn-primary"
            style={{ color: "white", textDecoration: "none", margin: "30px" }}
            to="/coursereview"
          >
            목록
          </Link>
        </section>
      </Container>

      <Comments />
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
    rows: 1,
  };
  return (
    <div style={{ top: "50%", textAlign: "center" }}>
      <Slider {...settings}>
        <div>
          {ItemImg()}
          {ItemTitle("여행지1")}
        </div>
        <div>
          {ItemImg(
            "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=9916e682-db49-42ec-b894-fea17074ca21"
          )}
          {ItemTitle("여행지2")}
        </div>
        <div>
          {ItemImg(
            "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=9916e682-db49-42ec-b894-fea17074ca21"
          )}
          {ItemTitle("여행지3")}
        </div>
      </Slider>
    </div>
  );
}

function ItemTitle(Title) {
  return (
    <>
      <h4>{Title}</h4>
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
            maxHeight: "300px",
            overflow: "hidden",
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

export default CourseReviewDetail;

const Container = styled.div`
  text-align: center;
  background-color: white;
  display: block;
  width: 100%;
`;

const Div = styled.div`
  width: 100%;
  height: auto;
`;
