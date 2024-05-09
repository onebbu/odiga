import React, {useContext, useEffect, useState} from "react"; // React를 불러옵니다.
import styled from "styled-components";
import {LoginInfoContext} from "../login/LoginInfoProvider";
import axios from "axios";
import odigaLogo from "../../assets/images/logo/odiga-logo.png"

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

    console.log(articleList)

    return (
        <>
            <Title>회원님이 작성한 글 목록</Title>
            <GridContainer style={{marginBottom: "100px"}}>
                        {articleList && Object.keys(articleList).map(articleKey => (
                            <div key={articleKey} className="col"
                            style={{
                                maxWidth: "10rem", // 고정된 너비
                                maxHeight: "20rem", // 고정된 높이
                                width: "100%", // 너비 100%로 설정하여 이미지 비율 유지
                                height: "auto", // 높이 자동 조정
                            }}
                            >
                                <button type="button" class="card" style={{margin: "1rem"}}>
                                    <div class="badge bg-dark text-white position-absolute"
                                         style={{top: "0.5rem", right: "1rem"}}>
                                        좋아요 {articleList[articleKey].boardLikeCount}
                                    </div>
                                    <img
                                        src={articleList[articleKey].mainImage ? articleList[articleKey].mainImage : odigaLogo}
                                        class="card-img-top"
                                        alt="..."
                                        style={{
                                            maxwidth: "10rem",
                                            height: "auto",
                                            objectFit: "cover"
                                        }}
                                    />
                                    <div class="card-body">
                                        <h5 class="card-title">{articleList[articleKey].boardTitle}</h5>
                                        <p class="card-text">{articleList[articleKey].tags}</p>
                                    </div>
                                </button>
                            </div>
                        ))}
            </GridContainer>
        </>
    )
        ;
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
