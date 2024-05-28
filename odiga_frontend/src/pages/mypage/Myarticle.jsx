import React, {useContext, useEffect, useState} from "react"; // React를 불러옵니다.
import styled from "styled-components";
import {LoginInfoContext} from "../login/LoginInfoProvider";
import axios from "axios";
import odigaLogo from "../../assets/images/logo/odiga-logo.png"
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import {Link} from "react-router-dom";
import Stack from 'react-bootstrap/Stack';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function Myarticle() {

    const loginInfo = useContext(LoginInfoContext);
    const [articleList, setArticleList] = useState();


    useEffect(() => {
        if (loginInfo) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`/my-page/my-article/` + loginInfo.nickname);
                    setArticleList(response.data);
                } catch (error) {
                    console.error('사용자 게시글 가져오기 실패:', error);
                }
            };

            fetchData(); // 함수 호출
        }
    }, [loginInfo]); // loginInfo가 변경될 때마다 실행

    console.log(articleList);

    return (
        <div style={{width: "50rem", margin: "auto"}}>
            <Title>{loginInfo.nickname}님이 작성한 여행코스 후기</Title>
            <hr/>
            {articleList && Object.keys(articleList).length > 0 ? (
                <>
                    <GridContainer style={{marginBottom: "100px"}}>
                        {articleList && Object.keys(articleList).map(articleKey => (
                            <Link to={"/coursereview/detail/" + articleList[articleKey].
                                boardNo}
                                  style={{
                                      textDecoration: "none", /* 링크의 밑줄 제거 */
                                      color: "inherit"
                                  }}
                            >
                                <CardContainer key={articleKey}>
                                    <Card.Img variant="top"
                                              src={articleList[articleKey].mainImage ? articleList[articleKey].mainImage : odigaLogo}
                                    style={{
                                        width: "16rem",
                                        height: "8rem",
                                        objectFit: "cover"
                                    }} />
                                    <LikeBadge bg="dark">
                                        <FavoriteBorderIcon
                                            sx={{fontSize: 15}}
                                        /> {articleList[articleKey].boardLikeCount}
                                    </LikeBadge>
                                    <Card.Body>
                                        <Card.Title>
                                            <p
                                                style={{
                                                    fontFamily: "JalnanGothic",
                                                    fontSize: "18px"
                                                }}>{articleList[articleKey].boardTitle}</p>
                                        </Card.Title>
                                        <Card.Text>
                                            <StackContainer direction="horizontal" gap={2}>
                                                {articleList[articleKey]?.tags ? articleList[articleKey].tags.split("#").slice(1, 5).map((word, index) => (
                                                    <HashBadge bg="" key={index}>
                                                        #{word}
                                                    </HashBadge>
                                                )) :  <HashBadge>#태그없음</HashBadge>}
                                            </StackContainer>
                                        </Card.Text>
                                    </Card.Body>
                                </CardContainer>
                            </Link>
                        ))}
                    </GridContainer>
                </>
            ) :(
                <>
                    <Message>작성한 글이 없습니다.</Message>
                </>
            )}
        </div>
    );
}

export default Myarticle;

const Title = styled.h3`
  margin-top: 4rem;
  text-align: center;
  width: 100%;
  font-family: JalnanGothic;
  font-size: 25px;
`;

const GridContainer = styled.div`
  margin-top: 4rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

const CardContainer = styled(Card)`
  position: relative;
  width: 16rem;
  height: 16rem;
  background-color: #f4f4f4;
`;

const StackContainer = styled(Stack)`
  position: absolute;
  bottom: 10px;
  //left: 50%;
  //transform: translateX(-50%);
`;

const LikeBadge = styled(Badge)`
  font-size: 0.7rem; // 뱃지의 크기를 조절합니다.
  width: 3.5rem;
  position: absolute;
  top: 0.3rem;
  right: 0.3rem;
`;

const HashBadge = styled.strong`
  font-size: 60%;
  font-family: "GmarketSansMedium";
  font-weight: 300;
  padding: 0.25em 0.5em;
  border-radius: 8px;
  text-align: right;
  color: white;
  background-color: grey;
`;


const Message = styled.div`
  text-align: center;
  margin-top: 4rem;
  font-size: 1.2rem;
  font-family: JalnanGothic;
  font-size: 18px;
`;

