import * as React from 'react';
import "./ResultList.css";
import Header from "../component/navbar/Header";
import {useEffect, useState} from "react";
import axios from "axios";
import NaverMapView from "./naver-map/NaverMapView";
import ResultList from "./ResultList";
import "./ResultView.css"
import Spinner from 'react-bootstrap/Spinner';
import {useParams} from "react-router-dom";

/**
 * 접근 경로 설정
 * 1. 카톡 비밀번호 입력 시 접근
 *      카톡 비밀번호 백에서 가져와야함 => 성공
 *      비밀번호가 비어있을 경우 아예 사용자만 접근 가능
 * 2. 미팅을 생성한 사용자 일 경우 인증 과정 없이 접근
 */


export default function ResultView() {
    const [data, setData] = useState([null]);
    const [loading, setLoading] = useState(true);
    const [sharePw, setSharePw] = useState(''); // sharePw 변수를 상태로 관리
    const [enteredPW, setEnteredPW] = useState('');
    let { nickname, courseNo } = useParams();


    useEffect(() => {
        async function fetchData() {
            try {
                const result = await axios.get(`/courseId/${nickname}/${courseNo}`);
                const newData = result.data; // 새로운 데이터로 업데이트할 변수
                setData(newData); // 데이터 업데이트

                const response = await axios.get(`/findSharePw/${courseNo}`);
                const newSharePw = response.data;
                setSharePw(newSharePw);


            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false); // 데이터 로딩 완료 후 로딩 상태 변경
            }
        }

        fetchData();

        // cleanup 함수에서 completed 변수 제거
        return () => {
            setData([]); // 컴포넌트가 unmount될 때 data 초기화
            setSharePw(''); // 컴포넌트가 unmount될 때 sharePw 초기화
        };

    }, []);

    useEffect(() => {
        // 페이지가 처음 로딩될 때 alert 창을 띄워 비밀번호를 입력받음
        const enteredPassword = prompt('Please enter the password to access the page:');
        setEnteredPW(enteredPassword); // 입력한 비밀번호를 상태에 저장
        handleAccessAttempt(enteredPassword); // 비밀번호 확인 함수 호출
    }, []); // 빈 의존성 배열로 설정하여 한 번만 실행

    // 비밀번호 확인 핸들러
    const handleAccessAttempt = (enteredPassword) => {
        // 사용자가 입력한 비밀번호와 저장된 비밀번호 비교
        if (sharePw === enteredPassword) { // 비밀번호가 올바른 경우
            alert('Welcome! You have access to the page.');
            // 여기에 페이지 이동 로직 등 추가
        } else { // 비밀번호가 잘못된 경우
            alert('Incorrect password. Please try again.');
            // 이전 페이지로 이동
        }
    };

    return (
        <>
            <Header/>
            <div className="wrapper">
                {loading ? (
                    <div className="loading-wrap">
                        <div className="loading">
                            <Spinner animation="border" style={{width: '3rem', height:'3rem'}}/>
                        </div>
                        <br />
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