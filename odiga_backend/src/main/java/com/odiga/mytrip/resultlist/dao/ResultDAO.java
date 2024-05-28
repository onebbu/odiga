package com.odiga.mytrip.resultlist.dao;

import com.odiga.mytrip.resultlist.vo.ResultVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ResultDAO {

    List<ResultVO> selectResultList(@Param("courseNo") String courseNo);

    List<ResultVO> findAllTitles(@Param("nickname") String nickname);

    int maxTravelNum(@Param("courseNo") String courseNo, @Param("courseDay")int courseDay);

    String findCategory(@Param("category") String category);

    String findSharePw(@Param("courseNo") String courseNo);

    String findCategoryKR(@Param("category") String category);

    void savePw(@Param("coursePw") String coursePw, @Param("courseNo") String courseNo);

    void deleteTravelResult(@Param("courseNo") String courseNo);

}
