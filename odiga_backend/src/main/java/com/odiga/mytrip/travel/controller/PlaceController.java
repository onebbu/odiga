package com.odiga.mytrip.travel.controller;
import com.odiga.mytrip.travel.vo.TravelListVO;
import com.odiga.mytrip.travel.service.PlaceService;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
public class PlaceController {
    @Autowired
    private PlaceService placeService;
    
    @GetMapping("/place/{areacode}/{displayCount}/{order}")
    public List<TravelListVO> getPlaceList(
        @PathVariable String areacode, 
        @PathVariable String displayCount, 
        @PathVariable String order) throws IOException {

        try {
            // order 파라미터를 검증하여 유효한 정렬 기준으로 변환
            String orderByClause = validateAndTransformOrder(order);
            List<TravelListVO> placeList = placeService.placeList(areacode, displayCount, orderByClause);
            System.out.println(areacode+" "+displayCount+" "+orderByClause);
            // Perform additional logic if needed
            // Example: Fetch overview data if it's null
            // if (travelInfo.getOverview() == null) {
            //     String newOverview = placeService.fetchOverviewData(areacode);
            //     travelInfo.setOverview(newOverview);
            // }
            return placeList;
        } catch (Exception e) {
            // Handle IOException appropriately (e.g., log error, return error response)
            System.err.println("Error processing request: " + e.getMessage());
            throw new RuntimeException("Failed to fetch travel information.");
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
        return resultMap;
    }

    
}
