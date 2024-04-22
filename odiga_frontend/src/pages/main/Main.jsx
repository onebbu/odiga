<<<<<<< Updated upstream
import React, {useEffect, useState} from "react";
import axios from "axios";


/**
 * 로컬 스토리지에 있는 토큰 정보 가져오기
 * axios로 토큰 정보와 함께 get 요청 보내기
 * 백으로 보내서 메인 페이지 호출 및 닉네임 정보 보여주기
 *
 *
 */
=======
import * as React from 'react';
import Header from "../tiles/Header";
import Banner from "./Banner";
import KoreaLocations from "./KoreaLocations";
import MainContents from "./MainContents";
>>>>>>> Stashed changes

function Main() {
    const [member, setMember] = useState(null);

    useEffect(() => {
        // 함수 컴포넌트가 처음 렌더링될 때 한 번만 실행됩니다.
        const fetchData = async () => {
            try {
                // 서버의 엔드포인트 URL
                const API_URL = 'http://localhost:8080';

                // 로컬 스토리지에서 토큰 가져오기
                const token = localStorage.getItem('token');

                // axios 인스턴스 생성
                const axiosInstance = axios.create({
                    baseURL: API_URL,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // 토큰을 헤더에 포함
                    },
                });

                // GET 요청 보내고 응답 받기
                const response = await axiosInstance.get('/auth/');

                // 응답 데이터 처리
                console.log('응답 데이터:', response.data.nickname);
                setMember(response.data);
            } catch (error) {
                // 오류 처리
                console.error('에러:', error);
            }
        };

        fetchData(); // fetchData 함수를 호출하여 데이터를 가져옵니다.
    }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 실행되도록 설정합니다.


    return(
        <body>
        <div>
<<<<<<< Updated upstream
            메인페이지입니다.
            <br />
            {member && member.nickname && (
                <div>안녕하세요 {member.nickname} 님</div>
            )}
=======
            <Header/>
            <Banner/>
            <KoreaLocations/>
            <MainContents/>
>>>>>>> Stashed changes
        </div>
        </body>
    )
}

export default Main;