import React from 'react';
// import google from 'img/google-login-icon.png';  //사용하려는 커스텀 이미지
// import Cookies from "js-cookie";
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./GoogleLogin.css"


const GoogleLoginButton = () => {
    // const signIn = useGoogleLogin({
    //     onSuccess: (res) => {
    //         axios.post('http://localhost:8080/auth/login', {
    //             access_token: res.access_token,
    //         })
    //             .then(response => {
    //                 Cookies.set('accessToken', response.data.token);
    //                 console.log(response);
    //             })
    //             .catch(error => {
    //                 console.log(error);
    //             });
    //     },
    //     onError: (error) =>{ console.log(error);}
    // });

    return (
        <div className="google-login">
            <button
                // onClick={() => signIn()}
            >
                <img src="img/google-login-icon.png"
                     // alt="Login with Google"
                    // style={{ cursor: 'pointer' }}
                />
            </button>
        </div>
    );
};

const GoogleLogin = () => {
    const clientId = 'GCP 프로젝트에서 가져온 clientId(env로 따로 관리하는 게 좋을 듯!)';

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <GoogleLoginButton />
        </GoogleOAuthProvider>
    );
};

export default GoogleLogin;