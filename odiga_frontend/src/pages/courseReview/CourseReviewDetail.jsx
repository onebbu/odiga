import { faEye, faHeart, faStar } from "@fortawesome/free-regular-svg-icons";
import {
  faQuoteLeft,
  faQuoteRight,
  faHeart as solidHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate, Await } from "react-router-dom";
import styled from "styled-components";
import Comments from "./Comments";
import { LoginInfoContext } from "../login/LoginInfoProvider";
import CourseReviewCourse from "./CourseReviewCourse";
import CustomEditor from "./CustomEditor";

function CourseReviewDetail() {
  const { boardNo } = useParams();
  const [detailsData, setDetailsData] = useState(null);
  const [didMount, setDidMount] = useState(false);
  const [liked, setLiked] = useState(false); // 좋아요 상태 관리
  const [likeCount, setLikeCount] = useState(0); // 좋아요 수 관리
  const navigate = useNavigate(); // useNavigate 훅 사용
  const loginInfo = useContext(LoginInfoContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [editedTitle, setEditedTitle] = useState("");

  console.log("로그인정보 :" + loginInfo.email);
  useEffect(() => {
    setDidMount(true);
    return () => {};
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/coursereview/detail/${boardNo}`);
        const { boardLikeCount } = response.data[0];
        setDetailsData(response.data);
        setLikeCount(boardLikeCount);
        // 로컬 스토리지에서 좋아요 상태 확인
        const storedLikedStatus = localStorage.getItem(
          `liked_${boardNo}_${loginInfo.email}`
        );
        if (storedLikedStatus === "true") {
          setLiked(true);
        }
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    if (didMount) {
      fetchData();
    }
  }, [didMount, boardNo, isEditing]);

  const handleLike = async () => {
    if (loginInfo) {
      try {
        if (!liked) {
          await axios.post(`/coursereview/like/${boardNo}`);
          setLikeCount((prevCount) => prevCount + 1);
          setLiked(true);
          localStorage.setItem(`liked_${boardNo}_${loginInfo.email}`, "true");
          alert("좋아요를 눌렀습니다.");
        } else {
          await axios.post(`/coursereview/likeCancel/${boardNo}`);
          setLikeCount((prevCount) => prevCount - 1);
          setLiked(false);
          localStorage.setItem(`liked_${boardNo}_${loginInfo.email}`, "false");
          alert("좋아요를 취소하였습니다.");
        }
      } catch (error) {
        console.error("게시물 좋아요 중 오류 발생:", error);
      }
    } else {
      // 로그인되지 않은 경우, 로그인 알림 표시
      alert("로그인 후 다시 시도해주세요.");
      // 로그인 페이지로 이동하거나 다른 처리를 수행할 수 있음
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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const editCancel = () => {
    setIsEditing(false);
  };

  const handleEditorChange = (content) => {
    setEditedContent(content);
  };

  const handleSave = async () => {
    const confirmSave = window.confirm("수정한 내용을 저장하시겠습니까?");
    if (confirmSave) {
      // 수정된 내용이 없으면 알림을 띄우고 함수를 종료
      if (!editedTitle.trim()) {
        alert("제목을 입력해주세요.");
        return;
      }

      try {
        // 서버에 수정된 내용 업데이트 요청
        await axios.put(`/coursereview/update/${boardNo}`, {
          boardTitle: editedTitle,
          boardContent: editedContent,
          boardNo: boardNo,
        });
        alert("수정이 완료되었습니다.");
        setIsEditing(false); // 수정 모드 종료
        // 수정 후 페이지 리로드
        window.location.reload();
      } catch (error) {
        console.error("게시물 수정 중 오류 발생:", error);
      }
    }
  };

  return (
    <>
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
              {isEditing ? (
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              ) : (
                detailsData?.[0]?.boardTitle
              )}
            </h4>
            <hr />
            <h7
              style={{
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

            <h7
              style={{
                fontSize: "18px",
                textAlign: "left",
                margin: "0 auto",
              }}
            >
              {detailsData?.[0]?.tags !== undefined &&
              detailsData?.[0]?.tags !== null
                ? detailsData[0].tags
                : "#태그 없음"}
            </h7>
            <hr />
          </div>

          <Div
            style={{
              textAlign: "left",
              margin: "10px auto",
              width: "98%",
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
                {!isEditing ? (
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
                ) : (
                  <CustomEditor
                    initialValue={
                      detailsData &&
                      detailsData[0] &&
                      detailsData[0].boardContent
                        ? detailsData[0].boardContent
                        : ""
                    }
                    onChange={handleEditorChange}
                    boardNo={boardNo}
                  />
                )}
              </div>
            </div>
          </Div>
          <h7
            style={{
              fontFamily: "JalnanGothic",
              fontSize: "18px",
            }}
          >
            여행코스 정보
          </h7>
          <CourseReviewCourse detailsData={detailsData} />

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
            {!isEditing ? (
              <Link
                className="btn btn-primary"
                style={{
                  width: "100px",
                  borderColor: "#13294b",
                  backgroundColor: "#13294b",
                  color: "#fff",
                }}
                to="/coursereview"
              >
                목 록
              </Link>
            ) : (
              ""
            )}

            {detailsData &&
              detailsData[0] &&
              loginInfo &&
              loginInfo.email === detailsData[0].email && (
                <>
                  {!isEditing ? (
                    <button
                      className="btn btn-primary"
                      style={{
                        width: "100px",
                        borderColor: "#13294b",
                        backgroundColor: "#13294b",
                        color: "#fff",
                        float: "right",
                        margin: "0 10px 0 10px",
                      }}
                      onClick={handleEdit}
                    >
                      수 정
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary"
                      style={{
                        width: "100px",
                        borderColor: "#13294b",
                        backgroundColor: "#13294b",
                        color: "#fff",
                        float: "right",
                        margin: "0 10px 0 10px",
                      }}
                      onClick={handleSave}
                    >
                      저 장
                    </button>
                  )}

                  {!isEditing ? (
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
                  ) : (
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
                      onClick={editCancel}
                    >
                      취 소
                    </button>
                  )}
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
