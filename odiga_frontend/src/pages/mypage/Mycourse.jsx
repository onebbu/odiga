import React from "react"; // React를 불러옵니다.
import styled from "styled-components";

function Mycourse() {
  return (
    <div>
      <Title>회원님의 여행코스</Title>

    </div>
  );
}

export default Mycourse;

const Title = styled.h4`
  text-align: center;
  width: 100%;
  margin-bottom: 4rem;
`;