import React from "react"; // React를 불러옵니다.
import styled from "styled-components";

function Mycourse() {
    
  //   코스 리스트 axios로 쭉 가져오기
  //   정리해서 리턴에 뿌리기
    
  return (
    <div>
      <Title>회원님의 여행코스</Title>

    </div>
  );
}

export default Mycourse;

const Title = styled.h4`
  margin-top: 4rem;
  text-align: center;
  width: 100%;
  margin-bottom: 4rem;
`;