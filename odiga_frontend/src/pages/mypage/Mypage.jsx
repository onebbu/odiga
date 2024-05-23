import React, {useContext, useEffect} from "react";
import styled from "styled-components";
import { LoginInfoContext } from "../login/LoginInfoProvider";
import {useNavigate} from "react-router-dom";
import {Input} from "@mui/material";

const MyPage = () => {
    const loginInfo = useContext(LoginInfoContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loginInfo) {
            alert("로그인 정보를 찾을 수 없습니다.")
            navigate("/login")
        }
    }, [loginInfo]);

    return (
        <div style={{ width: "50rem", margin: "auto" }}>
            <Title>회원 정보 조회</Title>
            {loginInfo ? (
                <>
                    <hr style={{ marginBottom: "4rem" }} />
                    <FormContainer>
                        <Label>이메일 아이디</Label>
                        <Label>{loginInfo.email}</Label>
                        <Label>닉네임</Label>
                        <Label>{loginInfo.nickname}</Label>
                        <Label>현재 비밀번호</Label>
                        <InputContainer>
                            <InputBox
                                type="password"
                                id="password"
                                className="form-control"
                                placeholder="현재 비밀번호"
                            />
                        </InputContainer>
                        <Label>변경할 비밀번호</Label>
                        <InputContainer>
                            <InputBox
                                type="password"
                                id="new-password"
                                className="form-control"
                                placeholder="변경할 비밀번호"
                            />
                        </InputContainer>
                        <Label>변경 비밀번호 확인</Label>
                        <InputContainer>
                            <InputBox
                                type="password"
                                id="confirm-new-password"
                                className="form-control"
                                placeholder="변경할 비밀번호 확인"
                            />
                        </InputContainer>
                    </FormContainer>
                    <button className="btn btn-primary" type="submit">
                        수정
                    </button>
                </>
            ) : (
                <Message>로그인 정보가 없습니다.</Message>
            )}
        </div>
    );
};

export default MyPage;

const Title = styled.h3`
  margin-top: 4rem;
  text-align: center;
  width: 100%;
  font-family: JalnanGothic;
  font-size: 25px;
`;

const FormContainer = styled.div`
  text-align: left;
  width: 70%;
  display: block;
  margin-bottom: 40px;
  margin-left: 10%;
`;

const Label = styled.label`
  width: 50%;
  display: inline-block;
  text-align: center;
  font-size: 14px;
  margin-bottom: 1rem;
  font-family: JalnanGothic;
  font-size: 18px;
  margin-bottom: 1rem;
`;

const InputContainer = styled.div`
  display: inline-block;
  margin-bottom: 1rem;
`;

const InputBox = styled.input`
  width: 15rem;
`

const Message = styled.div`
  text-align: center;
  margin-top: 4rem;
  font-size: 1.2rem;
  font-family: JalnanGothic;
  font-size: 18px;
`;