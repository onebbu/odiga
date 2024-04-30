// 로그인 화면
import React from "react";
import "./NaverLoginButton.css";

const NaverLoginButton = () => {
    const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_AUTH_CLIENT_ID;
    const REDIRECT_URI = "http://localhost:3000/oauth";
    const STATE = "false";
    const NAVER_AUTH_URL = `http://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;

    const NaverLogin = () => {
        window.location.href = NAVER_AUTH_URL;
    };

    return(
        <div className="naver-login">
            <button onClick={NaverLogin}>
                <img src="img/naver-login-icon.png"/>
            </button>
        </div>
    );

};

export default NaverLoginButton;