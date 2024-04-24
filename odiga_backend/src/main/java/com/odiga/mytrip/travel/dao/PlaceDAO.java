package com.odiga.mytrip.travel.dao;
import org.apache.ibatis.annotations.Mapper;
import com.odiga.mytrip.travel.vo.TravelListVO;
import java.util.List;
import java.util.Map;

@Mapper
public interface PlaceDAO {
    List<TravelListVO> getPlaceList(String areacode, String displayCount, String order);
    Map<String, Object> getPlaceRate(String contentID);
}
