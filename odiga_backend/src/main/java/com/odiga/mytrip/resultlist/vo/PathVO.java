package com.odiga.mytrip.resultlist.vo;


import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PathVO {

    private String start;
    // 출발지
    // request position format: 필수 항목(경도, 위도)과 옵션 항목(이름, 지점 ID)을 , 문자로 연결
    // 예시: 127.12345,37.12345 / 127.12345,37.12345,name=출발지이름
    private String goal;
    // 	목적지
    // 	multiple request position format: request position format 여러 개를 : 문자로 연결한 리스트 문자열
    // 예시: 127.12345,37.12345:128.12345,38.12345 / 127.12345,37.12345:128.12345,38.12345,name=장소이름1

    private String waypoints;
    //  경유지
    //  multiple request position format list: multiple request position format 여러개를 |로 연결
    // 127.12345,37.12345:127.23456,37.23456|128.12345,38.12345:128.23456,38.23456

    private String option;
    // 탐색 옵션
    // Option Code - 실시간 최적으로 설정
    /**
     * trafast	실시간 빠른길
     * tracomfort	실시간 편한길
     * traoptimal	실시간 최적
     * traavoidtoll	무료 우선
     * traavoidcaronly	자동차 전용도로 회피 우선
     */


}
