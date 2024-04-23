package com.odiga.mytrip.travel.dao;
import org.apache.ibatis.annotations.Mapper;
import com.odiga.mytrip.travel.vo.TravelListVO;

@Mapper
public interface PlaceDAO {
    TravelListVO getPlaceList(String areacode);
}
