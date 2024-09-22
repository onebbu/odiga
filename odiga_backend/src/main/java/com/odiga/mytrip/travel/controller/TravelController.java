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
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api")
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
        System.out.println("detail Page ... controller travelInfo :: "+travelInfo);
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
        travelService.wish(request.getContentid(), request.getEmail(), request.getNickname());
        System.out.println("wish UP");
    }
    @GetMapping("/WishInfo")
    public boolean WishUserInfo(
        @RequestParam(value = "contentid", required = false) Integer contentid,
        @RequestParam(value = "nickname", required = false) String nickname) {
        System.out.println("travelController :: /WishInfo "+contentid+" nickname:: "+nickname);
        if (contentid == null || nickname == null){return false;}
        else { System.out.println("like?? "+ travelService.WishUserInfo(contentid, nickname));
             return travelService.WishUserInfo(contentid, nickname); 
        }
    }

    @PostMapping("/WishDelete")
    public void Wishremov(@RequestBody WishVO request) {
        travelService.WishDelete(request.getContentid(), request.getNickname());
        System.out.println("wishDelete ");
    }
    @GetMapping("/imgs/{contntId}")
    public List<String> getImgs(@PathVariable String contntId) throws IOException{
        return travelService.img(contntId);
    }
    @PostMapping("/ReviewUpdate")
    public void reviewInfoUpdate(@RequestBody ReviewDataVO request) {
        System.out.println(request);  
        travelService.ReviewUpdate(request.getReviewno(), request.getReviewcomment() , request.getReviewgrade()); 
    }
    @PostMapping("/ReviewDelete/{reviewno}")
    public void postMethodName(@PathVariable String reviewno) {
        System.out.println(reviewno);
        travelService.ReviewDelete(reviewno);
    }

    // 닉네임으로 가지고 와야함
    @GetMapping("/mypage/mylike/{nickname}")                                  // required = false로 설정하여 파라미터가 필수가 아니게 함
    public Map<Integer, Map<String, Object>> getWishlist(@PathVariable String nickname, @RequestParam(required = false) String areacode ) {

        List<WishVO> userWishList;
        Map<Integer, Map<String, Object>> userWishMap = new HashMap<>();
        if (areacode == null) {
            userWishList = travelService.selectAllWish(nickname);
            // 아이디에 맞는 wishlist 가져오기
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
        }  else{      // region 값이 null 이 아닐때 이거 ChoosePlace 화면에서 쓰려고 분리했슴당
            userWishList = travelService.selectWishforRegion(nickname, areacode);
            // 아이디에 맞는 wishlist 가져오기
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
            System.out.println("TravelController : 아리아코드 널 아님" + areacode);
            System.out.println("userWishMap "+userWishMap);
        }

        return userWishMap;
        
    }


}

