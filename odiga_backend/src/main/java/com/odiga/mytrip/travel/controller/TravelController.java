package com.odiga.mytrip.travel.controller;

import com.odiga.mytrip.travel.service.TravelService;
import com.odiga.mytrip.vo.TravelListVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TravelController {

    @Autowired
    private TravelService travelService;

    @GetMapping("/detail/{contentId}")
    public TravelListVO getTravelInfo(@PathVariable String contentId) {
        travelService.updateViewCount(contentId);
        return travelService.TravelList(contentId);
    }
}
