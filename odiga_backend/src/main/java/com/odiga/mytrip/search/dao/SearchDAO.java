package com.odiga.mytrip.search.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.odiga.mytrip.search.vo.CatVO;
import com.odiga.mytrip.search.vo.SearchVO;




@Mapper
public interface SearchDAO {
    List<SearchVO> getSearchList(String page, String text, String areacode , String order ,String catcode);
    int getResultCount(String text , String areacode , String catcode);
    List<CatVO> getCatList();
    
}
