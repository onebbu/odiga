package com.odiga.mytrip.resultlist.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.odiga.mytrip.resultlist.service.ResultService;
import com.odiga.mytrip.resultlist.vo.ResultVO;
import com.odiga.mytrip.travel.service.NaverApiService;
import com.odiga.mytrip.travel.service.TravelService;
import com.odiga.mytrip.travel.vo.TravelListVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.concurrent.TimeUnit;

@Slf4j
@Controller
@RequiredArgsConstructor
public class ResultController {

    private final ResultService resultService;
    private final TravelService travelService;
    private final NaverApiService naverApiService;


    // http://localhost:8080/courseId/odiga_2
    @GetMapping("/courseId/{nickname}/{courseNo}")
    public ResponseEntity<Map<String, Map<Integer, Map<String, Object>>>> result(@PathVariable String courseNo) {

        /**
         * 프론트로 보낼 맵 설정 이중 맵
         * 1차: <여행 일정, 몇번째 장소> scheduleMap
         * 2차: <몇번째 장소, 데이터> travelNum
         * 3차: <데이터>
         *     * 장소명 / 주소 / 이미지 / 설명 / 출발지(경도, 위도) / 경유지(경도, 위도) / 목적지(경도, 위도)
         *     * 장소 개수에따라 출발지, 목적지가 다르게
         *          * 장소가 1개면 출발지랑 목적지를 동일하게
         *          * 장소가 2개면 출발지, 목적지
         *          * 장소가 3개 이상이면 출발지, 경유지 목적지
         * </데이터>
         */


        Map<String, Map<Integer, Map<String, Object>>> resultMap = new HashMap<>();


        List<ResultVO> travelList = resultService.findById(courseNo); // 코스NO를 통해 사용자가 선택한 정보들 모두 저장됨

        int i = 0;
        while (i < travelList.size()) {
            ResultVO current = travelList.get(i);
            TravelListVO currentTravel = travelService.TravelList(String.valueOf(current.getContentId()));


            if (!resultMap.containsKey(current.getCourseTitle())) {
                resultMap.put(current.getCourseTitle(), new HashMap<>());
            }

            Map<Integer, Map<String, Object>> dayMap = resultMap.get(current.getCourseTitle());


            // 다음 요소가 있는지 확인
            if (i + 1 < travelList.size()) {
                ResultVO next = travelList.get(i + 1);
                TravelListVO nextTravel = travelService.TravelList(String.valueOf(next.getContentId()));


                // 각 날짜별로 새로운 locationMap을 생성하여 데이터 저장
                Map<String, Object> locationMap = new HashMap<>();

                // 위도+경도 저장하는 코드
                int maxtravelNum = resultService.findMaxTravelNum(courseNo, current.getCourseDay());
                String sharePw = resultService.findSharePw(courseNo);


                locationMap.put("title", currentTravel.getTitle());
                locationMap.put("addr", currentTravel.getAddr1());
                locationMap.put("img", currentTravel.getFirstimage());
                locationMap.put("mapX", currentTravel.getMapx());
                locationMap.put("mapY", currentTravel.getMapy());
                locationMap.put("courseDay", current.getCourseDay());
                locationMap.put("travelNum", current.getTravelNum());
                locationMap.put("maxTravelNum", maxtravelNum);
                locationMap.put("contentId", current.getContentId());
                locationMap.put("cat", resultService.findCategory(currentTravel.getCat3()));
                locationMap.put("sharePw", sharePw);

                // 하루에 장소가 1개일 경우
                if (maxtravelNum == 1) {
                    locationMap.put("duration", 0);
                    locationMap.put("directionUrl", "");

                }
                // 하루에 장소가 2개 이상 경우
                if (maxtravelNum >= 2) {
                    String start = currentTravel.getMapx() + "," + currentTravel.getMapy();
                    String goal = nextTravel.getMapx() + "," + nextTravel.getMapy();
                    Map<String, Object> directionResult = naverApiService.getDirection(start, goal);
                    String duration = DirectionResultParsing(directionResult);
                    locationMap.put("duration", duration);
                    locationMap.put("directionUrl", "http://map.naver.com/index.nhn?slng="+currentTravel.getMapx()+"&slat="+currentTravel.getMapy()+"&stext="+currentTravel.getTitle()+"&elng="+nextTravel.getMapx()+"&elat="+nextTravel.getMapy()+"&pathType=0&showMap=true&etext="+nextTravel.getTitle()+"&menu=route");

                //     y / lat / 위도  // x / lng / 경도

                }
                // 다음 요소가 없는 경우에는 duration을 0으로 설정
                if (current.getTravelNum() == maxtravelNum) {
                    locationMap.put("duration", 0);
                    locationMap.put("directionUrl", "");
                }

                dayMap.put(i, locationMap);
            } else {

                Map<String, Object> locationMap = new HashMap<>();
                int maxtravelNum = resultService.findMaxTravelNum(courseNo, current.getCourseDay());

                String sharePw = resultService.findSharePw(courseNo);


                locationMap.put("title", currentTravel.getTitle());
                locationMap.put("addr", currentTravel.getAddr1());
                locationMap.put("img", currentTravel.getFirstimage());
                locationMap.put("mapX", currentTravel.getMapx());
                locationMap.put("mapY", currentTravel.getMapy());
                locationMap.put("courseDay", current.getCourseDay());
                locationMap.put("travelNum", current.getTravelNum());
                locationMap.put("maxTravelNum", maxtravelNum);
                locationMap.put("contentId", current.getContentId());
                locationMap.put("cat", resultService.findCategory(currentTravel.getCat3()));
                locationMap.put("sharePw", sharePw);


                // 하루에 장소가 1개일 경우
                if (maxtravelNum == 1) {
                    locationMap.put("duration", 0);
                }
                // 다음 요소가 없는 경우에는 duration을 0으로 설정
                if (current.getTravelNum() == maxtravelNum) {
                    locationMap.put("duration", 0);
                }
                dayMap.put(i, locationMap);
            }

            // 반복 변수 증가
            i++;
        }

        List<String> sortedKeys = new ArrayList<>(resultMap.keySet());
        Collections.sort(sortedKeys);
        Map<String, Map<Integer, Map<String, Object>>> sortedMap = new LinkedHashMap<>();
        for (String key : sortedKeys) {
            sortedMap.put(key, resultMap.get(key));
        }

        return ResponseEntity.ok(sortedMap);
    }

