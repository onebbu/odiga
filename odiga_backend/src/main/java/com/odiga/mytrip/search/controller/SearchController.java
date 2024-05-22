package com.odiga.mytrip.search.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
            @RequestParam(value = "areacode", required = false) String areacode,
            @RequestParam("order") String frontorder,
            @RequestParam(value = "catcode", required = false) String catcode) throws IOException {
        
        List<String> catList = new ArrayList<>();
        Map<String, Object> searchQuery = new HashMap<>();

        String order = "title";
        if("grade".equals(frontorder)) {
            order = "grade";
        } else if ("date".equals(frontorder)) {
            order = "title"; // date 가 없어서 일단 title설정
        }    
        String[] catCodeList = catcode.split(",");
        for(int i = 0; i < catCodeList.length; i++ ){
            catList.add(catCodeList[i]);
        }    
        try {
            searchQuery.put("page", 1);
            searchQuery.put("text", "");
            if (areacode != null) {
                searchQuery.put("areacode", 1);
            }
            searchQuery.put("order", order);
            // searchQuery.put("catcode", catcode != null ? Arrays.asList(catcode) : Collections.emptyList());
            searchQuery.put("catcode", catList);

            List<SearchVO> searchList = searchService.SearchList(searchQuery);
            int resultCount = searchService.resultCount(searchQuery);

            // 검색 결과와 결과 개수를 담을 Map 생성
            Map<String, Object> searchResult = new HashMap<>();
            searchResult.put("searchList", searchList);
            searchResult.put("resultCount", resultCount);

            System.out.println("searchController:: catcode??"+catcode);
            System.out.println("searchController:: areacode??"+areacode);
            System.out.println("SearchResult?? " + searchList);
            return searchResult;
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Error processing request: " + e.getMessage());
            System.out.println("searchController:: page??"+page);
            System.out.println("searchController:: text??"+text);
            System.out.println("searchController:: order??"+order);
            System.out.println("searchController:: catcode??"+catcode);
            System.out.println("searchController:: areacode??"+areacode);
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

        for (int areaNum : areaArr) {
            int areaResultCount = searchService.getAreaResultCount(text, "A02050600", areaNum);
            areaMap.put(areaNum, areaResultCount);
        }

        return areaMap;
    }
}
