import * as React from 'react';
import googleLoginIcon from "../../../assets/images/icon/google-login-icon.png";
import naverLoginIcon from "../../../assets/images/icon/naver-login-icon.png";
import kakaoLoginIcon from "../../../assets/images/icon/kakao-login-icon.png";
import {Link} from "react-router-dom";
import "./OauthLogin.css";
import {useEffect} from "react";

function OauthLoginButton() {



    return(
        <div className="oauth-login">
            <p className="title">SNS로 로그인하기</p>
            <div className="login-button">
                <div className="google-login">
                    <Link to={`${process.env.REACT_APP_SERVER_ADDRESS}/oauth2/authorization/google`}><img src={googleLoginIcon}/></Link>
                </div>
                <div className="naver-login">
                    <Link to={`${process.env.REACT_APP_SERVER_ADDRESS}/oauth2/authorization/naver`}><img src={naverLoginIcon}/></Link>
                </div>
                <div className="kakao-login">
                    <Link to={`${process.env.REACT_APP_SERVER_ADDRESS}/oauth2/authorization/kakao`}><img src={kakaoLoginIcon}/></Link>
                </div>
            </div>
        </div>
    );

}

export default OauthLoginButton;