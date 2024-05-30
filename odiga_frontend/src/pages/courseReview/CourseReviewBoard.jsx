import React, {useState, useEffect} from "react";
import axios from "axios";
import styles from "./static/courseReview.module.css";
import Styled from "styled-components";
import Pagination from "./Pagination";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import CourseReviewSearch from "./CourseReviewSearch";
import YoutubePlaylist from "./YoutubeAPI";
import {useLocation} from "react-router-dom";
import styled from "styled-components";

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
                   mainImage,
                   tags,
                   courseNo,
               }) => {
    return (
        <div className="grid-item">
            {mainImage ? (
                <img src={mainImage}/>
            ) : (
                <img
                    style={{objectFit: "scale-down", display: "block"}}
                    src="https://img.icons8.com/?size=512&id=j1UxMbqzPi7n&format=png"
                />
            )}
            <BoardTitle>{boardTitle}</BoardTitle> <P>| {nickname}</P>
            <br/>
            <Rate>{boardGrade !== undefined && boardGrade !== null
                ? boardGrade.toFixed(1)
                : "평가 없음"}<RateP>/5</RateP></Rate><P>/조회수 {boardViewCount}개</P>
        </div>
    );
};

const CourseReviewBoard = () => {
    const [posts, setPosts] = useState([]); // 초기 상태 빈 배열로 설정
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(8);
    const [currentPosts, setCurrentPosts] = useState([]);
    const location = useLocation();

    const fetchData = async () => {
        try {
            const response = await axios.get("/coursereviewsearch", {
                params: {
                    query: ""
                },
            });

            const fetchedPosts = response.data;
            console.log("fetchdata 실행")
            setPosts(Array.isArray(fetchedPosts) ? fetchedPosts : []);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const indexOfLast = currentPage * postsPerPage;
        const indexOfFirst = indexOfLast - postsPerPage;
        const slicedPosts = posts.slice(indexOfFirst, indexOfLast);
        setCurrentPosts(slicedPosts);
    }, [posts, currentPage, postsPerPage]);

    const handleSortByLatest = () => {
        const sortedPosts = [...posts].sort(
            (a, b) => new Date(b.boardDate) - new Date(a.boardDate)
        );
        setPosts(sortedPosts);
        setCurrentPage(1);
    };

    const handleSortByViews = () => {
        const sortedPosts = [...posts].sort(
            (a, b) => b.boardViewCount - a.boardViewCount
        );
        setPosts(sortedPosts);
        setCurrentPage(1);
    };

    const handleSortByRating = () => {
        const sortedPosts = [...posts].sort((a, b) => b.boardGrade - a.boardGrade);
        setPosts(sortedPosts);
        setCurrentPage(1);
    };

    return (
        <>
            {/* 메인배너 */}
            <div className={styles["main-banner"]}>
                <div>
                    <div className={styles["cr-row"]}>
                        <div className="col-lg-10 offset-lg-1">
                            <div className="header-text">
                                <div style={{display: "flex"}}>
                                    <div style={{padding: "30px", flex: 1}}>
                                        <YoutubePlaylist/>
                                    </div>
                                    <div style={{flex: 1, padding: "30px"}}>
                                        <h2
                                            style={{
                                                padding: "50px",
                                                fontFamily: "JalnanGothic",
                                                fontSize: "25px",
                                            }}
                                        >
                                            <em
                                                style={{
                                                    fontStyle: "normal",
                                                    fontFamily: "JalnanGothic",
                                                    fontSize: "25px",
                                                    color: "#00bdfe",
                                                }}
                                            >
                                                여행코스
                                            </em>{" "}
                                            후기 게시판
                                        </h2>
                                        <p style={{fontSize: "15px"}}>
                                            즐거운 여행이 되셨나요?
                                            <br/>
                                            이제 ODIGA 에 여러분들이 다녀온 여행 후기를 나눠주세요{" "}
                                            <br/>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section
                style={{
                    padding: "1px 10% 0 10%",
                    width: "100%",
                    fontSize: "15px",
                    backgroundColor: "#f3f4f6",
                }}
            >
                <div>
                    <div>
                        <div>
                            <div
                                style={{marginTop: "30px", marginBottom: "100px"}}
                                className="section-heading text-center"
                            >
                                <h4 style={{fontFamily: "JalnanGothic", fontSize: "25px"}}>
                                    <em
                                        style={{
                                            fontFamily: "JalnanGothic",
                                            fontSize: "25px",
                                            color: "#0a97cd",
                                        }}
                                    >
                                        TRAVEL COURSE
                                    </em>{" "}
                                    &nbsp; REVIEW ARTICLES
                                </h4>
                                <CourseReviewSearch setPosts={setPosts} setCurrentPage={setCurrentPage}/>

                            </div>
                        </div>
                        {/* 여기부터는 카드 목록 */}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: "10px",
                                fontSize: "18px",
                            }}
                        >
                            <div
                                style={{fontFamily: "GmarketSansMedium", paddingLeft: "10px"}}
                            >
                                총{" "}
                                <em style={{fontStyle: "normal", color: "#0a97cd"}}>
                                    {posts.length}
                                </em>{" "}
                                건
                            </div>
                            <div>
                                <button
                                    style={{
                                        fontFamily: "GmarketSansMedium",
                                        border: "none",
                                        background: "none",
                                        paddingRight: "5px",
                                    }}
                                    onClick={handleSortByLatest}
                                >
                                    최신순 |
                                </button>
                                <button
                                    style={{
                                        fontFamily: "GmarketSansMedium",
                                        border: "none",
                                        background: "none",
                                        paddingRight: "5px",
                                    }}
                                    onClick={handleSortByViews}
                                >
                                    조회순 |
                                </button>
                                <button
                                    style={{
                                        fontFamily: "GmarketSansMedium",
                                        border: "none",
                                        background: "none",
                                        paddingRight: "10px",
                                    }}
                                    onClick={handleSortByRating}
                                >
                                    평점순
                                </button>
                            </div>
                        </div>
                        <hr style={{margin: "10px"}}/>
                        <div
                            style={{
                                padding: "10px",
                                display: "grid",
                                gridTemplateRows: "1fr",
                                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                                gridGap: "50px",
                            }}
                        >
                            {currentPosts.length > 0 ? (
                                currentPosts.map((item) => (
                                    <StyledLink
                                        href={`/coursereview/detail/${item.boardNo}`}
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
                                            mainImage={item.mainImage}
                                            courseNo={item.courseNo}
                                            loading="lazy"
                                        />
                                    </StyledLink>
                                ))
                            ) : (
                                <p>데이터가 없습니다.</p>
                            )}
                        </div>
                        <div style={{visibility: "hidden", minHeight: "50px"}}/>
                        {/* 페이지네이션 */}
                        <Pagination
                            currentPage={currentPage}
                            postsPerPage={postsPerPage}
                            totalPosts={posts.length}
                            setCurrentPage={setCurrentPage}
                        ></Pagination>
                    </div>
                </div>
            </section>
        </>
    );
};

const Rate = styled.div`
  width: 80px;
  height: 22px;
  color: white;
  background-color: #00429b;
  padding: 2px;
  text-align: center;
  display: inline;
  border-radius: 20px 0 20px 20px;
  padding: 4px 5px 2px 5px;

  p {
    display: inline;
    font-size: 10px;
    color: #80a1cd;
  } `;

const P = Styled.div`
  display: inline;
  font-size: 12px;
  color: #909090;
`;

const RateP = styled.span`
  font-size: 12px;
  color: #DBDBC5;
`

const StyledLink = Styled.a`
  text-decoration: none;
  color: inherit;
`;

const BoardTitle = Styled.span`
    font-family: JalnanGothic;
    font-size: 15px;
`

export default CourseReviewBoard;