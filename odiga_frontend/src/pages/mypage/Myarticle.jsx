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
            <Title>{loginInfo.nickname}님이 작성한 글</Title>
            <hr/>
            {articleList ? (
                <>
                    <GridContainer style={{marginBottom: "100px"}}>
                        {articleList && Object.keys(articleList).map(articleKey => (
                            <Link to={"/detail/" + articleList[articleKey].
                                boardNo}
                                  style={{
                                      textDecoration: "none", /* 링크의 밑줄 제거 */
                                      color: "inherit"
                                  }}
                            >
                                <CardContainer key={articleKey}>
                                    <Card.Img variant="top"
                                              src={articleList[articleKey].mainImage ? articleList[articleKey].mainImage : odigaLogo}/>
                                    <LikeBadge bg="dark">
                                        <FavoriteBorderIcon
                                            sx={{fontSize: 15}}
                                        /> {articleList[articleKey].boardLikeCount}
                                    </LikeBadge>
                                    <Card.Body>
                                        <Card.Title>
                                            {articleList[articleKey].boardTitle}
                                        </Card.Title>
                                        <Card.Text>
                                            <StackContainer direction="horizontal" gap={2}>
                                                {articleList[articleKey]?.tags && articleList[articleKey].tags.split(" ").map((word, index) => (
                                                    <HashBadge bg="" key={index}>{word}</HashBadge>
                                                ))}
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
                    <Message>코스 정보가 없습니다.</Message>
                </>
            )}
        </div>

    )
        ;
}

export default Myarticle;

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

const CardContainer = styled(Card)`
  position: relative;
  width: 16rem;
  height: 23rem;
`;

const StackContainer = styled(Stack)`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
`;

const LikeBadge = styled(Badge)`
  font-size: 0.7rem; // 뱃지의 크기를 조절합니다.
  width: 3.5rem;
  position: absolute;
  top: 0.3rem;
  right: 0.3rem;
`;

const HashBadge = styled(Badge)`
  font-size: 0.6rem;
  background-color: #A9A9A9;
`;

const Message = styled.div`
  text-align: center;
  margin-top: 4rem;
  font-size: 1.2rem;
`;

