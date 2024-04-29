import React, {useEffect, useState} from 'react';
import "./NaverMap.css";

function NaverMap({markers, center}) {


    useEffect(() => {
        const {naver} = window;

        const centerLocation = new naver.maps.LatLng(center.latitude, center.longitude);

        const mapOptions = {
            center: centerLocation,
            // 중앙에 배치할 위치
            zoom: 10,
            // 확대 단 계
        };
        const map = new naver.maps.Map('map', mapOptions);

        const naverMarkers = Object.values(markers).map(({latitude, longitude, travelNum, courseDay}) => {
            const markerLocation = new naver.maps.LatLng(latitude, longitude);
            if (courseDay == 1) {
                return new naver.maps.Marker({
                    map: map,
                    position: markerLocation,
                    icon: {
                        content: `<div class="shape-container">
                     <div class="inner-triangle"></div>
                     <div class="wrap-circle"><div class="circle"></div></div>
                     <div class="inner-circle_1"><span class="index-text_1">${travelNum}</span></div>
                     <div class="triangle-container"></div></div>`,
                        size: new naver.maps.Size(50, 52),
                        anchor: new naver.maps.Point(16, 40)
                    }
                });
            }
            if (courseDay == 2) {
                return new naver.maps.Marker({
                    map: map,
                    position: markerLocation,
                    icon: {
                        content: `<div class="shape-container">
                     <div class="inner-triangle"></div>
                     <div class="wrap-circle"><div class="circle"></div></div>
                     <div class="inner-circle_2"><span class="index-text_2">${travelNum}</span></div>
                     <div class="triangle-container"></div></div>`,
                        size: new naver.maps.Size(50, 52),
                        anchor: new naver.maps.Point(16, 40)
                    }
                });
            }
            if (courseDay == 3) {
                return new naver.maps.Marker({
                    map: map,
                    position: markerLocation,
                    icon: {
                        content: `<div class="shape-container">
                     <div class="inner-triangle"></div>
                     <div class="wrap-circle"><div class="circle"></div></div>
                     <div class="inner-circle_3"><span class="index-text_3">${travelNum}</span></div>
                     <div class="triangle-container"></div></div>`,
                        size: new naver.maps.Size(50, 52),
                        anchor: new naver.maps.Point(16, 40)
                    }
                });
            }

        });

        // 각 courseday에 대한 경로 그룹화
        const pathsByCourseDay = [[], [], []]; // courseday 별로 각각의 배열에 저장될 경로

        let currentCourseDay = 0; // 현재 처리 중인 courseday의 인덱스

        Object.values(markers).forEach(({latitude, longitude, courseDay, travelNum, maxtravelNum}) => {
            const latLng = new naver.maps.LatLng(latitude, longitude);

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
            const strokeColor = ['#0000ff', '#ff0000', '#008000'][index]; // courseday에 따른 색상 결정
            return new naver.maps.Polyline({
                path: path,
                strokeColor: strokeColor,
                strokeWeight: 3 // 선 굵기
            });
        });

// 생성된 폴리라인을 지도에 추가
        polylines.forEach(polyline => {
            polyline.setMap(map);
        });

    }, [markers, center]);

    return <div id="map" style={{width: '100%', height: '85vh'}}/>;
}

export default NaverMap;