import * as React from 'react';
import "./ResultList.css";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import {Link} from "react-router-dom";
import {useState} from "react";
import LocationContent from "./LocationContent.jsx";
import KakaoSharing from "../component/kakao-sharing/KakaoSharing";

export default function ResultList({data}) {

    const [showModal, setShowModal] = useState(false);
    const [contentId, setContentId] = useState('');

    const handleShowModal = (id) => {
        setShowModal(true);
        setContentId(id);
    };

    let schedule = '';



    const handleCloseModal = () => setShowModal(false);

    // 카테고리 텍스트에 따라 배경색과 폰트색을 매핑하는 객체
    const catColors = {
        '액티비티': { backgroundColor: '#B4DAF2', color: 'black'},
        '테마파크': { backgroundColor: '#B4DAF2', color: 'black'},
        '축제': { backgroundColor: '#B4DAF2', color: 'black'},
        '바다': { backgroundColor: '#DBDBC5', color: 'black'},
        '자연': { backgroundColor: '#DBDBC5', color: 'black'},
        '산': { backgroundColor: '#DBDBC5', color: 'black'},
        '문화역사': { backgroundColor: '#F7AB89', color: 'black'},
        '실내여행지': { backgroundColor: '#F7AB89', color: 'black'},
        '쇼핑': { backgroundColor: '#F7AB89', color: 'black'},
        '카페': { backgroundColor: '#F4D35E', color: 'black'},
        '식당': { backgroundColor: '#F4D35E', color: 'black'},
    };

    return (
        <body>
        {Object.keys(data).map(dateKey => (
            <div key={dateKey}>
                <div className="result-plan">
                    <h6>{dateKey}</h6>
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
                                const directionUrl = data[dateKey][dayKey].directionUrl;
                                const cat = data[dateKey][dayKey].cat;
                                const id = data[dateKey][dayKey].contentId;

                                schedule = dateKey;

                                // 이전 courseDay 값과 현재 courseDay 값이 다른 경우에만 Day 출력
                                const dayOutputJSX = courseDay !== prevCourseDay ?
                                    <h6 className="day-num">Day {courseDay}</h6> : null;
                                prevCourseDay = courseDay; // 이전 courseDay 값을 갱신

                                // 해당 카테고리의 배경색과 폰트색 가져오기
                                const { backgroundColor, color, fontWeight } = catColors[cat] || { backgroundColor: 'gray', color: 'black', fontFamily: "GmarketSansMedium" };

                                return (
                                    <div key={dayKey}>
                                        <br/>
                                        {dayOutputJSX}
                                        <div className="location-wrap" onClick={() => handleShowModal(id)}>
                                            <div className="location">
                                                <div
                                                    className={`location-num-wrap ${courseDay === 1 ? 'color-first' : courseDay === 2 ? 'color-second' : 'color-third'}`}>
                                                    <p className="location-num">{travelNum}</p>
                                                </div>
                                                <div className="location-img-wrap">
                                                    <div className="location-img-div">
                                                        <img src={img} className="location-img" alt={title}/>
                                                    </div>
                                                </div>
                                                <div className="location-info">
                                                    <div>
                                                        <span style={{
                                                            backgroundColor, color,
                                                            fontSize: '75%', fontFamily: "GmarketSansMedium",
                                                            fontWeight: '300',
                                                            padding: '0.25em 0.5em', borderRadius: "8px"
                                                        }}>{cat}</span>
                                                    </div>
                                                    <p className="title">{title}</p>
                                                    <p className="addr">{addr}</p>
                                                </div>
                                            </div>
                                            {duration !== 0 && (
                                                <div className="duration-time-wrap">
                                                    <div className="duration-time">
                                                        <Link to={directionUrl}
                                                              target="_blank"
                                                              rel="noopener noreferrer"
                                                              className="custom-link"><DirectionsCarIcon/>{duration} ></Link>
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
        {showModal && <LocationContent show={showModal} handleClose={handleCloseModal} contentId={contentId}/>}
        <hr/>
        <div className="kakao">
            <br />
            <p
            style={{
                fontFamily: 'GmarketSansMedium'
            }}>지금 여행을 다른 사람과 공유해보세요!</p>
            <KakaoSharing schedule={schedule} />
        </div>
        </body>
    );
}

