package com.odiga.mytrip.api;

import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;

@Service
public class ApiService {

    private final ApiDAO apiDAO;

    public ApiService(ApiDAO apiDAO) {
        this.apiDAO = apiDAO;
    }

    public void saveDataFromApi(String jsonData) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode = objectMapper.readTree(jsonData);
        JsonNode itemsNode = rootNode.path("response").path("body").path("items").path("item");

        for (JsonNode itemNode : itemsNode) {
            String title = itemNode.path("title").asText();
            String contentid = itemNode.path("contentid").asText();
            String firstimage = itemNode.path("firstimage").asText();
            String mapx = itemNode.path("mapx").asText();
            String mapy = itemNode.path("mapy").asText();
            String addr1 = itemNode.path("addr1").asText();
            String addr2 = itemNode.path("addr2").asText();
            String areacode = itemNode.path("areacode").asText();
            String cat1 = itemNode.path("cat1").asText();
            String cat2 = itemNode.path("cat2").asText();
            String cat3 = itemNode.path("cat3").asText();
            String sigungucode = itemNode.path("sigungucode").asText();
            String contenttypeid = itemNode.path("contenttypeid").asText();

            ApiVO apiVO = new ApiVO(title, contentid, firstimage, mapx, mapy, addr1, addr2, cat1, cat2, cat3 ,areacode, sigungucode , contenttypeid);
            apiDAO.saveData(apiVO);
        }
    }
}
