package com.odiga.mytrip.search.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.odiga.mytrip.search.service.SearchService;
import com.odiga.mytrip.search.vo.CatVO;
import com.odiga.mytrip.search.vo.SearchCourseVO;
import com.odiga.mytrip.search.vo.SearchVO;

@RequestMapping("/api")
@RestController
public class SearchController {
    @Autowired
    private SearchService searchService;

    @GetMapping("/search")
    public Map<String, Object> GetSearchTavelList(
            @RequestParam("page") String page,
            @RequestParam("text") String text,
            @RequestParam(value = "areacode", required = false) String areacode,
            @RequestParam("order") String frontorder,
            @RequestParam(value = "catcode", required = false) String catcode) throws IOException {
        
        Map<String, Object> searchQuery = new HashMap<>();
        List<String> catList = new ArrayList<>();
        if (catcode != null && catcode.length() > 0){
            String[] catCodeList = catcode.split(",");
            for(int i = 0; i < catCodeList.length; i++ ){
                catList.add(catCodeList[i]);
                System.out.println("catList length" + catList.size());
            } 
            searchQuery.put("catList", catList);
        }
        else{searchQuery.put("catList", null); System.out.println("catcode put null--------------------");}
        
        String order = "title";
        if("grade".equals(frontorder)) { order = "grade"; }     
        searchQuery.put("page", page);
        searchQuery.put("text", text);
        if (areacode != null){ searchQuery.put("areacode", areacode); }
        else{ searchQuery.put("areacode", 0); }
        
        searchQuery.put("order", order);
        System.out.println("Controller::::::::: searchQuery" + searchQuery.toString());
        try {
            List<SearchVO> searchList = searchService.SearchList(searchQuery);
            searchQuery.put("catcode",catList);
            int resultCount = searchService.getAreaResultCount(searchQuery);
            Map<String, Object> searchResult = new HashMap<>(); // 검색 결과와 결과 개수를 담을 Map 생성
            searchResult.put("searchList", searchList);
            searchResult.put("resultCount", resultCount);

            return searchResult;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("SearchController:: 실패......");
        }
    }
    @GetMapping("/categories")
    public List<CatVO> getMethodName() throws IOException{
        List<CatVO> catList = searchService.CatList();
        // null 값을 필터링하여 반환
        return catList.stream().filter(cat -> cat.getCattype() != null).collect(Collectors.toList());
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

    @GetMapping("/count-areas")
    public Map<Integer, Integer> getAreaResultCount(
            @RequestParam("text") String text,
            @RequestParam(value = "catcode", required = false) String catcode
    ) {
        int[] areaArr = {1, 2, 3, 4, 5, 6, 7, 8, 31, 32, 33, 34, 35, 36, 37, 38, 39};

        Map<Integer, Integer> areaMap = new HashMap<>();
        Map<String, Object> searchQuery = new HashMap<>();
        List<String> catList = new ArrayList<>();

        if (catcode != null && catcode.length() > 0){
            String[] catCodeList = catcode.split(",");
            for(int i = 0; i < catCodeList.length; i++ ){
                catList.add(catCodeList[i]);
            }
            searchQuery.put("catcode", catList);
        }
        else{searchQuery.put("catcode", null); System.out.println("catcode put null--------------------");}
        searchQuery.put("text", text);
        
        try{
            for (int areaNum : areaArr) {
                searchQuery.put("areacode", areaNum);
                int areaResultCount = searchService.getAreaResultCount(searchQuery);
                areaMap.put(areaNum, areaResultCount);
            }
        } catch (Exception e){
            System.out.println("count-areas 실패........");
            e.printStackTrace();
        }

        return areaMap;
    }
}
