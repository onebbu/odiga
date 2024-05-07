package com.odiga.mytrip.suggest.dao;

import java.util.List;


import org.apache.ibatis.annotations.Mapper;

import com.odiga.mytrip.suggest.vo.SuggestCosVO;
import com.odiga.mytrip.suggest.vo.SuggestTraVO;

@Mapper
public interface SuggestDAO {
    List<SuggestCosVO> getCourseSuggestList();
    List<SuggestTraVO> getTravelSuggestList();   
}
