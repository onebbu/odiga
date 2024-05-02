import React from 'react';
import NaverMap from "./NaverMap";

function NaverMapView({data}) {

    const markerGroups = [];

    let centerLatitude = 0;
    let centerLongitude = 0;
    let length = 0;

    for (const dateKey in data) {
        if (data.hasOwnProperty(dateKey)) {
            const dateData = data[dateKey];
            for (const rawCourse in dateData) {
                if (dateData.hasOwnProperty(rawCourse)) {
                    const courseDayArr = dateData[rawCourse];

                    const markers = {}; // markers 객체를 각각의 반복문 내에서 생성
                    markers.latitude = courseDayArr.mapY;
                    markers.longitude = courseDayArr.mapX;
                    markers.contentId = courseDayArr.contentId;
                    markers.courseDay = courseDayArr.courseDay;
                    markers.travelNum = courseDayArr.travelNum;
                    markers.maxtravelNum = courseDayArr.maxTravelNum;
                    markers.contentId = courseDayArr.contentId;
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

    return <NaverMap markers={markerGroups} center={center}/>;

}

export default NaverMapView;