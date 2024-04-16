package com.odiga.mytrip.service;

import com.odiga.mytrip.dao.TravelDAO;
import com.odiga.mytrip.api.ApiVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TravelService {

    @Autowired
    private TravelDAO travelDAO;

    public ApiVO TravelList(String contentId) {
        return travelDAO.getTravelInfo(contentId);
    }
}
