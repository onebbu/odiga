import React, {useContext, useEffect} from "react";
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import styled from "styled-components";
import "./css/mypage.css";
import Myarticle from "./Myarticle";
import Mypage from "./Mypage";
import MyLikeList from "./MyLikeList";
import Mycourse from "./Mycourse";
import {LoginInfoContext} from "../login/LoginInfoProvider";

function MypageMain() {
  const loginInfo = useContext(LoginInfoContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginInfo) {
      alert("로그인 정보를 찾을 수 없습니다.")
      navigate("/login")
    }
  }, [loginInfo]);

  return (
      <>
      
        <Container>
          <Sub_cotainer>
            <Aside>
              <Item>
                <MypageLink className="mypageitem" to="/my-page">
                  회원 정보
                </MypageLink>
              </Item>
              <Item>
                <MypageLink className="mypageitem" to="/my-page/my-article">
                  여행코스 후기
                </MypageLink>
              </Item>
              <Item>
                <MypageLink className="mypageitem" to="/my-page/my-course">
                  여행 코스
                </MypageLink>
              </Item>
              <Item>
                <MypageLink className="mypageitem" to="/my-page/my-like-list">
                  여행지 좋아요
                </MypageLink>
              </Item>
            </Aside>

            {/* 메인 섹션 */}
            <Section className="thirteen wide column">
              <Routes>
                <Route path="/*" element={<Mypage/>}></Route>
                <Route path="/my-article" element={<Myarticle/>}></Route>
                <Route path="/my-course" element={<Mycourse/>}></Route>
                <Route path="/my-like-list" element={<MyLikeList/>}></Route>
              </Routes>
            </Section>
          </Sub_cotainer>
        </Container>
      </>
  )
      ;
}

export default MypageMain;


const Container = styled.div`
  margin-bottom: 5em;
  width: 100%;
  min-height: 75vh;
  background-color: #f3f4f6;
  //overflow: auto;
`;

const Sub_cotainer = styled.div`
  margin-top: 5rem;
  padding: 1%;
  height: 100%;
  width: 100%;
`;

const Aside = styled.aside`
  height: 100%;
  margin: auto;
  width: 20%;
  vertical-align: top;
  padding-top: 15rem;
  padding-left: 5rem;
  display: inline-block;
`;

const Section = styled.section`
  display: inline-block;
  justify-content: center;
  text-align: center;
  padding-left: 5rem;
  padding-right: 5rem;
  width: 80%;
`;

const Item = styled.div`
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
`;

const MypageLink = styled(Link)`
  font-family: 'JalnanGothic'; // 원하는 글꼴을 여기에 지정합니다.
  font-size: 18px;
`;