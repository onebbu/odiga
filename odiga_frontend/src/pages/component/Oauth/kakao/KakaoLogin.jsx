import "./KakaoLogin.css";
import React from "react";

const KakaoLoginButton = ()=>
{
    const Rest_api_key=process.env.REACT_APP_KAKAO_AUTH_REST_API_KEY //REST API KEY
    const redirect_uri = 'http://localhost:3000/auth' //Redirect URI
    // oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
    const handleLogin = ()=>{
        window.location.href = kakaoURL
    }
    return (
        <div className="kakao-login">
            <button onClick={handleLogin}>
                <img src="img/kakao-login-icon.png"/>
            </button>
        </div>
    );

}
export default KakaoLoginButton
