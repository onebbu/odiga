import * as React from 'react';
import googleLoginIcon from "../../../assets/images/icon/google-login-icon.png";
import naverLoginIcon from "../../../assets/images/icon/naver-login-icon.png";
import kakaoLoginIcon from "../../../assets/images/icon/kakao-login-icon.png";
import {Link} from "react-router-dom";
import "./OauthLogin.css";

function OauthLoginButton() {

    return(
        <div className="oauth-login">
            <p className="title">SNS로 로그인하기</p>
            <div className="login-button">
                <div className="google-login">
                    <Link to="http://localhost:8080/oauth2/authorization/google" target="_blank"><img src={googleLoginIcon}/></Link>
                </div>
                <div className="naver-login">
                    <Link to="http://localhost:8080/oauth2/authorization/naver" target="_blank"><img src={naverLoginIcon}/></Link>
                </div>
                <div className="kakao-login">
                    <Link to="http://localhost:8080/oauth2/authorization/kakao" target="_blank"><img src={kakaoLoginIcon}/></Link>
                </div>
            </div>
        </div>
    );

}

export default OauthLoginButton;