import React, {useEffect, useState} from 'react';
import "./NaverMap.css";
import LocationContent from "../LocationContent";

function NaverMap({markers, center}) {
    const [showModal, setShowModal] = useState(false); // 모달 열림/닫힘 상태를 관리
    const [selectedContentId, setSelectedContentId] = useState(null); // 선택된 마커의 contentId 상태 추가


    useEffect(() => {
        const {naver: naverResult} = window;

        if (naverResult && naverResult.maps) {
            const centerLocation = new naverResult.maps.LatLng(center.latitude, center.longitude);

            const mapOptions = {
                center: centerLocation,
                // 중앙에 배치할 위치
                zoom: 10,
                // 확대 단계
            };
            const map = new naverResult.maps.Map('map', mapOptions);

            const naverMarkers = Object.values(markers).map(({latitude, longitude, travelNum, courseDay, contentId}) => {
                const markerLocation = new naverResult.maps.LatLng(latitude, longitude);
                if (courseDay == 1) {
                    const marker = new naverResult.maps.Marker({
                        map: map,
                        position: markerLocation,
                        icon: {
                            content: `<div class="shape-container">
                     <div class="inner-triangle"></div>
                     <div class="wrap-circle"><div class="circle"></div></div>
                     <div class="inner-circle_1"><span class="index-text_1">${travelNum}</span></div>
                     <div class="triangle-container"></div></div>`,
                            size: new naverResult.maps.Size(50, 52),
                            anchor: new naverResult.maps.Point(16, 40)
                        }
                    });

                    // 마커 클릭 이벤트 핸들러 등록
                    marker.addListener('click', () => {
                        // 클릭된 마커의 위치를 지도의 중심으로 설정
                        map.setCenter(markerLocation);
                        setSelectedContentId(contentId);
                        setShowModal(true);
                    });

                    return marker;
                }
                if (courseDay == 2) {
                    const marker = new naverResult.maps.Marker({
                        map: map,
                        position: markerLocation,
                        icon: {
                            content: `<div class="shape-container">
                     <div class="inner-triangle"></div>
                     <div class="wrap-circle"><div class="circle"></div></div>
                     <div class="inner-circle_2"><span class="index-text_2">${travelNum}</span></div>
                     <div class="triangle-container"></div></div>`,
                            size: new naverResult.maps.Size(50, 52),
                            anchor: new naverResult.maps.Point(16, 40)
                        }
                    });
                    // 마커 클릭 이벤트 핸들러 등록
                    marker.addListener('click', () => {
                        // 클릭된 마커의 위치를 지도의 중심으로 설정
                        map.setCenter(markerLocation);
                        setSelectedContentId(contentId);
                        setShowModal(true);
                    });

                    return marker;
                }
                if (courseDay == 3) {
                    const marker = new naverResult.maps.Marker({
                        map: map,
                        position: markerLocation,
                        icon: {
                            content: `<div class="shape-container">
                     <div class="inner-triangle"></div>
                     <div class="wrap-circle"><div class="circle"></div></div>
                     <div class="inner-circle_3"><span class="index-text_3">${travelNum}</span></div>
                     <div class="triangle-container"></div></div>`,
                            size: new naverResult.maps.Size(50, 52),
                            anchor: new naverResult.maps.Point(16, 40)
                        }
                    });
                    // 마커 클릭 이벤트 핸들러 등록
                    marker.addListener('click', () => {
                        // 클릭된 마커의 위치를 지도의 중심으로 설정
                        map.setCenter(markerLocation);
                        setSelectedContentId(contentId);
                        setShowModal(true);
                    });

                    return marker;
                }

            });

            // 각 courseday에 대한 경로 그룹화
            const pathsByCourseDay = [[], [], []]; // courseday 별로 각각의 배열에 저장될 경로

            let currentCourseDay = 0; // 현재 처리 중인 courseday의 인덱스

            Object.values(markers).forEach(({latitude, longitude, courseDay, travelNum, maxtravelNum}) => {
                const latLng = new naverResult.maps.LatLng(latitude, longitude);

                pathsByCourseDay[currentCourseDay].push(latLng); // 현재 courseday의 경로에 좌표 추가

                if (travelNum === maxtravelNum) { // 한 여행 경로의 끝에 도달했을 때
                    currentCourseDay++; // 다음 courseday의 인덱스로 이동
                    if (currentCourseDay >= 3) { // courseday가 3 이상인 경우 다시 0으로 초기화
                        currentCourseDay = 0;
                    }
                }
            });

            // 각 경로에 적절한 strokeColor를 지정하여 폴리라인 생성
            const polylines = pathsByCourseDay.map((path, index) => {
                const strokeColor = ['#A6285F', '#227c9d', '#9C8770'][index]; // courseday에 따른 색상 결정
                return new naverResult.maps.Polyline({
                    path: path,
                    strokeColor: strokeColor,
                    strokeWeight: 3 // 선 굵기
                });
            });

            // 생성된 폴리라인을 지도에 추가
            polylines.forEach(polyline => {
                polyline.setMap(map);
            });
        }
    }, [markers, center]);

    const handleCloseModal = () => {
        // 모달 닫기
        setShowModal(false);
    };

    return (
        <>
            <div id="map" style={{ width: '100%', height: '85vh' }} />
            {/* 모달 */}
            {showModal && <LocationContent show={showModal} handleClose={handleCloseModal} contentId={selectedContentId}/>}
        </>
    );
}

export default NaverMap;