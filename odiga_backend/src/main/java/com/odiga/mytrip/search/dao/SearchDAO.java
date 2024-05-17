package com.odiga.mytrip.search.dao;

import java.util.List;

import io.micrometer.core.instrument.search.Search;
import org.apache.ibatis.annotations.Mapper;

import com.odiga.mytrip.search.vo.CatVO;
import com.odiga.mytrip.search.vo.SearchCourseVO;
import com.odiga.mytrip.search.vo.SearchVO;




@Mapper
public interface SearchDAO {
    List<SearchVO> getSearchList(String page, String text, String areacode , String order ,String catcode);
    List<SearchCourseVO> getSearchCourseList(String page, String text,  String order);
    int getResultCount(String text , String areacode , String catcode);
    int getCourseResultCount(String text);
    List<CatVO> getCatList();

    int getResultAreaCount(String text, String catcode, int areacode);
    
}
