package com.odiga.mytrip.travel.controller;
import java.io.IOException;
import java.util.ArrayList;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.odiga.mytrip.travel.service.PlaceService;
import com.odiga.mytrip.travel.vo.TravelListVO;



@RestController
public class PlaceController {
    @Autowired
    private PlaceService placeService;
    // Logger 선언
    private static final Logger logger = Logger.getLogger(PlaceController.class.getName());

    @GetMapping("/place/{displayStart}/{order}")
    public List<TravelListVO> getPlaceList(
        @RequestParam(required = false) String areacode, 
        @PathVariable("displayStart") String displayStart, 
        @PathVariable("order") String order,
        @RequestParam(required = false) String theme) throws IOException {
        
        List<String> catList = new ArrayList<>();
        Map<String, Object> display = new HashMap<>();
        try {
            String displayEnd = String.valueOf(Integer.valueOf(displayStart) + 8);
            
            if(areacode != null && theme != null) { 
                String[] themeList = theme.split(","); 
                for(int i = 0; i < themeList.length; i++ ){
                    catList.add(themeList[i]);
                }
                display.put("areacode", areacode);
                display.put("order", order);
                display.put("displayStart", displayStart);
                display.put("displayEnd", displayEnd);
                display.put("list", catList);
                List<TravelListVO> placeList = placeService.placeList(display);
                System.out.println("CONTROLLER 1::::::::  THEME ???????????????????????/"+theme);
                return placeList;
            }
            else{
                display.put("order", order);
                display.put("displayStart", displayStart);
                display.put("displayEnd", displayEnd);
                List<TravelListVO> placeList = placeService.placeALLList(display);
                System.out.println("CONTROLLER 2::::::::  THEME ???????????????????????/"+theme);
                return placeList;
            }            
            
        } catch (Exception e) {
            // 예외 발생 시 로그 추가 및 예외 다시 던지기
            System.out.println("실패함?");
            logger.log(Level.SEVERE, "Error processing request", e);
            throw new RuntimeException("Failed to fetch place information.");
        }
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
 