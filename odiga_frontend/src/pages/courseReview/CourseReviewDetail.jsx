import { faEye, faHeart, faStar } from "@fortawesome/free-regular-svg-icons";
import {
  faQuoteLeft,
  faQuoteRight,
  faHeart as solidHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styled from "styled-components";
import Comments from "./Comments";
import "./static/slider.css";
import Footer from "../component/footer/Footer";
import Header from "../tiles/Header";
import { LoginInfoContext } from "../login/LoginInfoProvider";

function CourseReviewDetail() {
  const { boardNo } = useParams();
  const [detailsData, setDetailsData] = useState(null);
  const [didMount, setDidMount] = useState(false);
  const [liked, setLiked] = useState(false); // 좋아요 상태 관리
  const [likeCount, setLikeCount] = useState(0); // 좋아요 수 관리
  const navigate = useNavigate(); // useNavigate 훅 사용
  const loginInfo = useContext(LoginInfoContext);

  console.log("로그인정보 :" + loginInfo.email);
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

  const handleDelete = async () => {
    const confirmDelete = window.confirm("게시글을 삭제 하시겠습니까?");
    if (confirmDelete) {
      try {
        await axios.put(`/coursereview/delete/${boardNo}`);
        alert("게시글이 삭제 되었습니다");
        navigate("/coursereview"); // navigate로 페이지 이동
      } catch (error) {
        console.error("Error deleting the post:", error);
      }
    }
  };

  return (
    <>
      <Header />
      <Container>
        <section
          style={{
            width: "100%",
            backgroundColor: "#f3f4f6",
            margin: "0 auto",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              margin: "0 auto",
              marginBottom: "10px",
              padding: "10px",
              width: "100%",
            }}
            className="section-heading text-center"
          >
            <h4
              style={{
                fontFamily: "JalnanGothic",
                fontSize: "25px",
                padding: "10px",
                margin: "0 auto",
              }}
            >
              {detailsData && detailsData[0].boardTitle}{" "}
            </h4>
            <hr />
            <h7
              style={{
                fontFamily: "JalnanGothic",
                fontSize: "18px",
                textAlign: "left",
                margin: "0 auto",
              }}
            >
              <b>작성자 :</b> {detailsData && detailsData[0].nickname}{" "}
              &nbsp;&nbsp; &nbsp;
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
            </h7>
            <br />
            <hr />
          </div>

          <Div
            style={{
              textAlign: "left",
              margin: "0 auto",
              width: "95%",
              minHeight: "30em",
              marginBottom: "30px",
              padding: "30px",
              border: "1px solid #e5e5e5",
              backgroundColor: "white",
              overflow: "scroll",
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
              width: "100%",
              margin: "0 auto",
              padding: "10px",
              borderRadius: "10px",
              marginBottom: "30px",
            }}
          >
            {carousel()}
          </Div>

          <Div
            style={{
              width: "100%",
              margin: "30px 0 30px 0 auto",
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

          <div
            style={{
              margin: "0px auto",
              width: "100%",
              marginTop: "30px",
              marginBottom: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link
              className="btn btn-primary"
              style={{
                width: "100px",
                borderColor: "#13294b",
                backgroundColor: "#13294b",
                color: "#fff",
                marginRight: "10px",
              }}
              to="/coursereview"
            >
              목 록
            </Link>

            {detailsData && detailsData[0] && loginInfo && loginInfo.email === detailsData[0].email && (
              <>
                <button
                  className="btn btn-primary"
                  style={{
                    width: "100px",
                    borderColor: "#13294b",
                    backgroundColor: "#13294b",
                    color: "#fff",
                    float: "right",
                    marginRight: "10px",
                  }}
                >
                  수 정
                </button>

                <button
                  className="btn btn-primary"
                  style={{
                    width: "100px",
                    borderColor: "#13294b",
                    backgroundColor: "#13294b",
                    color: "#fff",
                    margin: "0 10px 0 0",
                    float: "right",
                  }}
                  onClick={handleDelete}
                >
                  삭 제
                </button>
              </>
            )}
          </div>
          <br />
        </section>
        <div
          style={{
            margin: "50px 0 50px 0",
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ flex: "1" }}>
            <h4>
              <FontAwesomeIcon icon={faQuoteLeft} size="2x" /> &nbsp; 해당
              코스가 마음에 드시나요? &nbsp;
              <FontAwesomeIcon icon={faQuoteRight} size="2x" />
            </h4>
            하트를 누르시면 활용하여 최적의 여행지를 추천해 드리겠습니다.
          </div>
          <div style={{ margin: "20px auto" }}>
            <button
              className="btn btn-primary"
              onClick={handleLike}
              disabled={liked}
              style={{
                background: "none",
                border: "none",
                padding: "0",
                margin: "0",
              }}
            >
              {liked ? (
                <>
                  <FontAwesomeIcon
                    icon={solidHeart}
                    size="4x"
                    style={{ color: "red", marginRight: "100px" }}
                  />
                </>
              ) : (
                <>
                  <FontAwesomeIcon
                    icon={faHeart}
                    size="4x"
                    style={{ color: "red", marginRight: "100px" }}
                  />
                </>
              )}
            </button>
          </div>
        </div>

        <Comments />
      </Container>
      <Footer />
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
        }}
      >
        <img
          style={{
            maxWidth: "100%",
            maxHeight: "300px",
            overflow: "hidden",
            padding: "20px",
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
  padding: 100px 20% 0 20%;
  font-size: 15px;
`;

const Div = styled.div`
  width: 100%;
  height: auto;
`;
