package com.odiga.mytrip.search.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.odiga.mytrip.search.service.SearchService;
import com.odiga.mytrip.search.vo.CatVO;
import com.odiga.mytrip.search.vo.SearchCourseVO;
import com.odiga.mytrip.search.vo.SearchVO;

@RestController
public class SearchController {
    @Autowired
    private SearchService searchService;
    
    @GetMapping("/search")
    public Map<String, Object> GetSearchTavelList(
        @RequestParam("page") String page, 
        @RequestParam("text") String text, 
        @RequestParam("areacode") String areacode,
        @RequestParam("order") String frontorder,
        @RequestParam(value = "catcode", required = false) String catcode) throws IOException {

        try {
            String order = "title";
            if("grade".equals(frontorder)) {
                order = "grade";
            } else if ("date".equals(frontorder)) {
                order = "title"; // date 가 없어서 일단 title설정
            }
            System.out.println(frontorder);
            // order 파라미터를 검증하여 유효한 정렬 기준으로 변환
            List<SearchVO> searchList = searchService.SearchList(page, text, areacode , order , catcode);
            int resultCount = searchService.resultCount(text, areacode , catcode);

            // 검색 결과와 결과 개수를 담을 Map 생성
            Map<String, Object> searchResult = new HashMap<>();
            searchResult.put("searchList", searchList);
            searchResult.put("resultCount", resultCount);

            return searchResult;
        } catch (Exception e) {
            // Handle IOException appropriately (e.g., log error, return error response)
            System.err.println("Error processing request: " + e.getMessage());
            throw new RuntimeException("Failed to fetch travel information.");
        }
    }
    @GetMapping("/categories")
    public List<CatVO> getMethodName() throws IOException{
        return searchService.CatList();
    }
    @GetMapping("/searchcourse")
    public Map<String, Object> GetSearchCourseList(
        @RequestParam("page") String page, 
        @RequestParam("text") String text,
        @RequestParam("order") String frontorder)
        // @RequestParam(value = "areacode", required = false)String areacode) 
        { 
            String order = "boardtitle";
            if("grade".equals(frontorder)) {
                order = "boardgrade";
            } else if ("date".equals(frontorder)) {
                order = "boarddate";
            }
        List<SearchCourseVO> CourseListResult =  searchService.SearchCourseList(page, text,  order);
        int resultCourseCount = searchService.resultCourseCount(text);

        Map<String, Object> searchCourseResult = new HashMap<>();
        searchCourseResult.put("CourseListResult" , CourseListResult);
        searchCourseResult.put("resultCourseCount" , resultCourseCount);
        return searchCourseResult;
    }
    
    
}
