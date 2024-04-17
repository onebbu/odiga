import React from "react"; // React를 불러옵니다.
import { Link, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import "./css/mypage.css";

import Myarticle from "./Myarticle";
import Mypage from "./Mypage";
import Mylist from "./Mylist";
import Mycourse from "./Mycourse";
import { responsiveFontSizes } from "@mui/material";

function MypageMain() {
  return (
    <>
      <Header>헤더공간</Header>

      <Container>
        <Sub_cotainer>
          <Aside>
            <Item>
              <Link className="mypageitem" to="/mypage">
                회원정보
              </Link>
            </Item>
            <Item>
              <Link className="mypageitem" to="/mypage/myarticle">
                내가 작성한 글
              </Link>
            </Item>
            <Item>
              <Link className="mypageitem" to="/mypage/mycourse">
                여행코스 조회
              </Link>
            </Item>
            <Item>
              <Link className="mypageitem" to="/mypage/mylist">
                여행 찜 목록
              </Link>
            </Item>
          </Aside>

          {/* 메인 섹션 */}
          <Section className="thirteen wide column">
            <Routes>
              <Route path="/*" element={<Mypage />}></Route>
              <Route path="/myarticle" element={<Myarticle />}></Route>
              <Route path="/mycourse" element={<Mycourse />}></Route>
              <Route path="/mylist" element={<Mylist />}></Route>
            </Routes>
          </Section>
        </Sub_cotainer>
      </Container>

      <Footer>푸터공간</Footer>
    </>
  );
}

export default MypageMain;

const Hidden = styled.div`
  visibility: hidden;
`;

const Container = styled.div`
  position: fixed;
  top: 5em;
  bottom: 5em;
  display: block;
  margin-left: auto%;
  margin-right: auto%;
  width: 100%;
  overflow: auto;
`;

const Sub_cotainer = styled.div`
  display: block;
  padding: 1%;
  margin-left: 10%;
  margin-right: 10%;
  height: 100%;
`;

const Aside = styled.aside`
  width: 20%;
  height: 100%;
  margin: auto;
  vertical-align: top;
  padding-top: 100px;
  display: inline-block;
`;

const Section = styled.section`
  display: inline-block;
  justify-content: center;
  text-align: center;
  width: 80%;
  padding-right: 20%;
`;

const Item = styled.div`
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
`;

const Header = styled.header`
  line-height: 5em;
  text-align: center;
  background-color: lightblue;
  top: 0;
  width: 100%;
  position: fixed;
`;

const Footer = styled.footer`
  line-height: 5em;
  text-align: center;
  background-color: lightblue;
  position: fixed;
  bottom: 0;
  width: 100%;
`;
