package com.odiga.mytrip.dao;


import org.apache.ibatis.annotations.Mapper;
import com.odiga.mytrip.api.ApiVO;

@Mapper
public interface TravelDAO {
    ApiVO getTravelInfo(String contentId);
}
