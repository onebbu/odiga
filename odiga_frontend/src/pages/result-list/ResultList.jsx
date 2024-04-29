import * as React from 'react';
import "./ResultList.css";
import Header from "../tiles/Header";
import {useEffect, useState} from "react";
import axios from "axios";
import NaverMapView from "./naver-map/NaverMapView";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';


// http://localhost:3000/result-list
export default function ResultList() {
    const [data, setData] = useState([]);


    useEffect(() => {
        async function fetchData() {
            try {
                const result = await axios.get(`/courseId/odiga_3`);
                setData(result.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();

        // cleanup 함수에서 completed 변수 제거
        return () => {
            setData(""); // 컴포넌트가 unmount될 때 data 초기화
        };
    }, []);
    // }, [query, data]); // query와 data를 의존성 배열에 추가

    // data가 비어있는 경우를 처리하기 위해 조건부 렌더링
    if (data === null || Object.keys(data).length === 0) {
        console.log("현재 로딩 중...");
        return (
            <div>
                <h1>
                    로딩 중 입니다...
                </h1>
            </div>
        ); // 데이터가 없으면 아무것도 렌더링하지 않음
    }

    const dateRangeDetails = data["24년 04월 22일 ~ 24년 04월 25일"];


    return (
        <div className="wrapper">
            <div className="result-wrap">
                {Object.keys(data).map(dateKey => (
                    <div key={dateKey}>
                        <div className="result-plan">
                            <h6>{dateKey}</h6>
                            {/*{data[dateKey]}*/}
                        </div>
                        {/*일정*/}
                        <hr/>
                        {/*여행지 결과*/}
                        <div className="result-detail">
                            {
                                (() => {
                                    let prevCourseDay = null; // prevCourseDay 선언 및 초기화

                                    return Object.keys(data[dateKey]).map(dayKey => {
                                        const courseDay = data[dateKey][dayKey].courseDay;
                                        const travelNum = data[dateKey][dayKey].travelNum;
                                        const img = data[dateKey][dayKey].img;
                                        const title = data[dateKey][dayKey].title;
                                        const addr = data[dateKey][dayKey].addr;
                                        const duration = data[dateKey][dayKey].duration;

                                        // 이전 courseDay 값과 현재 courseDay 값이 다른 경우에만 Day 출력
                                        const dayOutputJSX = courseDay !== prevCourseDay ? <h6 className="day-num">Day {courseDay}</h6> : null;
                                        prevCourseDay = courseDay; // 이전 courseDay 값을 갱신

                                        return (
                                            <div key={dayKey}>
                                                <br />
                                                {dayOutputJSX}
                                                <div className="location-wrap">
                                                    <div className="location">
                                                        <div className={`location-num-wrap ${courseDay === 1 ? 'color-blue' : courseDay === 2 ? 'color-red' : 'color-green'}`}>
                                                            <p className="location-num">{travelNum}</p>
                                                        </div>
                                                        <div className="location-img-wrap">
                                                            <div className="location-img-div">
                                                                <img src={img} className="location-img" alt={title} />
                                                            </div>
                                                        </div>
                                                        <div className="location-info">
                                                            <p>{title}</p>
                                                            <p className="location-addr">{addr}</p>
                                                        </div>
                                                    </div>
                                                    {duration !== 0 && (
                                                        <div className="duration-time-wrap">
                                                            <div className="duration-time">
                                                                <p><DirectionsCarIcon /> {duration}</p>
                                                            </div>
                                                        </div>
                                                    )}

                                                </div>
                                            </div>
                                        );
                                    });
                                })()
                            }
                        </div>
                    </div>
                ))}
                <hr/>
                <div className="kakao">
                    카카오톡 공유 버튼
                </div>
            </div>
            {/*지도*/}
            <div className="result-map">
                <NaverMapView/>
            </div>
        </div>
    )
        ;
}

function VerticalLine() {
    return (
        <div className="v-line"></div>
    );
}