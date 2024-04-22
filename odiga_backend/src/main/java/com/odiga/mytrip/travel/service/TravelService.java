package com.odiga.mytrip.travel.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.odiga.mytrip.travel.dao.TravelDAO;
import com.odiga.mytrip.travel.vo.ReviewDataVO;
import com.odiga.mytrip.travel.vo.TravelListVO;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;

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

    public void LikePlusOne(String contentId){
        travelDAO.Like(contentId);
    }

    
}
