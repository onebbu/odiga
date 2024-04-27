import React, {useEffect, useState} from 'react';
import axios from "axios";
import NaverMap from "./NaverMap";

function NaverMapView() {
    // axios에서 다 가져오기

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

    const markerGroups = [];
    // const markers = [];

    let currentGroup = []; // 현재 그룹에 속하는 마커들을 저장할 배열

    // 위도, 경도, contentID(여행지 상세창 이동 이벤트), courseDay(몇일차), travelNum(순서번호)

    let centerLatitude = 0;
    let centerLongitude = 0;
    let length = 0;

    // const travel

    console.log(data)

    for (const dateKey in data) {
        if (data.hasOwnProperty(dateKey)) {
            const dateData = data[dateKey];
            for (const rawCourse in dateData) {
                if (dateData.hasOwnProperty(rawCourse)) {
                    const courseDayArr = dateData[rawCourse];
                    console.log(courseDayArr)

                    const markers = {}; // markers 객체를 각각의 반복문 내에서 생성
                    markers.latitude = parseFloat(courseDayArr.mapY);
                    markers.longitude = parseFloat(courseDayArr.mapX);
                    markers.contentId = parseFloat(courseDayArr.contentId);
                    markers.courseDay = parseFloat(courseDayArr.courseDay);
                    markers.travelNum = parseFloat(courseDayArr.travelNum);
                    markers.maxtravelNum = parseFloat(courseDayArr.maxtravelNum);
                    markerGroups.push(markers);

                    centerLatitude += (parseFloat(courseDayArr.mapY));
                    centerLongitude += (parseFloat(courseDayArr.mapX));
                    length += 1
                }
            }
        }
    }

    centerLatitude = centerLatitude / length;
    centerLongitude = centerLongitude / length;

    const center = {latitude: centerLatitude, longitude: centerLongitude};

    console.log("markerGroups", typeof markerGroups);
    console.log("center", center);

    return <NaverMap markers={markerGroups} center={center}/>;

}

export default NaverMapView;