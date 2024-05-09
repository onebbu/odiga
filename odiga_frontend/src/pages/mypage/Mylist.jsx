import React, {useContext, useEffect, useState} from "react"; // React를 불러옵니다.
import styled from "styled-components";
import axios from "axios";
import {LoginInfoContext} from "../login/LoginInfoProvider";

function Mylist() {



    return (
        <div>
            <Title>회원님의 여행 찜 목록</Title>

        </div>
    );
}

export default Mylist;

const Title = styled.h4`
  margin-top: 4rem;
  text-align: center;
  width: 100%;
  margin-bottom: 4rem;
`;