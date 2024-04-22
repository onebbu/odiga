package com.odiga.mytrip.travel.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import com.odiga.mytrip.travel.vo.TravelListVO;
import com.odiga.mytrip.travel.vo.ReviewDataVO;

@Mapper
public interface TravelDAO {
    TravelListVO getTravelInfo(String contentId);
    void countPlusOne(String contentId);
    void fetchOverview(String contentid , String overview);
    void importReviewData(ReviewDataVO reviewData);
    List<ReviewDataVO> getReviewList(String contentId);
    void Like(String contentId);
}

