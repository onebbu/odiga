package com.odiga.mytrip.travel.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.odiga.mytrip.travel.dao.TravelDAO;
import com.odiga.mytrip.travel.vo.ReviewDataVO;
import com.odiga.mytrip.travel.vo.TravelCatKorVO;
import com.odiga.mytrip.travel.vo.TravelListVO;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import com.odiga.mytrip.travel.vo.WishVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TravelService {

    @Autowired
    private TravelDAO travelDAO;

    public TravelListVO TravelList(String contentId) {
        return travelDAO.getTravelInfo(contentId);
    }

    @Transactional
    public void updateViewCount(String contentId) {
        travelDAO.countPlusOne(contentId);
    }

    @Transactional
    public String fetchOverviewData(String contentId) throws IOException {

        String apiKey = "eTvi0rTQ1PoHjUzFGNoNUjpVx%2BMk6y8Hs%2FyH4JzAlRk5Ag7c5rqIcBWoLWuG%2BJoHzywuB1cVkEHiZZFuhDYbhA%3D%3D";
        String additionalApiUrl = "https://apis.data.go.kr/B551011/KorService1/detailCommon1" +
                "?serviceKey=" + apiKey +
                "&MobileOS=ETC" +
                "&MobileApp=AppTest" +
                "&_type=json" +
                "&contentId=" + contentId +
                "&defaultYN=Y" +
                "&firstImageYN=N" +
                "&areacodeYN=N" +
                "&catcodeYN=N" +
                "&addrinfoYN=N" +
                "&mapinfoYN=N" +
                "&overviewYN=Y" + // Only requesting overview
                "&numOfRows=10" +
                "&pageNo=1";

        URL url = new URL(additionalApiUrl);
        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
        urlConnection.setRequestMethod("GET");

        StringBuilder overviewResult = new StringBuilder();
        try (BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(), "UTF-8"))) {
            String returnLine;
            while ((returnLine = br.readLine()) != null) {
                overviewResult.append(returnLine).append("\n\r");
            }
        } finally {
            urlConnection.disconnect();
        }


        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode = objectMapper.readTree(overviewResult.toString());
        String overview = rootNode.path("response").path("body").path("items").path("item").get(0).path("overview").asText();

        System.out.println("overview :" + overview);

        travelDAO.fetchOverview(contentId, overview);

        return overview;

    }

    @Transactional
    public List<String> img(String contentId) throws IOException {

        String apiKey = "eTvi0rTQ1PoHjUzFGNoNUjpVx%2BMk6y8Hs%2FyH4JzAlRk5Ag7c5rqIcBWoLWuG%2BJoHzywuB1cVkEHiZZFuhDYbhA%3D%3D";
        String additionalApiUrl = "https://apis.data.go.kr/B551011/KorService1/detailImage1" +
                "?serviceKey=" + apiKey +
                "&MobileOS=ETC" +
                "&MobileApp=AppTest" +
                "&_type=json" +
                "&contentId=" + contentId +
                "&imageYN=Y" +
                "&subImageYN=Y" +
                "&numOfRows=10" +
                "&pageNo=1";

        URL url = new URL(additionalApiUrl);
        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
        urlConnection.setRequestMethod("GET");

        StringBuilder imgResult = new StringBuilder();
        try (BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(), "UTF-8"))) {
            String returnLine;
            while ((returnLine = br.readLine()) != null) {
                imgResult.append(returnLine).append("\n\r");
            }
        } finally {
            urlConnection.disconnect();
        }

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode = objectMapper.readTree(imgResult.toString());

        List<String> imgUrls = new ArrayList<>();
        JsonNode itemsNode = rootNode.path("response").path("body").path("items").path("item");
        for (JsonNode itemNode : itemsNode) {
            String imgUrl = itemNode.path("originimgurl").asText();
            imgUrls.add(imgUrl);
        }

        return imgUrls;
    }


    @Transactional
    public void importReviewData(ReviewDataVO reviewData) {
        try {
            System.out.println(reviewData);
            travelDAO.importReviewData(reviewData);
        } catch (Exception e) {
            e.printStackTrace();
            // 예외 처리
        }
    }

    public List<ReviewDataVO> ReviewList(String contentId) {
        return travelDAO.getReviewList(contentId);
    }
    public TravelCatKorVO Catkr(String cat1 , String cat2 , String cat3){
        return travelDAO.cattranskr(cat1, cat2, cat3);
    }
    @Transactional
    public void ReviewUpdate(int reviewno , String reviewcomment , int reviewgrade ){
        travelDAO.reviewUpdate(reviewno , reviewcomment , reviewgrade);
    }
    @Transactional
    public void ReviewDelete(String reviewno){
        travelDAO.reviewDelete(reviewno);
    }
    @Transactional
    public void wish(String contentid, String email , String nickname){
        travelDAO.wishPlus(contentid, email , nickname);
    }
    @Transactional
    public void WishDelete(String contentid, String nickname){
        travelDAO.wishDelete(contentid, nickname);
    }

    public String TravelGradeAvg(String contentid){
        return travelDAO.travelGradeAvg(contentid);
    }
    public boolean WishUserInfo(Integer contentid, String nickname) {
        if(travelDAO.wishUserInfo(contentid, nickname) >= 1){
            return true;
        }
        else return false;
    }
    @Transactional
    public List<WishVO> selectAllWish(String nickname){
        return travelDAO.selectAllWish(nickname);
    }

    @Transactional
    public List<WishVO> selectWishforRegion(String nickname, String areacode){
        return travelDAO.selectWishforRegion(nickname, areacode);
    }

    
    
}
