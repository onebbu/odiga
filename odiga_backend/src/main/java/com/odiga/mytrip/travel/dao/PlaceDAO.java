package com.odiga.mytrip.travel.dao;
import org.apache.ibatis.annotations.Mapper;
import com.odiga.mytrip.travel.vo.TravelListVO;
import java.util.List;
import java.util.Map;

@Mapper
public interface PlaceDAO {
    List<TravelListVO> getPlaceList(String areacode, String displayStart, String displayEnd, String order);
    void courseSave(String contentID, String index);
    void SaveResultList(Map<String, Object> result);
    int getMaxNum(String nickname);
}
