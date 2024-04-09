package com.ogada.mytrip.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.ogada.mytrip.service.NaturalLanguageService;

import java.io.IOException;

@RestController
public class NaturalLanguageController {

    @Autowired
    private NaturalLanguageService naturalLanguageService;

    @PostMapping("/analyzeEntities")
    public String analyzeEntities(@RequestBody String text) {
        try {
            naturalLanguageService.analyzeEntities(text);
            return "Entity analysis successful";
            System.out.print(테스트호출);
        } catch (IOException e) {
            e.printStackTrace();
            return "Error during entity analysis";
        }
    }
}
