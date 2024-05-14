package com.odiga.mytrip.travel.controller;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.odiga.mytrip.travel.service.PlaceService;
import com.odiga.mytrip.travel.vo.TravelListVO;



@RestController
public class PlaceController {
    @Autowired
    private PlaceService placeService;
    // Logger 선언
    private static final Logger logger = Logger.getLogger(PlaceController.class.getName());

    @GetMapping("/place/{areacode}/{displayStart}/{order}")
    public List<TravelListVO> getPlaceList(
        @PathVariable String areacode, 
        @PathVariable String displayStart, 
        @PathVariable String order) throws IOException {

        try {
            // order 파라미터를 검증하여 유효한 정렬 기준으로 변환
            String orderByClause = validateAndTransformOrder(order);
            String displayEnd = String.valueOf(Integer.valueOf(displayStart) + 8);
            
            List<TravelListVO> placeList = placeService.placeList(areacode, displayStart, displayEnd, orderByClause);
            return placeList;
        } catch (Exception e) {
            // 예외 발생 시 로그 추가 및 예외 다시 던지기
            logger.log(Level.SEVERE, "Error processing request", e);
            throw new RuntimeException("Failed to fetch place information.");
        }
    }

    private String validateAndTransformOrder(String order) {
        // order 파라미터 값이 null이거나 빈 문자열인 경우 기본 정렬 기준을 반환
        if (order == null || order.trim().isEmpty()) {
            return "title"; // 기본적으로는 이름(name) 순으로 정렬
        }
    
        // order 파라미터 값을 소문자로 변환하여 비교 (대소문자 구분 없이 비교하기 위함)
        String normalizedOrder = order.toLowerCase();
    
        // 허용된 정렬 기준에 따라 반환할 정렬 문자열 결정
        if ("title".equals(normalizedOrder)) {
            return "title"; // 이름 순으로 정렬
        } else if ("travelviewcount".equals(normalizedOrder)) {
            return "travelviewcount"; 
        } else {
            // 허용되지 않는 정렬 기준이 입력된 경우, 기본 정렬 기준을 반환
            return "title"; 
        }
    }

    @GetMapping("/placerate/{contentID}")
    public Map<String, Object> getPlaceRate(@PathVariable String contentID){

        Map<String, Object> resultMap = placeService.placeRate(contentID);
        // resultMap = {averageRate, cntRating} 
        // 로그 추가
        logger.info("Place rate fetched successfully. Content ID: " + contentID);
        return resultMap;
    }

    @GetMapping("/place/*") // 잘못된 URL
    public String redirectToCorrectPage() {
        // "/place" 뒤에 어떠한 경로도 오지 않은 경우에는 wrongpathPage를 보여줍니다.
        // 올바른 페이지로 리디렉션
        return "redirect:/wrongpath/preference";
    }

    @PostMapping("/place/savedata/{title}")
    public String postMethodName(@RequestBody String entities, @PathVariable("title") String title) throws ParseException {
        // reader를 Object로 parse
        JSONParser parser = new JSONParser();
        JSONArray jsonArr = (JSONArray)parser.parse(entities);
        
        //String nickname = "gyugyu"; /////////////////////////////////////////////여기 닉네임 변경해주셔야함. 아직 로그인 세션 구현 안해서그럼.
        String nickname = String.valueOf(((JSONObject)jsonArr.get(0)).get("nickname"));
        int maxNum = placeService.getMaxNum(nickname) + 1;
        String COURSENO = nickname+"_"+String.valueOf(maxNum);
        // jsonArr에서 하나씩 JSONObject로 cast해서 사용
        if (jsonArr.size() > 0){
            for(int i=0; i< jsonArr.size(); i++){   
                Map<String, Object> resultMap = new HashMap<>();
                JSONObject jsonObj = (JSONObject)jsonArr.get(i);
                String coursepw = "password";
                String COURSEDAY = String.valueOf(jsonObj.get("courseDay"));
                String TRAVELNUM = String.valueOf(jsonObj.get("travelNum"));
                String RESULTID = COURSENO+"_"+COURSEDAY+"_"+TRAVELNUM;
                resultMap.put("RESULTID", RESULTID);
                resultMap.put("COURSENO", COURSENO);
                resultMap.put("COURSEDAY", COURSEDAY);
                resultMap.put("TRAVELNUM", TRAVELNUM);
                resultMap.put("CONTENTID", String.valueOf(jsonObj.get("contentId")));
                resultMap.put("NICKNAME", nickname);
                resultMap.put("COURSEPW", coursepw);
                resultMap.put("title", title);
                placeService.SaveResult(resultMap);
            }
        }

        return COURSENO;
    }
    
}
 