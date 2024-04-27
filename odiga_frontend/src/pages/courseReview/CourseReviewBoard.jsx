import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./static/courseReview.module.css";
import Styled from "styled-components";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";

const Place = ({
  boardContent,
  boardDate,
  boardGrade,
  boardLikeCount,
  boardNo,
  boardTitle,
  boardViewCount,
  boardYN,
  email,
  nickname,
}) => {
  return (
    <div className={`grid-item`}>
      <img
        src="https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=9916e682-db49-42ec-b894-fea17074ca21"
        alt="place"
      />
      {boardTitle} <P>| {nickname}</P>
      <br />
      <Rate>{boardGrade}</Rate> <P>{boardViewCount}</P>
    </div>
  );
};




const CourseReviewBoard = () => {
  const [posts, setPosts] = useState([]); // 초기에 빈 배열로 설정
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);
  const [currentPosts, setCurrentPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/coursereview");
      const fetchedPosts = response.data;

      // 상태 업데이트
      setPosts(fetchedPosts);

      // currentPosts 계산 및 설정
      const indexOfLast = currentPage * postsPerPage;
      const indexOfFirst = indexOfLast - postsPerPage;
      const slicedPosts = fetchedPosts.slice(indexOfFirst, indexOfLast);
      setCurrentPosts(slicedPosts);
    };

    fetchData();
  }, [currentPage, postsPerPage]); // currentPage와 postsPerPage가 변경될 때마다 fetchData 실행

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);

    // 페이지 변경 시 currentPosts 업데이트
    const indexOfLast = pageNumber * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const slicedPosts = posts.slice(indexOfFirst, indexOfLast);
    setCurrentPosts(slicedPosts);
  };

  return (
    <>
      {/* 메인배너 */}
      <div className={styles["main-banner"]}>
        <div>
          <div className={styles["cr-row"]}>
            <div className="col-lg-10 offset-lg-1">
              <div className="header-text">
                <h2 style={{ padding: "50px" }}>
                  <em>여행코스 </em> 후기 게시판
                </h2>
                <p>
                  즐거운 여행이 되셨나요? 이제 ODIGA 에 여러분들이 다녀온 여행
                  후기를 나눠주세요 <br />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 메인배너 */}

      <section
        style={{
          paddingLeft: "10%",
          paddingRight: "10%",
          width: "100%",
          backgroundColor: "#f2fbff",
        }}
      >
        <div>
          <div>
            <div>
              <div
                style={{ marginTop: "30px", marginBottom: "100px" }}
                className="section-heading text-center"
              >
                <h4>
                  <em style={{ color: "#00bdfe" }}>TRAVEL COURSE</em> REVIEW
                  ARTICLES
                </h4>
              </div>
            </div>
            {/* 여기부터는 카드 목록 */}
            <div
              style={{
                padding: "10px",
                display: "grid",
                gridTemplateRows: "1fr",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                gridGap: "50px",
              }}
            >
              {currentPosts &&
                currentPosts.map((item) => (
                  <StyledLink
                    to={`/coursereview/detail/${item.boardNo}`}
                    key={item.boardNo}
                  >
                    <Place
                      boardContent={item.boardContent}
                      boardDate={item.boardDate}
                      boardGrade={item.boardGrade}
                      boardLikeCount={item.boardLikeCount}
                      boardNo={item.boardNo}
                      boardTitle={item.boardTitle}
                      boardViewCount={item.boardViewCount}
                      boardYN={item.boardYN}
                      email={item.email}
                      nickname={item.nickname}
                    />
                  </StyledLink>
                ))}
            </div>
            {/* 페이지네이션 */}
            <Pagination
              currentPage={currentPage}
              postsPerPage={postsPerPage}
              totalPosts={posts.length}
              setCurrentPage={setCurrentPage}
            ></Pagination>
          </div>
        </div>
        <div style={{ visibility: "hidden" }}> 보이지 않는 공간 </div>
      </section>
      <div style={{ visibility: "hidden" }}> 보이지 않는 공간 </div>
    </>
  );
};

const Rate = Styled.div`
  width: 45px;
  height: 22px;
  color: white;
  background-color: #4978ce;
  padding: 2px;
  text-align: center;
  line-height: 22px;
  display: inline;
`;

const P = Styled.div`
  display: inline;
  font-size: 10px;
  color: #909090;
`;

const StyledLink = Styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export default CourseReviewBoard;
