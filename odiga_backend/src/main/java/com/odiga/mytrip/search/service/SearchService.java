package com.odiga.mytrip.search.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.odiga.mytrip.search.dao.SearchDAO;
import com.odiga.mytrip.search.vo.SearchVO;


@Service
public class SearchService {

    @Autowired
    private SearchDAO searchDAO;

    public List<SearchVO> SearchList(String page, String text, String areacode ,String order) {
        System.out.println("service : "+page+" "+text+" "+areacode +""+ order);
        
        return searchDAO.getSearchList(page, text, areacode , order);
    }
    public int resultCount(String text , String areacode){
        return searchDAO.getResultCount(text , areacode);
    }
    
}
