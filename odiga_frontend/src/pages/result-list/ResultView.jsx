import * as React from 'react';
import "./ResultList.css";
import Header from "../component/navbar/Header";
import {useContext, useEffect, useRef, useState} from "react";
import axios from "axios";
import NaverMapView from "./naver-map/NaverMapView";
import ResultList from "./ResultList";
import "./ResultView.css"
import Spinner from 'react-bootstrap/Spinner';
import {useNavigate, useParams} from "react-router-dom";
import {LoginInfoContext} from "../login/LoginInfoProvider";

/**
 * 접근 경로 설정
 * 1. 카톡 비밀번호 입력 시 접근
 *      카톡 비밀번호 백에서 가져와야함 => 성공
 *      비밀번호가 비어있을 경우 아예 사용자만 접근 가능
 * 2. 미팅을 생성한 사용자 일 경우 인증 과정 없이 접근
 * 3. 로그인하지 않은 사용자의 경우 카톡 비밀번호만 입력하고 접근!!
 *      -> 에러! 로그인하지 않았을경우 로그인창으로 이동해버리는 문제 발생
 */


export default function ResultView() {

    // 로그인 정보 가져오기
    const loginInfo = useContext(LoginInfoContext);

    // 기타 조회 정보 가져오기
    const [data, setData] = useState([null]);
    const [loading, setLoading] = useState(true);
    const [sharePw, setSharePw] = useState(''); // sharePw 변수를 상태로 관리
    const [enteredPW, setEnteredPW] = useState('');
    let {nickname, courseNo} = useParams();
    const prevEnteredPassword = useRef(null);

    const navigate = useNavigate();

    // http://localhost:3000/result-list/odiga/odiga_3
    // qwerqwer

    // http://localhost:3000/result-list/odiga/odiga_5
    // aaaaaaaaaaaaaaaaa


    useEffect(() => {
        async function findPw() {
            try {
                const response = await axios.get(`/findSharePw/${courseNo}`);
                const newSharePw = response.data;
                setSharePw(newSharePw);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false); // 데이터 로딩 완료 후 로딩 상태 변경
            }
        }


        findPw();
    }, []);


    // url파라미터의 닉네임과 로그인된 닉네임이 같을 경우 로직 x
    useEffect(() => {
        if (loginInfo.nickname === nickname) {
        }

        if (sharePw && loginInfo.nickname !== nickname && prevEnteredPassword.current !== sharePw) {
            const enteredPassword = prompt('공유 비밀번호를 입력해주세요');
            setEnteredPW(enteredPassword);
            prevEnteredPassword.current = sharePw;

            if (sharePw === enteredPassword) {
                alert('올바른 비밀번호 입니다!');
                // 여기에 페이지 이동 로직 등 추가
            } else {
                alert('비밀번호가 잘못되었습니다! 다시 입력해주세요');
                navigate('/');
            }
        }
    }, [nickname, loginInfo, sharePw, setEnteredPW]);

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await axios.get(`/courseId/${nickname}/${courseNo}`);
                const newData = result.data; // 새로운 데이터로 업데이트할 변수
                setData(newData); // 데이터 업데이트

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


    return (
        <>
            <div>
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
            </div>
        </>
    );
}