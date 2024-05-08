import React from "react"; // React를 불러옵니다.
import styled from "styled-components";

function Myarticle() {
  return (
    <>
      <Title>회원님이 작성한 글 목록</Title>

      <GridContainer style={{marginBottom: "100px"}}>
        <div class="col">
          <button type="button" class="card" style={{margin: "1rem"}}>
            <div class="badge bg-dark text-white position-absolute" style={{top: "0.5rem", right: "1rem"}}>
              좋아요 3
            </div>
            <img
              src="https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=83b17026-0ae3-4bce-8a07-6733c29f7752"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">제목 쓰는 공간</h5>
              <p class="card-text">#태그자리</p>
            </div>
          </button>
        </div>

        <div class="col">
          <button type="button" class="card" style={{margin: "1rem"}}>
            <div class="badge bg-dark text-white position-absolute" style={{top: "0.5rem", right: "1rem"}}>
              좋아요 3
            </div>
            <img
              src="https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=83b17026-0ae3-4bce-8a07-6733c29f7752"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">제목 쓰는 공간</h5>
              <p class="card-text">#태그자리</p>
            </div>
          </button>
        </div>

        <div class="col">
          <button type="button" class="card" style={{margin: "1rem"}}>
            <div class="badge bg-dark text-white position-absolute" style={{top: "0.5rem", right: "1rem"}}>
              좋아요 3
            </div>
            <img
              src="https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=83b17026-0ae3-4bce-8a07-6733c29f7752"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">제목 쓰는 공간</h5>
              <p class="card-text">#태그자리</p>
            </div>
          </button>
        </div>

        <div class="col">
          <button type="button" class="card" style={{margin: "1rem"}}>
            <div class="badge bg-dark text-white position-absolute" style={{top: "0.5rem", right: "1rem"}}>
              좋아요 3
            </div>
            <img
              src="https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=83b17026-0ae3-4bce-8a07-6733c29f7752"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">제목 쓰는 공간</h5>
              <p class="card-text">#태그자리</p>
            </div>
          </button>
        </div>

        <div class="col">
          <button type="button" class="card" style={{margin: "1rem"}}>
            <div class="badge bg-dark text-white position-absolute" style={{top: "0.5rem", right: "1rem"}}>
              좋아요 3
            </div>
            <img
              src="https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=83b17026-0ae3-4bce-8a07-6733c29f7752"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">제목 쓰는 공간</h5>
              <p class="card-text">#태그자리</p>
            </div>
          </button>
        </div>

        <div class="col">
          <button type="button" class="card" style={{margin: "1rem"}}>
            <div class="badge bg-dark text-white position-absolute" style={{top: "0.5rem", right: "1rem"}}>
              좋아요 3
            </div>
            <img
              src="https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=83b17026-0ae3-4bce-8a07-6733c29f7752"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">제목 쓰는 공간</h5>
              <p class="card-text">#태그자리</p>
            </div>
          </button>
        </div>
      </GridContainer>
    </>
  );
}

export default Myarticle;

const Title = styled.h4`
  margin-top: 4rem;
  text-align: center;
  width: 100%;
  margin-bottom: 1rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
`;