    @GetMapping("/contentId/{contentId}")
    public ResponseEntity<Map<String, Map<String, Object>>> resultModal(@PathVariable String contentId) {


        Map<String, Map<String, Object>> resultMap = new HashMap<>();

        Map<String, Object> contentInfo = new HashMap<>();

        TravelListVO content = travelService.TravelList(contentId);

        String title = content.getTitle();
        int likeCount = content.getLikecount() == null? 0 : Integer.parseInt(content.getLikecount());
        String img = content.getFirstimage();
        String addr = content.getAddr1();
        String overview = content.getOverview();
        String cat = resultService.findCategory(content.getCat3());
        String catKR = resultService.findCategoryKR(content.getCat3());


        contentInfo.put("title", title);
        contentInfo.put("likeCount", likeCount);
        contentInfo.put("img", img);
        contentInfo.put("addr", addr);
        contentInfo.put("cat", cat);
        contentInfo.put("catkr", catKR);
        contentInfo.put("overview", overview);

        resultMap.put(contentId, contentInfo);

        return ResponseEntity.ok(resultMap);
    }

    // 아이디를 받아서 전체 결과 목록을 전달
    // 보내줄꺼, 닉넴에 대한 제목, 여행지?
    // 닉네임 / index: 여행지(여러개), courseID: 코스 아이디, courseTitle: 여행 제목
    @GetMapping("/mypage/mycourse/{nickname}")
    @ResponseBody
    public ResponseEntity<Map<String, Map<String, Object>>> findResultList(@PathVariable String nickname) {
        Map<String, Map<String, Object>> resultMap = new HashMap<>();
        Map<String, ArrayList<String>> travelArrays = new HashMap<>(); // 각 courseNo에 대한 travelArray를 관리하기 위한 맵

        List<ResultVO> allResults = resultService.findAllResultTitles(nickname);
        Iterator<ResultVO> rsIter = allResults.iterator();

        while (rsIter.hasNext()) {
            ResultVO result = rsIter.next();

            // 새로운 userResults 맵 생성
            Map<String, Object> userResults = new HashMap<>();

            // userResults에 데이터 추가
            userResults.put("title", result.getCourseTitle());

            TravelListVO travelInfo = travelService.TravelList(String.valueOf(result.getContentId()));

            ArrayList<String> travelArray = travelArrays.getOrDefault(result.getCourseNo(), new ArrayList<>());
            String travelLocation = String.join(" - ", travelArray);

            travelArray.add(travelInfo.getTitle());
            userResults.put("content", travelLocation);

            // resultMap에 추가
            resultMap.put(result.getCourseNo(), userResults);

            travelArrays.put(result.getCourseNo(), travelArray);
        }
        return ResponseEntity.ok(resultMap);
    }

    @GetMapping("/findSharePw/{courseNo}")
    public ResponseEntity<String> findSharePw(@PathVariable String courseNo) {
        String sharePw = resultService.findSharePw(courseNo);
        return ResponseEntity.ok(sharePw);
    }

    // 네이버 api(driving-5)
    private String DirectionResultParsing(Map<String, Object> directionResult) {

        try {

            ObjectMapper objectMapper = new ObjectMapper(); // ObjectMapper 생성
            String jsonString = objectMapper.writeValueAsString(directionResult); // JSON 문자열
            JsonNode rootNode = objectMapper.readTree(jsonString); // JSON 파싱

            // 필드 값 추출
            JsonNode routeNode = rootNode.get("route");
            JsonNode traoptimalNode = routeNode.get("traoptimal").get(0);
            JsonNode summaryNode = traoptimalNode.get("summary");

            int duration = summaryNode.get("duration").asInt();

            String durationAsHourMiute = convertMillisToHourMinute(duration);

            return durationAsHourMiute;

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    public String convertMillisToHourMinute(long millis) {
        // 밀리초를 시간과 분으로 변환
        long hours = TimeUnit.MILLISECONDS.toHours(millis);
        long minutes = TimeUnit.MILLISECONDS.toMinutes(millis) % 60;

        // 시간이 1시간 이상일 경우 시간과 분을 반환하고,
        // 그렇지 않으면 분만 반환합니다.
        if (hours > 0) {
            return hours + "시간 " + minutes + "분";
        } else {
            return minutes + "분";
        }
    }


}
