import React, {useContext, useEffect, useState} from "react"; // React를 불러옵니다.
import styled from "styled-components";
import {LoginInfoContext} from "../login/LoginInfoProvider";

const MyPage = () => {
    const loginInfo = useContext(LoginInfoContext);

    return (
        <div
            style={{marginTop: "4rem"}}>
            <Title>회원 정보 조회</Title>
            <div className="ui hidden divider"/>
            <FormContainer>
                <Label>아이디</Label>
                <Input
                    type="text"
                    id="email"
                    className="form-control"
                    placeholder={loginInfo.email}
                    style={{width: "10rem", marginBottom: "2rem"}}
                    disabled
                />
                <Label>닉네임</Label>
                <Input
                    style={{width: "10rem", marginBottom: "2rem"}}
                    type="text"
                    id="nickname"
                    className="form-control"
                    placeholder={loginInfo.nickname}
                    disabled
                />
                <Label>비밀번호</Label>
                <Input
                    style={{width: "10rem", marginBottom: "2rem"}}
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="현재 비밀번호"
                />
                <Label>변경할 비밀번호</Label>
                <Input
                    style={{width: "10rem", marginBottom: "2rem"}}
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="변경할 비밀번호"
                />
                <Label>변경 비밀번호 확인</Label>
                <Input
                    style={{width: "10rem", marginBottom: "2rem"}}
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="변경할 비밀번호"
                />
            </FormContainer>

            <ButtonContainer>
                <button className="btn btn-primary" type="submit">
                    수정
                </button>
            </ButtonContainer>
        </div>
    );
}

export default MyPage;

const Title = styled.h4`
  text-align: center;
  width: 100%;
  margin-bottom: 4rem;
`;

const FormContainer = styled.div`
  text-align: left;
  width: 85%;
  display: block;
  margin-bottom: 40px;
  margin-left: 10%;
`;

const Label = styled.label`
  width: 50%;
  display: inline-block;
  text-align: center;
  font-size: 14px;
`;

const Input = styled.input`
  width: 30%;
  display: inline-block;
  font-size: 12px;
  max-width: 250px;
`;

const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 70px;
`;
