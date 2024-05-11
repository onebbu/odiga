package com.odiga.mytrip.travel.controller;

import com.odiga.mytrip.travel.service.TravelService;
import com.odiga.mytrip.travel.vo.ReviewDataVO;
import com.odiga.mytrip.travel.vo.TravelCatKorVO;
import com.odiga.mytrip.travel.vo.TravelListVO;
import com.odiga.mytrip.travel.vo.WishVO;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;





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
        TravelCatKorVO catkr = travelService.Catkr(travelInfo.getCat1(), travelInfo.getCat2(), travelInfo.getCat3());
        travelInfo.setCat1(catkr.getCat1kr());
        travelInfo.setCat2(catkr.getCat2kr());
        travelInfo.setCat3(catkr.getCat3kr());
        travelInfo.setAVERAGE_GRADE(travelService.TravelGradeAvg(contentId));
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
    @GetMapping("/reviews/{contentId}")
    public List<ReviewDataVO> reviewInfo(@PathVariable String contentId) {
        return travelService.ReviewList(contentId);
    }
    @PostMapping("/travelLike")
    public void likeAndWish(@RequestBody WishVO request) {
        travelService.LikePlusOne(request.getContentid());
        travelService.wish(request.getContentid(), request.getEmail(), request.getNickname());
    }
    @GetMapping("/WishInfo")
    public int WishUserInfo(
        @RequestParam(value = "contentid", required = false) Optional<Integer> contentid,
        @RequestParam(value = "email", required = false) String email) {
        if (contentid.isPresent()) {
            if (travelService.WishUserInfo(contentid.get(), email)) {
                return 1;
            } else {
                return 0;
            }
        } else {
            return 3;
        }
    }

    @PostMapping("/WishDelete")
    public void Wishremov(@RequestBody WishVO request) {
        travelService.WishDelete(request.getContentid(), request.getEmail(), request.getNickname());
    }
    @GetMapping("/imgs/{contntId}")
    public List<String> getImgs(@PathVariable String contntId) throws IOException{
        return travelService.img(contntId);
    }
    @PostMapping("/ReviewUpdate")
    public void reviewInfoUpdate(@RequestBody ReviewDataVO request) {
        System.out.println(request);  
        travelService.ReviewUpdate(request.getReviewno(), request.getReviewcomment()); 
    }
    @PostMapping("/ReviewDelete/{reviewno}")
    public void postMethodName(@PathVariable String reviewno) {
        System.out.println(reviewno);
        travelService.ReviewDelete(reviewno);
    }
    
    
      
    
    

       
}
