package com.odiga.mytrip.travel.service;
import com.odiga.mytrip.travel.vo.TravelListVO;
import com.odiga.mytrip.travel.dao.PlaceDAO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class PlaceService {

    @Autowired
    private PlaceDAO placeDAO;

    public TravelListVO placeList(String areacode) {
        return placeDAO.getPlaceList(areacode);
    }
}
