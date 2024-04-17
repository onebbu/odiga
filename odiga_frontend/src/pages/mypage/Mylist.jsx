import React from "react"; // React를 불러옵니다.
import styled from "styled-components";

function Mylist() {
  return (
    <div>
      <Title>회원님의 여행 찜 목록</Title>

    </div>
  );
}

export default Mylist;

const Title = styled.h4`
  text-align: center;
  width: 100%;
  margin-bottom: 4rem;
`;