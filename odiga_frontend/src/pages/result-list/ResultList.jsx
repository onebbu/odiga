import * as React from 'react';
import "./ResultList.css";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import {Link} from "react-router-dom";

export default function ResultList({data}) {
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

                                // 이전 courseDay 값과 현재 courseDay 값이 다른 경우에만 Day 출력
                                const dayOutputJSX = courseDay !== prevCourseDay ?
                                    <h6 className="day-num">Day {courseDay}</h6> : null;
                                prevCourseDay = courseDay; // 이전 courseDay 값을 갱신

                                return (
                                    <div key={dayKey}>
                                        <br/>
                                        {dayOutputJSX}
                                        <div className="location-wrap">
                                            <div className="location">
                                                <div
                                                    className={`location-num-wrap ${courseDay === 1 ? 'color-blue' : courseDay === 2 ? 'color-red' : 'color-green'}`}>
                                                    <p className="location-num">{travelNum}</p>
                                                </div>
                                                <div className="location-img-wrap">
                                                    <div className="location-img-div">
                                                        <img src={img} className="location-img" alt={title}/>
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
        <hr/>
        <div className="kakao">
            카카오톡 공유 버튼
        </div>
        </body>
    );
}

