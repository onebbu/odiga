import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const LoginInfoContext = createContext(); // createContext를 사용하여 컨텍스트를 생성

const LoginInfoProvider = ({ children }) => {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        nickname: '',
        role: '',
        registrationId: ''
    });

    useEffect(() => {
        const fetchLoginInfo = async () => {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': `${token}`
                }
            };

            try {
                let response, data;
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
                    // console.log(data);
                }
            } catch (error) {
                console.error('Failed to fetch login info:', error);
            }
        };

        fetchLoginInfo();
    }, []);

    console.log(loginInfo);

    // LoginInfoContext.Provider를 사용하여 컨텍스트 값을 제공
    return (
        <LoginInfoContext.Provider value={loginInfo}>
            {children}
        </LoginInfoContext.Provider>
    );
};

export default LoginInfoProvider;