import React, {useContext, useEffect, useState} from "react";
import styled from "styled-components";
import Image from 'react-bootstrap/Image';
import axios from "axios";
import {LoginInfoContext} from "../login/LoginInfoProvider";
import {Link} from "react-router-dom";
import Card from 'react-bootstrap/Card';

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
        <div style={{width: "50rem", margin: "auto"}}>
            <Title>{loginInfo.nickname}님의 여행지 좋아요 목록</Title>
            <hr/>
            <GridContainer>

                {likeInfo && Object.keys(likeInfo).length > 0 ? (
                    Object.keys(likeInfo).map((courseKey) => (
                        <Link to={`/detail/${likeInfo[courseKey].contentId}`}>
                            <Card className="bg-dark text-white" key={{courseKey}}>
                                <LocationImage src={likeInfo[courseKey].img} alt={likeInfo[courseKey].title}/>
                                <Card.ImgOverlay>
                                    <LikeTitle>{likeInfo[courseKey].title}</LikeTitle>
                                    <LikeAddr>
                                        {likeInfo[courseKey].addr}
                                    </LikeAddr>
                                </Card.ImgOverlay>
                            </Card>
                        </Link>
                    ))
                    ) : (
                    <Message>좋아요한 여행지가 없습니다.</Message>
                    )}
            </GridContainer>
        </div>
    );
}

export default MyLikeList;


const Title = styled.h3`
  margin-top: 4rem;
  text-align: center;
  width: 100%;
`;

const GridContainer = styled.div`
  margin-top: 4rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

const LocationImage = styled(Card.Img)`
  width: 16rem;
  height: 10rem;
  object-fit: cover;
  opacity: 0.85;
  background-color: #f4f4f4;
`;

const LikeTitle = styled(Card.Title)`
  font-size: 14px;
  position: absolute;
  bottom: 8px;
  left: 1px;
`;

const LikeAddr = styled(Card.Text)`
  font-size: 10px;
  position: absolute;
  bottom: 0;
  left: 1px;
`;


const Message = styled.div`
  width: 50rem;
  margin: auto;
  text-align: center;
  font-size: 1.2rem;
`;