package com.odiga.mytrip.suggest.controller;

import org.springframework.web.bind.annotation.RestController;

import com.odiga.mytrip.suggest.service.SuggestService;
import com.odiga.mytrip.suggest.vo.SuggestCosVO;
import com.odiga.mytrip.suggest.vo.SuggestTraVO;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
public class SuggestController {
    @Autowired
        SuggestService suggestService;

    @GetMapping("/CourseSuggest")
    public List<SuggestCosVO> SuggestCosList() {
        List<SuggestCosVO> cosList = suggestService.getSuggestCosList();
        Map<String , Object> resultCosList = new HashMap<>();
        resultCosList.put("cosList", cosList);
        return cosList;
    }
    @GetMapping("/TravelSuggest")
    public List<SuggestTraVO> SuggestTraList() {
        List<SuggestTraVO> traList = suggestService.getSuggestTraList();
        Map<String , Object> resultTraList = new HashMap<>();
        resultTraList.put("traList", traList);
        return traList;
    }
    
    
    
}
