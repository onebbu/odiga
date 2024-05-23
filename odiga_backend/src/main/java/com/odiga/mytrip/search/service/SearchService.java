package com.odiga.mytrip.search.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.odiga.mytrip.search.dao.SearchDAO;
import com.odiga.mytrip.search.vo.CatVO;
import com.odiga.mytrip.search.vo.SearchCourseVO;
import com.odiga.mytrip.search.vo.SearchVO;


@Service
public class SearchService {

    @Autowired
    private SearchDAO searchDAO;

    public List<SearchVO> SearchList(Map<String, Object> searchQuery) {
        return searchDAO.getSearchList(searchQuery);
    }
    public List<SearchCourseVO> SearchCourseList(String page, String text, String order) {
        return searchDAO.getSearchCourseList(page, text,  order);
    }
    public int resultCount(Map<String, Object> searchQuery){
        return searchDAO.getResultCount(searchQuery);
    }
    public int resultCourseCount(String text){
        System.out.println("service :  검색내용( "+text+" )");
        return searchDAO.getCourseResultCount(text);
    }
    public List<CatVO> CatList(){
        return searchDAO.getCatList();
    }

    public int getAreaResultCount(Map<String, Object> searchQuery) {
        return searchDAO.getResultAreaCount(searchQuery);}
    
}
