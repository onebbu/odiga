import * as React from 'react';
import googleLoginIcon from "../../../assets/images/icon/google-login-icon.png";
import naverLoginIcon from "../../../assets/images/icon/naver-login-icon.png";
import kakaoLoginIcon from "../../../assets/images/icon/kakao-login-icon.png";
import {Link} from "react-router-dom";
import "./OauthLogin.css";
import {useEffect} from "react";

function OauthLoginButton() {

    useEffect(() => {
        // 현재 URL이 localhost:8080인 경우에만 창을 닫습니다.
        if (window.location.href === "http://localhost:8080/") {
            // 2초 후에 현재 창을 닫습니다. (로그인 후에 충분한 시간으로 조정 가능)
            setTimeout(() => {
                window.close(); // 현재 창을 닫음
            }, 500); // 2000 밀리초 = 2초
        }
    }, []);

    return(
        <div className="oauth-login">
            <p className="title">SNS로 로그인하기</p>
            <div className="login-button">
                <div className="google-login">
                    <Link to="http://localhost:8080/oauth2/authorization/google"><img src={googleLoginIcon}/></Link>
                </div>
                <div className="naver-login">
                    <Link to="http://localhost:8080/oauth2/authorization/naver"><img src={naverLoginIcon}/></Link>
                </div>
                <div className="kakao-login">
                    <Link to="http://localhost:8080/oauth2/authorization/kakao"><img src={kakaoLoginIcon}/></Link>
                </div>
            </div>
        </div>
    );

}

export default OauthLoginButton;