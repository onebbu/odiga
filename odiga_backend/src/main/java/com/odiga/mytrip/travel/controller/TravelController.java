package com.odiga.mytrip.travel.controller;

import com.odiga.mytrip.travel.service.TravelService;
import com.odiga.mytrip.travel.vo.ReviewDataVO;
import com.odiga.mytrip.travel.vo.TravelCatKorVO;
import com.odiga.mytrip.travel.vo.TravelListVO;
import com.odiga.mytrip.travel.vo.WishVO;

import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

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
    @PostMapping("/WishDelete")
    public void Wishremov(@RequestBody WishVO request) {
        travelService.WishDelete(request.getContentid(), request.getEmail(), request.getNickname());
    }
    @GetMapping("/imgs/{contntId}")
    public List<String> getImgs(@PathVariable String contntId) throws IOException{
        return travelService.img(contntId);
    }
    @PostMapping("/ReviewUpdate")
    public void reviewInfoUpdate(
            @RequestParam("reviewno") String reviewno,
            @RequestParam("reviewcomment") String reviewcomment) {
        travelService.ReviewUpdate(reviewno , reviewcomment);
    }
    @PostMapping("/ReviewDelete")
    public void postMethodName(@PathVariable String reviewno) {
        travelService.ReviewDelete(reviewno);
    }

    // 닉네임으로 가지고 와야함
    @GetMapping("/mypage/mylike/{nickname}")
    public Map<Integer, Map<String, Object>> getWishlist(@PathVariable String nickname) {
        // 아이디에 맞는 wishlist 가져오기
        List<WishVO> userWishList = travelService.selectAllWish(nickname);
        Map<Integer, Map<String, Object>> userWishMap = new HashMap<>();

        int i = 0;
        Iterator<WishVO> wishIter = userWishList.iterator();
        while (wishIter.hasNext()) {
            WishVO userWish = wishIter.next();
            TravelListVO travelInfo = travelService.TravelList(String.valueOf(userWish.getContentid()));
            Map<String, Object> wishMap = new HashMap<>();
            wishMap.put("contentId", String.valueOf(userWish.getContentid()));
            wishMap.put("title", travelInfo.getTitle());
            wishMap.put("addr", travelInfo.getAddr1());
            wishMap.put("img", travelInfo.getFirstimage());
            wishMap.put("cat", travelInfo.getCat3());
            userWishMap.put(i, wishMap);
            i++;
        }


        return userWishMap;
    }


}

