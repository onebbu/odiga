import {useEffect, useState} from "react";
import axios from "axios";



function handleLogout() {

    const fetchLogout = async () => {
        try {
            // jwt 로그아웃의 경우(세션 토큰 삭제)
            sessionStorage.removeItem('token');

            // oauth 로그아웃의 경우
            // /auth/logout 엔드포인트로 POST 요청(SecurityConfig 삭제 요청)
            await axios.post('/api/auth/logout')

            // 로그아웃 후 로직
            window.location.href = '/login';
        } catch (error) {
            console.error('로그아웃 실패:', error);
        }
    };

    fetchLogout();
}

function Logout() {


    return (
        <div>
            <button className="login-link" style={{ marginRight: '15px' }} onClick={handleLogout}>
                로그아웃
            </button>
        </div>
    );
}

export default Logout;