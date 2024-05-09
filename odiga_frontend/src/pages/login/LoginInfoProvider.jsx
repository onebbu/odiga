import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

export const LoginInfoContext = createContext(); // createContext를 사용하여 컨텍스트를 생성

const LoginInfoProvider = ({children}) => {
    const [loginInfo, setLoginInfo] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        // 헤더에서 토큰 정보 가져오기
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `${token}`
            }
        };
        const fetchLoginInfo = async () => {

            var response;
            var data;

            try {
                // 엔드포인트로 GET 요청을 보냅니다.
                if (token == null) {
                    console.log("oauth 로그인")
                    response = await axios.get('/auth/oauth-info');
                    data = response.data;
                    setLoginInfo(data);
                    console.log(data);
                } else {
                    console.log("jwt 로그인")
                    response = await axios.get('/auth/jwt-info', config);
                    data = response.data;
                    setLoginInfo(data);
                    console.log(data);
                }
                // 응답에서 데이터를 추출합니다.
                // 가져온 데이터를 상태에 설정합니다.
            } catch (error) {
                console.error('Failed to fetch login info:', error);
            }
        };

        // 컴포넌트가 마운트될 때 한 번 호출합니다.
        fetchLoginInfo();
    }, []); // 빈 배열을 전달하여 한 번만 호출되도록 설정합니다.


    console.log("LoginInfoContext", loginInfo);

    // LoginInfoContext.Provider를 사용하여 컨텍스트 값을 제공
    return (
        <LoginInfoContext.Provider value={loginInfo}>
            {children}
        </LoginInfoContext.Provider>
    );
};

export default LoginInfoProvider;