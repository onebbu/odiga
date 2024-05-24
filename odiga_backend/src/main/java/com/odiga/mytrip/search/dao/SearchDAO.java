package com.odiga.mytrip.search.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.odiga.mytrip.search.vo.CatVO;
import com.odiga.mytrip.search.vo.SearchCourseVO;
import com.odiga.mytrip.search.vo.SearchVO;




@Mapper
public interface SearchDAO {
    List<SearchVO> getSearchList(Map<String, Object> searchQuery);
    List<SearchCourseVO> getSearchCourseList(String page, String text,  String order);
    int getResultCount(Map<String, Object> searchQuery);
    int getCourseResultCount(String text);
    List<CatVO> getCatList();

    int getResultAreaCount(Map<String, Object> searchQuery);
    
}
