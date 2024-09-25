import { faEye, faHeart, faStar } from "@fortawesome/free-regular-svg-icons";
import {
  faQuoteLeft,
  faQuoteRight,
  faHeart as solidHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios, { all } from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  Link,
  useParams,
  useNavigate,
  Await,
  useLocation,
} from "react-router-dom";
import styled from "styled-components";
import Comments from "./Comments";
import { LoginInfoContext } from "../login/LoginInfoProvider";
import CourseReviewCourse from "./CourseReviewCourse";
import CustomEditor from "./CustomEditor";
import './CourseReviewDetail.css';

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

  const location = useLocation();
  const { pathname: from } = location;

  console.log("로그인정보 :" + loginInfo.email);
  useEffect(() => {
    setDidMount(true);
    // 로컬 스토리지에서 좋아요 상태 확인 및 설정
    const storedLikedStatus = localStorage.getItem(
      `liked_${boardNo}_${loginInfo.email}`
    );
    if (storedLikedStatus === "true") {
      setLiked(true);
    }
    return () => {};
  }, [boardNo, loginInfo.email]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/coursereview/detail/${boardNo}`);
        const { boardLikeCount } = response.data[0];
        setDetailsData(response.data);
        setLikeCount(boardLikeCount);
        setEditedContent(response.data[0].boardContent);
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

  useEffect(() => {
    if (detailsData && detailsData[0]?.boardTitle) {
      setEditedTitle(detailsData[0]?.boardTitle);
    }
  }, [detailsData]);

  const handleLike = async () => {
    if (loginInfo) {
      try {
        if (!liked) {
          await axios.post(`/api/coursereview/like/${boardNo}`);
          setLikeCount((prevCount) => prevCount + 1);
          setLiked(true);
          localStorage.setItem(`liked_${boardNo}_${loginInfo.email}`, "true");
          alert("좋아요를 눌렀습니다.");
          window.location.reload()
        } else {
          await axios.post(`/api/coursereview/likeCancel/${boardNo}`);
          setLikeCount((prevCount) => prevCount - 1);
          setLiked(false);
          localStorage.setItem(`liked_${boardNo}_${loginInfo.email}`, "false");
          alert("좋아요를 취소하였습니다.");
          window.location.reload()
        }
      } catch (error) {
        console.error("게시물 좋아요 중 오류 발생:", error);
      }
    } else {
      // 로그인되지 않은 경우, 로그인 알림 표시
      alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
      navigate("/login", { state: { from } });
      // 로그인 페이지로 이동하거나 다른 처리를 수행할 수 있음
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("게시글을 삭제 하시겠습니까?");
    if (confirmDelete) {
      try {
        await axios.put(`/api/coursereview/delete/${boardNo}`);
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

  const handleTitleChange = (event) => {
    setEditedTitle(event.target.value);
    if(editedTitle.length > 20){
      alert("제목은 최대 20글자까지 가능합니다.");
    }
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
      <section className="container">
        <section className="titleInner">
          <div className="coursereviewtitle">
            <h4>
              {isEditing ? (
                <input type="text" value={editedTitle} onChange={handleTitleChange} />
              ) : (
                detailsData?.[0]?.boardTitle
              )}
            </h4>
          </div>
        </section>      
          

        <section className="Info"> 
          <div className="UserInfoInner">
            <div className="UserInfo">
              <span>{detailsData && detailsData[0].nickname}</span>
              <div className="contourLineCardInfo"></div>  
              <span>{detailsData && detailsData[0].boardDate}</span>
            </div>
          </div>        
          <div className="contentInfoInner">
             <div className="contentInfo">
              <span className="view">👀 : {detailsData && detailsData[0].boardViewCount} </span>
              <span className="heart"><FontAwesomeIcon icon={faHeart} style={{color : 'red'}}/> : {detailsData && detailsData[0].boardLikeCount} </span>
              <span className="star"> <FontAwesomeIcon icon={faStar} style={{color : 'gold'}}/> : {''}
                     {detailsData?.[0]?.boardGrade !== undefined &&
                     detailsData?.[0]?.boardGrade !== null
                     ? detailsData[0].boardGrade.toFixed(1)
                     : "평가 없음"} 
              </span>
             </div>
          </div>
        </section>

        <section className="mainReviewInner">
        {!isEditing ? (
                  <div className="ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline ck-blurred"
                    dangerouslySetInnerHTML={{
                      __html: detailsData && detailsData[0] && detailsData[0].boardContent ? detailsData[0].boardContent : "",
                    }}
                  />
                ) : (
                  <CustomEditor
                    initialValue={ detailsData && detailsData[0] && detailsData[0].boardContent ? detailsData[0].boardContent : "" }
                    onChange={handleEditorChange}
                    boardNo={boardNo}
                  />
                )}
        </section>

        <section className="tagInner">
          <div className="tag">        
                {detailsData && detailsData[0]?.tags !== undefined && detailsData[0]?.tags !== null ? 
                  ( detailsData[0].tags ) : ( "#태그 없음" )}
          </div>
        </section>

        <section className="travelCoursebox">
            <h5 style={{fontWeight : 'bold', marginTop :'70px', fontSize : '26px'}}>
              {detailsData && detailsData[0].nickname}&nbsp;님의 여행코스 정보</h5>
          <div className="contourLinecourseReview"></div>
          <div className="travelCourse">
          <CourseReviewCourse detailsData={detailsData} />
          </div>
        </section>

        <section>
        <div style={{ margin: "50px 0 50px 0", width: "100%", display: "flex", alignItems: "center", }} >
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
              style={{ background: "none", border: "none", padding: "0", margin: "0", }}
            >
              {liked ? (
                <> <FontAwesomeIcon icon={solidHeart} size="4x" style={{ color: "red", marginRight: "100px" }} /> </>
              ) : (
                <> <FontAwesomeIcon icon={faHeart} size="4x" style={{ color: "red", marginRight: "100px" }} /> </>
              )}
            </button>
          </div>
        </div>
        </section>
        
        <section className="commentInner">
          <Comments />
        </section>
        
        <section>
          <div style={{ margin: "0px auto", width: "100%", marginTop: "30px", marginBottom: "30px", display: "flex", justifyContent: "center", alignItems: "center", }} >
              {!isEditing ? (
                <Link className="btn btn-primary" to="/coursereview" > 목 록 </Link>
              ) : ( "" )}
              {detailsData && detailsData[0] && loginInfo && loginInfo.email === detailsData[0].email && (
                  <> {!isEditing ? (
                    <>
                      <button className="btn btn-primary" onClick={handleEdit} > 수 정 </button>
                      <button className="btn btn-primary" onClick={handleDelete} > 삭 제 </button> </>
                    ) : ( <>
                      <button className="btn btn-primary" onClick={handleSave} >  저 장 </button>
                      <button className="btn btn-primary" onClick={editCancel} > 취 소 </button> </>
                    )}
                  </>
                )}
            </div>
        </section>

      </section>
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
