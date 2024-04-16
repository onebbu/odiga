package com.odiga.mytrip.controller;

import com.odiga.mytrip.api.ApiVO;
import com.odiga.mytrip.service.TravelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TravelController {

    @Autowired
    private TravelService travelService;

    @GetMapping("/detail/{contentId}")
    public ApiVO getTravelInfo(@PathVariable String contentId) {
        return travelService.TravelList(contentId);
    }
}
