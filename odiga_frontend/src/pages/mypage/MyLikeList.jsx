import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Image from 'react-bootstrap/Image';
import axios from "axios";
import { LoginInfoContext } from "../login/LoginInfoProvider";

function MyLikeList() {

    const loginInfo = useContext(LoginInfoContext);
    const [likeInfo, setLikeInfo] = useState();

    useEffect(() => {
        if (loginInfo) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`/mypage/mylike/` + loginInfo.nickname);
                    setLikeInfo(response.data);
                } catch (error) {
                    console.error('좋아요 목록 가져오기 실패:', error);
                }
            };

            console.log(likeInfo)
            fetchData(); // 함수 호출
        }
    }, [loginInfo]); // loginInfo가 변경될 때마다 실행


    return (
        <Container>
            <Title>{loginInfo.nickname}님의 여행지 좋아요 목록</Title>
            <hr style={{marginBottom: "4rem"}}/>
            <GridContainer>
                {likeInfo ? (
                    Object.keys(likeInfo).map((courseKey) => (
                        <div key={courseKey}>
                            <LocationImage src={likeInfo[courseKey].img} rounded/>
                                {likeInfo[courseKey].title}
                                <P>{likeInfo[courseKey].addr}</P>
                        </div>
                    ))
                ) : (
                    <Message>좋아요한 여행지가 없습니다.</Message>
                )}
            </GridContainer>
        </Container>
    );
}

export default MyLikeList;

const Container = styled.div`
  width: 50rem;
  margin: auto;
`;

const Title = styled.h3`
  margin-top: 4rem;
  text-align: center;
  width: 50rem;
`;

const Message = styled.div`
  text-align: center;
  font-size: 1.2rem;
`;

const GridContainer = styled.div`
  margin-top: 4rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

const LocationImage = styled(Image)`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const P = styled.div`
  font-size: 10px;
  color: #909090;
`;