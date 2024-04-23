package com.odiga.mytrip.travel.controller;
import com.odiga.mytrip.travel.vo.TravelListVO;
import com.odiga.mytrip.travel.service.PlaceService;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.io.IOException;

@RestController
public class PlaceController {
    @Autowired
    private PlaceService placeService;
    
    @GetMapping("/place/{areacode}")
    public TravelListVO getPlaceList(@PathVariable String areacode) throws IOException {
        try {
            TravelListVO placeList = placeService.placeList(areacode);

            // Perform additional logic if needed
            // Example: Fetch overview data if it's null
            // if (travelInfo.getOverview() == null) {
            //     String newOverview = placeService.fetchOverviewData(areacode);
            //     travelInfo.setOverview(newOverview);
            // }

            System.out.println("Request processed successfully.~~~~~~~~~~~~~~~~~~~~~~");

            return placeList;
        } catch (Exception e) {
            // Handle IOException appropriately (e.g., log error, return error response)
            System.err.println("Error processing request: " + e.getMessage());
            throw new RuntimeException("Failed to fetch travel information.");
        }
    }
}
