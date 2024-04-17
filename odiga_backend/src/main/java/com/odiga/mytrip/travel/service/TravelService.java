package com.odiga.mytrip.travel.service;

import com.odiga.mytrip.travel.dao.TravelDAO;
import com.odiga.mytrip.vo.TravelListVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TravelService {

    @Autowired
    private TravelDAO travelDAO;

    public TravelListVO TravelList(String contentId) {
        return travelDAO.getTravelInfo(contentId);
    }
    
    @Transactional
    public void updateViewCount(String contentId) {
        travelDAO.countPlusOne(contentId);
    }
}
