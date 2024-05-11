import React, {useContext, useEffect, useState} from "react"; // React를 불러옵니다.
import styled from "styled-components";
import axios from "axios";
import {LoginInfoContext} from "../login/LoginInfoProvider";

function Mylist() {

    const loginInfo = useContext(LoginInfoContext);

    return (
        <div style={{width: "50rem", margin: "auto"}}>
            <Title>{loginInfo.nickname}님의 여행 찜 목록</Title>
            <hr style={{marginBottom: "4rem"}}/>

        </div>
    );
}

export default Mylist;

const Title = styled.h3`
  margin-top: 4rem;
  text-align: center;
  width: 100%;
`;