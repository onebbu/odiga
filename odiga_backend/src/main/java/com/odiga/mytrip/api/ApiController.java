package com.odiga.mytrip.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

@RestController
public class ApiController {

    private final ApiService apiService;

    @Autowired
    public ApiController(ApiService apiService) {
        this.apiService = apiService;
    }

    @GetMapping("/api")
    public String callApi() throws IOException {
        StringBuilder result = new StringBuilder();
        String apiKey = "eTvi0rTQ1PoHjUzFGNoNUjpVx%2BMk6y8Hs%2FyH4JzAlRk5Ag7c5rqIcBWoLWuG%2BJoHzywuB1cVkEHiZZFuhDYbhA%3D%3D";
        String apiUrl = "https://apis.data.go.kr/B551011/KorService1/areaBasedList1" +
                "?serviceKey=" + apiKey +
                "&numOfRows=100000" +
                "&pageNo=1" +
                "&MobileOS=ETC" +
                "&MobileApp=AppTest" +
                "&_type=json" +
                "&listYN=Y" +
                "&arrange=O";

        URL url = new URL(apiUrl);
        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
        urlConnection.setRequestMethod("GET");

        try (BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(), "UTF-8"))) {
            String returnLine;
            while ((returnLine = br.readLine()) != null) {
                result.append(returnLine).append("\n\r");
            }
        } finally {
            urlConnection.disconnect();
        }

        apiService.saveDataFromApi(result.toString());

        return result.toString();
    }
}
