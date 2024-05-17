import React, {useContext, useEffect} from "react";
import styled from "styled-components";
import { LoginInfoContext } from "../login/LoginInfoProvider";
import {useNavigate} from "react-router-dom";

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
                        <Label>아이디</Label>
                        <Input
                            type="text"
                            id="email"
                            className="form-control"
                            placeholder={loginInfo.email}
                            style={{ width: "10rem", marginBottom: "2rem" }}
                            disabled
                        />
                        <Label>닉네임</Label>
                        <Input
                            style={{ width: "10rem", marginBottom: "2rem" }}
                            type="text"
                            id="nickname"
                            className="form-control"
                            placeholder={loginInfo.nickname}
                            disabled
                        />
                    </FormContainer>
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

const Message = styled.div`
  text-align: center;
  margin-top: 4rem;
  font-size: 1.2rem;
`;