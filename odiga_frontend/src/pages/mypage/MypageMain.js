import React, {useContext, useEffect, useState} from "react"; // React를 불러옵니다.
import { Link, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import "./css/mypage.css";
import Myarticle from "./Myarticle";
import Mypage from "./Mypage";
import Mylist from "./Mylist";
import Mycourse from "./Mycourse";
import Header from "../component/navbar/Header";
import LoginInfoProvider, {LoginInfoContext} from "../login/LoginInfoProvider";
import Footer from '../component/footer/Footer';


function MypageMain() {
  const loginInfo = useContext(LoginInfoContext);
  return (
    <>
      <Header />

      <Container>
        <Sub_cotainer>
          <Aside>
            <Item>
              <Link className="mypageitem" to="/my-page">
                회원정보
              </Link>
            </Item>
            <Item>
              <Link className="mypageitem" to="/my-page/my-article">
                내가 작성한 글
              </Link>
            </Item>
            <Item>
              <Link className="mypageitem" to="/my-page/my-course">
                여행코스 조회
              </Link>
            </Item>
            <Item>
              <Link className="mypageitem" to="/my-page/my-list">
                여행 찜 목록
              </Link>
            </Item>
          </Aside>

          {/* 메인 섹션 */}
          <Section className="thirteen wide column">
              <Routes>
                <Route path="/*" element={<Mypage />}></Route>
                <Route path="/my-article" element={<Myarticle />}></Route>
                <Route path="/my-course" element={<Mycourse />}></Route>
                <Route path="/my-list" element={<Mylist />}></Route>
              </Routes>
          </Section>
        </Sub_cotainer>
      </Container>

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
  //margin-left: auto%;
  //margin-right: auto%;
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
  padding-left: 15%;
  padding-right: 15%;
`;

const Item = styled.div`
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
`;