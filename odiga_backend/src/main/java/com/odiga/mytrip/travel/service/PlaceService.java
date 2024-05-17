package com.odiga.mytrip.travel.service;
import com.odiga.mytrip.travel.vo.TravelListVO;
import com.odiga.mytrip.travel.dao.PlaceDAO;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import java.util.Map;
import java.net.HttpURLConnection;
import java.net.URL;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class PlaceService {

    @Autowired
    private PlaceDAO placeDAO;

    // public List<TravelListVO> placeList(String areacode, String displayStart, String displayEnd, String order) {
    //     System.out.println("service : "+areacode+" "+displayStart+" "+order);
    //     return placeDAO.getPlaceList(areacode, displayStart, displayEnd, order);
    // }
    public List<TravelListVO> placeList(Map<String, Object> display) {
        return placeDAO.getPlaceList(display);
    }
    public List<TravelListVO> placeALLList(Map<String, Object> display) {
        return placeDAO.getALLPlaceList(display);
    }

    @Transactional
    public String areaname(String areacode)  throws IOException{
        String apiKey = "eTvi0rTQ1PoHjUzFGNoNUjpVx%2BMk6y8Hs%2FyH4JzAlRk5Ag7c5rqIcBWoLWuG%2BJoHzywuB1cVkEHiZZFuhDYbhA%3D%3D";        
        String additionalApiUrl = "https://apis.data.go.kr/B551011/KorService1/areaCode1" +
                "?serviceKey=" + apiKey +
                "&numOfRows=" + 100 +
                "&pageNo=" + 1 +
                "&MobileOS=ETC" +
                "&MobileApp=AppTest" +
                "&_type=json";

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

        return overview;
    }

    @Transactional
    public void SaveResult(Map<String, Object> result){
        placeDAO.SaveResultList(result);
    }

    public int getMaxNum(String nickname){
        return placeDAO.getMaxNum(nickname);
    }
}
