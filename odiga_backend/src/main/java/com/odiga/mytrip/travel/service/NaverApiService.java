package com.odiga.mytrip.travel.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Slf4j
@Service
public class NaverApiService {
    private final String naverApiUrl = "https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving";
    private final RestTemplate restTemplate;
    private final String clientId;
    private final String clientSecret;

    // 생성자
    @Autowired
    public NaverApiService(RestTemplate restTemplate,
                           @Value("${naver.directions.client-id}") String clientId,
                           @Value("${naver.directions.client-secret}") String clientSecret) {
        this.restTemplate = restTemplate;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }


    public Map<String, Object> getDirection(String start, String goal) {
        String apiUrl = naverApiUrl + "?X-NCP-APIGW-API-KEY-ID="+clientId+"&X-NCP-APIGW-API-KEY="+clientSecret+"&start=" + start + "&goal=" + goal;

        ResponseEntity<Map> responseEntity = restTemplate.getForEntity(apiUrl, Map.class);
        return responseEntity.getBody();
    }

    public Map<String, Object> getDirection(String start, String goal, String waypoints) {
        String apiUrl = naverApiUrl + "?X-NCP-APIGW-API-KEY-ID=qdemuo7rvh&X-NCP-APIGW-API-KEY=gYy68rNHLhGg5Y4VXmcH9wk1HkRMO0dzlVxVOGam&start=" + start + "&goal=" + goal + "&waypoints=" + waypoints;
        ResponseEntity<Map> responseEntity = restTemplate.getForEntity(apiUrl, Map.class);
        return responseEntity.getBody();
    }
}
