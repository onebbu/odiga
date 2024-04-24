package com.odiga.mytrip.resultlist.controller;

import com.odiga.mytrip.resultlist.service.ResultService;
import com.odiga.mytrip.resultlist.vo.ResultVO;
import com.odiga.mytrip.travel.service.TravelService;
import com.odiga.mytrip.travel.vo.TravelListVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.*;

@Slf4j
@Controller
// @RestController
// @RequestMapping("resultId")
@RequiredArgsConstructor
public class ResultController {

    private final ResultService resultService;

    private final TravelService travelService;


    // http://localhost:8080/courseId/odiga_2
    @GetMapping("/courseId/{courseNo}")
    public ResponseEntity<Map<Integer, Map<Object, Map<String, String>>>> result(@PathVariable String courseNo, Model model) {

        /**
         * 프론트로 보낼 맵 설정 이중 맵
         * 1차: <몇일차, 몇번째 장소> courseDay
         * 2차: <몇번째 장소, 데이터> travelNum
         * 3차: <데이터>
         *     * 장소명 / 주소 / 이미지 / 설명 / 출발지(경도, 위도) / 경유지(경도, 위도) / 목적지(경도, 위도)
         *     * 장소 개수에따라 출발지, 목적지가 다르게
         *          * 장소가 1개면 출발지랑 목적지를 동일하게
         *          * 장소가 2개면 출발지, 목적지
         *          * 장소가 3개 이상이면 출발지, 경유지 목적지
         * </데이터>
         */

        Map<Integer, Map<Object, Map<String, String>>> resultMap = new HashMap<>(); // 프론트로 보낼 맵
        List<ResultVO> travelList = resultService.findById(courseNo); // 코스NO를 통해 사용자가 선택한 정보들 모두 저장됨

        Iterator<ResultVO> iterator = travelList.iterator(); // Iterator를 사용하여 travelList를 순회

        // 위도, 경도 조회 코드
        String start2 = "";
        String goal2 = "";
        String start3 = "";
        String goal3 = "";
        String locationWaypoints = "";

        while (iterator.hasNext()) {
            // 1. contentid로 travellist의 정보 조회
            ResultVO resultVO = iterator.next(); // 최대 날짜가 며칠인지 확인 후 최대 날짜만큼 반복
            TravelListVO travelListVO = travelService.TravelList(String.valueOf(resultVO.getContentId())); // 콘텐츠 아이디로 DB에서 장소 정보(travelList) 가져옴


            Map<Object, Map<String, String>> dayMap = resultMap.get(resultVO.getCourseDay());
            Map<Object, Map<String, String>> locationMap = resultMap.get(resultVO.getCourseDay());
            if (dayMap == null) {
                dayMap = new HashMap<>();
                resultMap.put(resultVO.getCourseDay(), dayMap);
            }

            // 각 날짜별로 새로운 locationMap을 생성하여 데이터 저장
            Map<String, String> desMap = new HashMap<>();
            desMap.put("title", travelListVO.getTitle());
            desMap.put("addr", travelListVO.getAddr1());
            desMap.put("img", travelListVO.getFirstimage());
            desMap.put("travelOrder", resultVO.getCourseDay() + "_" + resultVO.getTravelNum());
            desMap.put("위도, 경도", travelListVO.getMapx() + "," + travelListVO.getMapy());
            dayMap.put(resultVO.getTravelNum(), desMap);

            // 위도+경도 저장
            // 조건을 어떻게 줄까?
            // travelnum이 1, 2, 3 이상일때로 -> 1일때는 start-goal 동일
            // 2일때는 start는 이전꺼 그대로 goal은 현재꺼
            // 3일때는 start 그대로, 다음에는 경유지, 마지막일 경우에는 goal -> 이거 조금 머리 아프겠넹

            // 위도+경도 저장하는 코드


            int maxtravelNum = resultService.findMaxTravelNum(courseNo, resultVO.getCourseDay());
            Map<String, String> mapXY = new HashMap<>();
            String locationXY = travelListVO.getMapx() + "," + travelListVO.getMapy(); // 위도, 경도

            // 하루에 장소가 1개일 경우
            if (maxtravelNum == 1) {
                mapXY.put("start", locationXY);
                mapXY.put("goal", locationXY);
            }
            // 하루에 장소가 2개일 경우
            if (maxtravelNum == 2) {
                // 첫 번째 장소일 때만 start 값 설정
                if (resultVO.getTravelNum() == 1 && start2.isEmpty()) {
                    start2 = locationXY;
                }
                // 마지막 장소일 때만 goal 값 설정
                if (resultVO.getTravelNum() == maxtravelNum && goal2.isEmpty()) {
                    goal2 = locationXY;
                }
                mapXY.put("start", start2);
                mapXY.put("goal", goal2);
            }
            // 하루에 장소가 3개 이상일 경우(경유지 추가)
            if (maxtravelNum >= 3) {
                log.info("resultVO.getTravelNum()={}", resultVO.getTravelNum());
                log.info("여행지 순서 번호?={}", desMap.get("travelOrder"));
                log.info("이름?={}", desMap.get("title"));

                // 첫 번째 장소일 때만 start 값 설정
                if (resultVO.getTravelNum() == 1 && start3.isEmpty()) {
                    start3 = locationXY;
                }
                if (resultVO.getTravelNum() >= 2 && resultVO.getTravelNum() < maxtravelNum) {
                    if(locationWaypoints.isEmpty()){
                        locationWaypoints = locationXY;
                    } else {
                        locationWaypoints = locationWaypoints + ":" + locationXY;
                    }
                }
                // 마지막 장소일 때만 goal 값 설정
                if (resultVO.getTravelNum() == maxtravelNum && goal3.isEmpty()) {
                    goal3 = locationXY;
                }
                mapXY.put("start", start3);
                mapXY.put("goal", goal3);
                mapXY.put("waypoints", locationWaypoints);

            }


            // dayMap에 mapXY 저장
            dayMap.put("mapXY", mapXY);

            // resultMap에 저장
            resultMap.put(resultVO.getCourseDay(), dayMap);
        }

        return ResponseEntity.ok(resultMap);
    }


}
