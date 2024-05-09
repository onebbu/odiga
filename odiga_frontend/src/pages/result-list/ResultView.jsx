import * as React from 'react';
import "./ResultList.css";
import Header from "../component/navbar/Header";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import NaverMapView from "./naver-map/NaverMapView";
import ResultList from "./ResultList";
import "./ResultView.css"
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate, useParams } from "react-router-dom";

export default function ResultView() {
    const [data, setData] = useState([null]);
    const [loginInfo, setLoginInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [sharePw, setSharePw] = useState('');
    const { nickname, courseNo } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await axios.get(`/courseId/${nickname}/${courseNo}`);
                const newData = result.data;
                setData(newData);
                // 데이터를 가져온 후에 공유 비밀번호 설정
                Object.values(newData).forEach(item => {
                    setSharePw(item[0].sharePw);
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();

        return () => {
            setData([]);
            setSharePw('');
        };

    }, [nickname, courseNo]);

    useEffect(() => {
        async function fetchLoginInfo() {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        'Authorization': `${token}`
                    }
                };
                let response;
                if (token === null) {
                    console.log("oauth 로그인");
                    response = await axios.get('/auth/oauth-info');
                } else {
                    console.log("jwt 로그인");
                    response = await axios.get('/auth/jwt-info', config);
                }
                const data = response.data;
                // loginInfo 상태 업데이트
                setLoginInfo(data);
            } catch (error) {
                console.error('Failed to fetch login info:', error);
            }
        }

        fetchLoginInfo();
    }, [nickname]);

    useEffect(() => {
        // 로그인하지 않았을 경우
        if (!loginInfo && sharePw) {
            const enteredPassword = prompt('공유 비밀번호를 입력해주세요');
            if (sharePw === enteredPassword) {
                alert('올바른 비밀번호입니다!');
                // 페이지 이동 로직 추가
            } else {
                alert('비밀번호가 잘못되었습니다! 다시 입력해주세요');
                navigate('/');
            }
        }

        // loginInfo가 존재하고 해당하는 사용자의 닉네임과 nickname이 다른 경우
        if (Object.keys(loginInfo).length > 0 && loginInfo.nickname !== nickname && sharePw) {
            // 공유 비밀번호 확인 로직 실행
            const enteredPassword = prompt('공유 비밀번호를 입력해주세요');
            if (sharePw === enteredPassword) {
                alert('올바른 비밀번호입니다!');
                // 페이지 이동 로직 추가
            } else {
                alert('비밀번호가 잘못되었습니다! 다시 입력해주세요');
                navigate('/');
            }
        }
    }, [loginInfo, nickname, sharePw, navigate]);

    return (
        <>
            <Header/>
            <div className="wrapper">
                {loading ? (
                    <div className="loading-wrap">
                        <div className="loading">
                            <Spinner animation="border" style={{width: '3rem', height: '3rem'}}/>
                        </div>
                        <br/>
                        <h2>Loading...</h2>
                    </div>
                ) : (
                    <>
                        <div className="result-wrap"><ResultList data={data}/></div>
                        <div className="result-map"><NaverMapView data={data}/></div>
                    </>
                )}
            </div>
        </>
    );
}