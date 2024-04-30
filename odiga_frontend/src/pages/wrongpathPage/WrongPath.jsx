import React from "react";
import styled from "styled-components";
import { useParams, Link } from 'react-router-dom';

const Wrapper = styled.div`
    position : fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
`
const P = styled.p`
    font-size : 35px;
`

const Buttondesign = styled.div`
    background-color: #549C9B;  color: white;  border: none;  padding: 8px 15px;
  font-size: 15px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}
`
const PathName = [ //여기에 Name 추가하여 화면에 다음 경로 이름 뜨게 할 수 있음
    {nextPath : "preference" , pathName : "여행지 선호도 조사"}
]

function WrongPathPage() {
    let { nextPath } = useParams();
    return(
        <Wrapper>
            <P> 올바른 경로가 아닙니다. </P>
            {/* Link 컴포넌트를 사용하여 버튼 클릭 시 다른 페이지로 이동합니다. */}
            <P>돌아갈 페이지: {PathName.map(item => (nextPath === item.nextPath ? item.pathName : null))}</P>
            <Link to={`/${nextPath}`}>
                <Buttondesign className="buttondesign"> 돌아가기 </Buttondesign>
            </Link>
        </Wrapper>
    )
}

export default WrongPathPage;