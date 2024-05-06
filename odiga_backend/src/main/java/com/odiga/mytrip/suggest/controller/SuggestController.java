package com.odiga.mytrip.suggest.controller;

import org.springframework.web.bind.annotation.RestController;

import com.odiga.mytrip.suggest.service.SuggestService;
import com.odiga.mytrip.suggest.vo.SuggestCosVO;

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
    public List<SuggestCosVO> SuggestList() {
        List<SuggestCosVO> cosList = suggestService.getSuggestCosList();
        Map<String , Object> resultlist = new HashMap<>();
        resultlist.put("cosList", cosList);
        return cosList;
    }
    
    
}
