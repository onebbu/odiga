import React from "react";
import styles from "./static/courseReview.module.css";
import { Link, Route, Routes } from "react-router-dom";

function CourseReviewBoard() {
  return (
    <>
      {/* 헤더 */}
      <header
        style={{
          backgroundColor: "lightblue",
          lineHeight: "80px",
          textAlign: "center",
        }}
      >
        헤더공간
      </header>
      {/* 헤더 */}

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
            <div className="col-lg-12">
              <div className={styles["col-lg-12"]}>
                {/* 각 카드 요소 */}
                {renderCard(
                  "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=83b17026-0ae3-4bce-8a07-6733c29f7752",
                  "좋아요 3",
                  "후기 제목 쓰는 공간",
                  "#태그자리"
                )}
                {renderCard(
                  "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=9916e682-db49-42ec-b894-fea17074ca21",
                  "좋아요 13",
                  "후기 제목 쓰는 공간",
                  "#태그자리"
                )}
                {renderCard(
                  "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=9916e682-db49-42ec-b894-fea17074ca21",
                  "좋아요 13",
                  "후기 제목 쓰는 공간",
                  "#태그자리"
                )}
                {renderCard(
                  "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=9916e682-db49-42ec-b894-fea17074ca21",
                  "좋아요 13",
                  "후기 제목 쓰는 공간",
                  "#태그자리"
                )}
                {renderCard(
                  "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=9916e682-db49-42ec-b894-fea17074ca21",
                  "좋아요 13",
                  "후기 제목 쓰는 공간",
                  "#태그자리"
                )}
                {renderCard(
                  "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=9916e682-db49-42ec-b894-fea17074ca21",
                  "좋아요 13",
                  "후기 제목 쓰는 공간",
                  "#태그자리"
                )}
                {renderCard(
                  "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=9916e682-db49-42ec-b894-fea17074ca21",
                  "좋아요 13",
                  "후기 제목 쓰는 공간",
                  "#태그자리"
                )}
                {renderCard(
                  "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=9916e682-db49-42ec-b894-fea17074ca21",
                  "좋아요 13",
                  "후기 제목 쓰는 공간",
                  "#태그자리"
                )}
                {renderCard(
                  "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=9916e682-db49-42ec-b894-fea17074ca21",
                  "좋아요 13",
                  "후기 제목 쓰는 공간",
                  "#태그자리"
                )}
                {renderCard(
                  "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=9916e682-db49-42ec-b894-fea17074ca21",
                  "좋아요 13",
                  "후기 제목 쓰는 공간",
                  "#태그자리"
                )}
                {/* 추가 카드 요소들도 동일한 방식으로 추가 */}
              </div>
              {/* 페이지 번호 컨트롤 버튼 그룹 */}
              <div
                className="btn-toolbar"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  marginTop: "70px",
                  marginBottom: "30px",
                }}
                role="toolbar"
                aria-label="Toolbar with button groups"
              >
                <div
                  className="btn-group me-2"
                  role="group"
                  aria-label="First group"
                >
                  <button type="button" className="btn btn-primary">
                    &lt;
                  </button>
                  <button type="button" className="btn btn-primary">
                    1
                  </button>
                  <button type="button" className="btn btn-primary">
                    2
                  </button>
                  <button type="button" className="btn btn-primary">
                    3
                  </button>
                  <button type="button" className="btn btn-primary">
                    4
                  </button>
                  <button type="button" className="btn btn-primary">
                    5
                  </button>
                  <button type="button" className="btn btn-primary">
                    &gt;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ visibility: "hidden" }}> 보이지 않는 공간 </div>
      </section>
      <div style={{ visibility: "hidden" }}> 보이지 않는 공간 </div>
      
      <footer
        style={{
          backgroundColor: "lightblue",
          lineHeight: "80px",
          textAlign: "center",
        }}
      >
        푸터공간
      </footer>
    </>
  );
}

function renderCard(imgSrc, badgeText, title, tag) {
  return (
    <div className="col">
      <button type="button" className="card" style={{ margin: "10px" }}>
        <Link
          style={{ color: "black" }}
          className="mypageitem"
          to="/coursereview/detail"
        >
          <div
            className="badge bg-dark text-white position-absolute"
            style={{ top: "0.5rem", right: "1rem" }}
          >
            {badgeText}
          </div>
          <img src={imgSrc} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{tag}</p>
          </div>
        </Link>
      </button>
    </div>
  );
}

export default CourseReviewBoard;
