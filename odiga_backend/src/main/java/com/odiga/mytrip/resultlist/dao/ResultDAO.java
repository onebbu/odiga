package com.odiga.mytrip.resultlist.dao;

import com.odiga.mytrip.resultlist.vo.ResultVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Optional;

@Mapper
public interface ResultDAO {

    List<ResultVO> selectResultList(@Param("courseNo") String courseNo);

    int maxTravelNum(@Param("courseNo") String courseNo, @Param("courseDay")int courseDay);



}
