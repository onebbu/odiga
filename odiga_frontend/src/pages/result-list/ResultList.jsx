import * as React from 'react';
import "./ResultList.css";


// http://localhost:3000/result-list
export default function ResultList() {


    return (
        <body>
        <div className="nav">
            nav 공간
            {/*재현님 완성 후 수정*/}
        </div>
        {/*바디 부분*/}
        <div className="wrapper">
            <div className="result-wrap">
                {/*일정*/}
                <div className="result-plan">
                    <h6>여행 일정</h6>
                    <h6>2024.04.09~2024.04.09</h6>
                </div>
                <hr/>
                {/*여행지 결과*/}
                <div className="result-detail">
                    <h6>조회된 여행지</h6>
                    <div className="location">
                        <p className="location-num">1</p>
                        <div className="location-img-wrap">
                            <div className="location-img-div">
                                <img
                                    src="https://lh3.googleusercontent.com/p/AF1QipOEDWaZ6Iu5JSWAXkQi6Gjzv0t6bo3AmcPHV56g=s1360-w1360-h1020"
                                    className="location-img"/>
                            </div>
                        </div>
                        <div className="location-info">
                            <p>청계천 박물관</p>
                            <p className="location-addr">서울특별시 성동구 청계천로530</p>
                        </div>
                    </div>
                </div>
                <div className="kakao">
                    카카오톡 공유 버튼
                </div>
            </div>
            {/*지도*/}
            <div className="result-map">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d405220.418437944!2d126.582416563409!3d37.489411020736576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca3ff67128961%3A0x55a56e8ffc5bc5d!2z66mA7Yuw7Lqg7Y287IqkIOyXreyCvA!5e0!3m2!1sko!2skr!4v1712626692898!5m2!1sko!2skr"
                    width="600" height="600" allowFullScreen="" loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"></iframe>

            </div>
        </div>
        <div className="footer">
            footer 공간
            {/*재현님 완성 후 수정*/}
        </div>
        </body>
    )
        ;


}