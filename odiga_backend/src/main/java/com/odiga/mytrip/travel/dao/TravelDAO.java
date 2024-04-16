package com.odiga.mytrip.travel.dao;


import org.apache.ibatis.annotations.Mapper;
import com.odiga.mytrip.vo.TravelListVO;

@Mapper
public interface TravelDAO {
    TravelListVO getTravelInfo(String contentId);
    void countPlusOne(String contentId);
}

