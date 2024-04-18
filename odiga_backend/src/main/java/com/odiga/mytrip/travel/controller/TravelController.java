package com.odiga.mytrip.travel.controller;

import com.odiga.mytrip.travel.service.TravelService;
import com.odiga.mytrip.travel.vo.ReviewDataVO;
import com.odiga.mytrip.travel.vo.TravelListVO;
import com.odiga.mytrip.api.ApiService;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class TravelController {

    @Autowired
    private TravelService travelService;

    @GetMapping("/detail/{contentId}")
    public TravelListVO getTravelInfo(@PathVariable String contentId) throws IOException{
        TravelListVO travelInfo = travelService.TravelList(contentId);
        travelService.updateViewCount(contentId);
        if (travelInfo.getOverview() == null){
            String newOverview = travelService.fetchOverviewData(contentId);

            travelInfo.setOverview(newOverview);
        }
        return travelInfo;
    }
    @PostMapping("/reviewImport")
    public String importReviewData(@RequestBody ReviewDataVO reviewData) {
        try {
            // ReviewDataVO 객체를 DAO로 전달하여 데이터베이스에 저장하거나 다른 작업 수행
            travelService.importReviewData(reviewData);
            System.out.println(reviewData);
            return "Success"; 
        } catch (Exception e) {
            e.printStackTrace();
            return "Error"; // 예외 처리
        }
    }   
}
