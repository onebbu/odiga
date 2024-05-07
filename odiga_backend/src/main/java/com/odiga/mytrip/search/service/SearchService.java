package com.odiga.mytrip.search.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.odiga.mytrip.search.dao.SearchDAO;
import com.odiga.mytrip.search.vo.CatVO;
import com.odiga.mytrip.search.vo.SearchVO;


@Service
public class SearchService {

    @Autowired
    private SearchDAO searchDAO;

    public List<SearchVO> SearchList(String page, String text, String areacode ,String order , String catcode) {
        System.out.println("service :  검색내용( "+text+" )아레아코드 ("+areacode +") 카테고리코드(" +catcode +")");
        
        return searchDAO.getSearchList(page, text, areacode , order , catcode);
    }
    public int resultCount(String text , String areacode , String catcode){
        return searchDAO.getResultCount(text , areacode , catcode);
    }
    public List<CatVO> CatList(){
        return searchDAO.getCatList();
    }
    
}
